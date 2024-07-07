# Todo Application

This is a Todo application built with Node.js, Express, and MongoDB. It allows users to create, read, update, and delete (CRUD) their todo items.

## Table of Contents
- [Getting Started](#getting-started)
- [Routes](#routes)
  - [Authentication Routes](#authentication-routes)
    - [POST /auth/signup](#post-authsignup)
    - [POST /auth/login](#post-authlogin)
    - [POST /auth/logout](#post-authlogout)
  - [Todo Routes](#todo-routes)
    - [POST /todos/create](#post-todoscreate)
    - [GET /todos/getTodos](#get-todosgettodos)
    - [PUT /todos/update/:id](#put-todosupdateid)
    - [DELETE /todos/delete/:id](#delete-todosdeleteid)
  - [Feature Routes](#feature-routes)
    - [GET /feature/notification](#get-featurenotification)
- [Dependencies](#dependencies)

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository
    ```sh
    git clone https://github.com/diljotsingh04/todo_backend_for_company.git
    ```
2. Install NPM packages
    ```sh
    cd todo_backend_for_company
    npm install
    ```

3. Start the server
    ```sh
    node index.js
    ```

## Routes

### Authentication Routes

#### POST /auth/signup
```
localhost:3000/auth/signup
```
Endpoint for user signup.


**Request Body:**
```json
{
    "email": "diljot@singh.com",
    "password": "diljot"
}
```

#### POST /auth/login
```
localhost:3000//auth/login
```
Endpoint for user login.

**Request Body:**
```json
{
    "email": "diljot@singh.com",
    "password": "diljot"
}
```

Response:

```json
{
    "success": true,
    "message": "Login Successful"
}
```

#### POST /auth/logout
```
localhost:3000/auth/logout
```
Endpoint for user logout.

Response:

```json
{
    "success": true,
    "message": "Successfully Logout"
}
```

### Todo Routes

#### POST /todos/create
```
localhost:3000/todos/create
```
Endpoint to create a new todo.

Request Body:

```json
{
    "title": "todo 3",
    "description": "description 3",
    "deadline": "2024-07-07T11:44:17.712Z"
}
```

Response:

```json
{
    "success": true,
    "message": "Todo Added Successfully",
    "todo": {
        "title": "todo 3",
        "description": "description 3",
        "isDone": false,
        "deadline": "2024-07-07T11:44:17.712Z",
        "refTo": "668914c7b6a6ce7befaf96c8",
        "_id": "668934b300e758514665289a",
        "createdAt": "2024-07-06T12:12:35.483Z",
        "updatedAt": "2024-07-06T12:12:35.483Z",
        "__v": 0
    }
}
```

#### GET /todos/gettodos
```
localhost:3000/todos/gettodos
```
Endpoint to get all todos.

#### PUT /todos/update/:id
```
localhost:3000/todos/update/:id
```
Endpoint to update a todo.

Request Body:

```json
{
    "title": "Go to gym",
    "description": "do three pushups and 5 benchpress",
    "deadline": "2024-07-31T23:59:59.000Z",
    "isDone": true
}
```

#### DELETE /todos/delete/:id
```
localhost:3000/todos/delete/:id
```
Endpoint to delete a todo.

Feature Routes
#### GET /feature/notification
```
localhost:3000/feature/notification
```
Endpoint to get notifications for todos with a deadline within 1 day.

Response:

```json
[
    {
        "email": "diljot@singh.com",
        "todos": [
            {
                "title": "notification testing",
                "description": "description 3",
                "deadline": "2024-07-07T11:44:17.712Z"
            },
            {
                "title": "notification testing 2",
                "description": "description 3",
                "deadline": "2024-07-07T11:44:17.712Z"
            },
            {
                "title": "todo 3",
                "description": "description 3",
                "deadline": "2024-07-07T11:44:17.712Z"
            }
        ]
    },
    {
        "email": "gagan@singh.com",
        "todos": [
            {
                "title": "notification testing 3",
                "description": "description 3",
                "deadline": "2024-07-07T11:44:17.712Z"
            }
        ]
    }
]
```
## Dependencies

- express
- mongoose
- jsonwebtoken
- cookie-parser
- nodemon