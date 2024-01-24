# How to run the todo application

Follow the following steps to run the application on your local machine:

- Clone the [repository](https://localhost.com):

  `git clone repository-url`

- Change to the directory of the project:

  `cd todos`

- install node packages:

  `npm install`

- create .env file in the project root directory (same location as package.json)
  and corresponding values from your postgres database like so:

  ```

  PG_HOST=<postgres hostname>

  PG_PORT=<postgres port>

  PG_USER=<postgres database user>

  PG_PASSWORD=<postgres database password>

  PG_DATABASE=<postgres database name>

  ```

- Start the application: `npm run dev`

- Use postman or any other API client application to test the end-points like
  so:

  - Get all todos:

    Enter the url (`http://localhost:8000/todos`) into the address box using GET
    request method.

  - Get a single todo:

    Enter the url (`http://localhost:8000/todos/id`) into the address box using
    GET request method. Replace "id" with integer representing a todo's ID.

  - Create a todo:

    Enter the url (`http://localhost:8000/todos`) into the address box using
    POST request method. The body of the request should look like so:

        `{
            "title": "Some title",
            "completed": true,
        }`

    The "completed" can be omitted and it will be assigned default of false.

  - Update todo:

    Enter the url (`http://localhost:8000/todos/id`) into the address box using
    PUT request method. Replace "id" with integer representing a todo's ID. The
    body of the request should look like so:

        `{
            "title": "Some new title",
            "completed": false,
        }`

    Both fields are required

  - Delete a single todo:

    Enter the url (`http://localhost:8000/todos/id`) into the address box using
    DELETE request method. Replace "id" with integer representing a todo's ID.

## Adding user management

Using JWT authentication, user can be authenticated using token containing
user's ID that can be retrieved by a middleware to determine if their ID matches
the user ID for a given todo.

It is implementable by:

- Updating todo table by adding "user" field to store the ID of the user who
  created the todo
- Creating a User table to store users who create todos. Basic user will have
  ID, email, password
- Creating a middleware to extract token from Authorization header and decode
  user's payload (e.g ID)
- Querying user with the decoded ID to see if it exists
- Executing the request (i.e. get single todo, get all todos, delete a todo, or
  update a todo ) on todos with matching user ID if user exists
- Sending response with error if user does not exist or no matching todo with a
  given todo ID
