# Shopping-List
fullstack task shopping list

## Task: My First Fullstack App - shopping list
 - Create new private repository
 - Create new brunch called "backend"
 - Create Restful API using NodeJS + ExpressJS for [shopping list app](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents#Active_learning_A_dynamic_shopping_list:~:text=Active%20learning%3A%20A%20dynamic%20shopping%20list) with 5 entry points:
    - a GET request to /products/ returns a list of products object from a static array
    - a GET request to /products/{id} returns the details of product 123 from the static array
    - a POST request to /products create new product object in the static array and return the new product object (should include unique id)
    - a PUT request to /products/{id} get in the body params updated product object, update product object and return the updated product
    - a DELETE request to /products/{id} delete a product from the static array
  - Write a client side shopping app for your pair that use the backend APIs using AJAX
