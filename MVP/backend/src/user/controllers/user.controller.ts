import { Body, Controller, Post, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { createUserDTO } from '../dto/createUser.dto';
import { updateUserDTO } from '../dto/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // ---------------------------------------------------
  // Section 1: Create New Users Into The Database
  @Post('new')
  createUser(@Body() user: createUserDTO) {
    return this.userService.createUser(user);
  }

  // ---------------------------------------------------
  // Section 2: Update User Information
  @Patch('update/:username')
  updateUser(@Param('username') username: string, @Body() user: updateUserDTO) {
    return this.userService.updateUser(username, user);
  }

  // ---------------------------------------------------
  // Section 3: Delete User From The Database
  @Delete('delete/:username')
  deleteUser(@Param('username') username: string) {
    return this.userService.deleteUser(username);
  }
}
