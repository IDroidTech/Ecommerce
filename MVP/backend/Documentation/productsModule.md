# Purpose: The Module which handel all business logic for products

### **Product Controller**: This Module will handle all the incoming requests to the products module and will call the appropriate service to handle the request

### Guidelines
>
> - **Section 1:** Create New Products Into The Database
> - **Section 2:** Retrieve Products From The Database
> - **Section 3:** Update Product Information In The Database
> - **Section 4:** Delete Product Information From The Database
> - **Section 5:** Test Logic For Future Use

****

### **Product Service**: This service will interact with the database and perform the necessary operations

### Guidelines
>
> - **Section 1:** Create New Products Into The Database
> - **Section 2:** Retrieve Products From The Database
> - **Section 3:** Update Product Information In The Database
> - **Section 4:** Delete Product Information From The Database
> - **Section 5:** Test Logic For Future Use

****

### **DTOs:** Data Transfer Objects are used to transfer data between the controller and the service

### Guidelines
>
> - **createProductDTO:** This DTO will be used to create a new product.
> - **createProductItemDTO:** This DTO will be used to create a new product item.

****

## Endpoints

## <a>/products/new/:prod<a>

#### This Dynamic Endpoint will be used to create multiple things in the database

1. **POST** `/products/new/product`
>
> - **Description:** This endpoint will be used to create a new product in the database.
> - **Request Body:** Must contain the following fields:
>   - `name` : string, The name of the product.
>   - `description` : string, The description of the product.
>   - `recommended` : boolean, The recommended status of the product. default: false
>   - `category`: { connect: { id: number } }, The category of the product.
>   - `brand`: { connect: { id: number } }, The brand of the product.
> - **Response:** The response will be like this:
>

2. **POST** `/products/new/products`
>
> - **Description:** This endpoint will be used to create multiple products in the database.
> - **Request Body:** Must contain the array of the following fields:
>   - `name` : string, The name of the product.
>   - `description` : string, The description of the product.
>   - `recommended` : boolean, The recommended status of the product. default: false
>   - `category` : number, The id of the category of the product.
>   - `brand` : number, The id of the brand of the product.

3. **POST** `/products/new/product_item`
>
> - **Description:** This endpoint will be used to create a new product item in the database.
> - **Request Body:** Must contain the following fields:
>   - `SKU`: string like this brandName-productName-variationOption ex: `apple-iphone-12-ProMax-256gb-blue`
>   - `qty_in_stock`: number
>   - `product_image`: string => (url)
>   - `price`: number
>   - `product`: { connect: { id: number } }
>   - `product_configuration`: { create: { variation_option: { connect: { id: number } } } }

4- **POST** `/products/new/product_items`
>
> - **Description:** This endpoint will be used to create multiple product items in the database.
> - **Request Body:** Must contain the array of the following fields:
>
# still working on it

5- **GET** `/products?category=:category`
>
> - **Description:** This endpoint will be used to get all the products in a specific category.
> - **Request Params:** Must contain the following fields:
> - `category` : string, The name of the category.

6- **GET** `/products?brand=:brand`
>
> - **Description:** This endpoint will be used to get all the products of a specific brand.
> - **Request Params:** Must contain the following fields:
> - `brand` : string, The name of the brand.

7- **GET** `/products?recommended=true`
