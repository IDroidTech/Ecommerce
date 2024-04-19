import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, user } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SecurityService } from 'src/security/security.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private securityService: SecurityService,
  ) {}
  // section 1: Get User
  getUser(data: Prisma.userWhereUniqueInput): Promise<user | null> {
    return this.prisma.user.findUnique({
      where: { username: data.username },
    });
  }

  // ---------------------------------------------------
  // Section 1: Create New Users Into The Database
  async createUser(data: Prisma.userCreateInput) {
    // check if the username or email already exists before creating a new user
    const userNameExists = await this.prisma.user.findUnique({
      where: { username: data.username },
    });
    if (userNameExists) throw new HttpException('User already exists', 409);
    const emailExists = await this.prisma.user.findUnique({
      where: { email_address: data.email_address },
    });
    if (emailExists) throw new HttpException('Email already exists', 409);
    // ---------------------------------------------------
    // create a new user, cart, and wishlist
    const createdUser = await this.prisma.user.create({
      data: {
        ...data,
        password: await this.securityService.hashPassword(
          data.password as string,
        ),
      },
      select: {
        id: true,
        username: true,
        email_address: true,
        phone_number: true,
        user_address: {
          select: {
            address: {
              select: {
                address_line1: true,
                address_line2: true,
                city: true,
                state: true,
                country: true,
                postal_code: true,
              },
            },
          },
        },
      },
    });
    await this.prisma.cart.create({
      data: { user: { connect: { id: createdUser.id } } },
    });
    await this.prisma.wishlist.create({
      data: { user: { connect: { id: createdUser.id } } },
    });
    return createdUser;
  }

  // ---------------------------------------------------
  // Section 2: Update User Information
  async updateUser(username: string, data: Prisma.userUpdateInput) {
    // check if the user exists before updating and the userName is available
    const userExists = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!userExists) throw new HttpException('User not found', 404);
    if (data.email_address) {
      const emailExists = await this.prisma.user.findUnique({
        where: { email_address: data.email_address as string },
      });
      if (emailExists) throw new HttpException('Email already exists', 409);
    }
    if (data.username) {
      const userNameExists = await this.prisma.user.findUnique({
        where: { username: data.username as string },
      });
      if (userNameExists) throw new HttpException('User already exists', 409);
    }
    // ---------------------------------------------------
    return this.prisma.user.update({ where: { username }, data });
  }

  // ---------------------------------------------------
  // Section 3: Delete User From The Database
  async deleteUser(username: string) {
    // check if the user exists before deleting
    const userExists = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!userExists) throw new HttpException('User not found', 404);
    // ---------------------------------------------------
    return this.prisma.user.delete({ where: { username } });
  }
}
