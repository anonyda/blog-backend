# BloggIt
A RESTful API for Blogs built using Node.js, Express, MongoDB and Cloudinary.

This project implements a fully functional RESTful API that can be used as a backend for a blogging website.

## Features
* Get all blogs
* Get a blog by ID
* Create a new blog
* Update a blog
* Delete a blog

## Installation
You will need to install the latest version of [Node.js](https://nodejs.dev/download). 
You will also have to set up an account on [Cloudinary](https://cloudinary.com/), since we will be using this service to store our images.

Once done with this, you can follow these steps to run a local copy of BloggIt on your machine:

#### 1. Clone this repository
```bash
git clone https://github.com/anonyda/blog-backend.git 
```
Navigate to the project folder
```bash
cd blog-backend
```
#### 2. Set Up Environment Variables
You can create your own ```config.env``` file in the root directory. You can refer to the structure of the file from ```sample-config.env``` file.
```env
PORT = 'Some Port Number'
DB_LOCAL = 'Your MongoDB Database Path'
CLOUD_NAME = 'YOUR CLOUDINARY CLOUD NAME'
CLOUDINARY_API_KEY = 'YOUR CLOUDINARY API KEY'
CLOUDINARY_API_SECRET = 'YOUR CLOUDINARY API SECRET'
```

#### 3. Install Project Dependencies
Next, you have to install the packages required to run BloggIt on your machine. You can run the following command to install them.
```bash
npm install
```

#### 4. Run the Server
Now that you are all set up, time to run the server. Start your MongoDB database server on your terminal with the ```mongod``` command, 
and then run the following command from the root directory
```bash
npm run start
```

<b> Et Voila! BloggIt is now running on your machine. </b>

## Usage
You can use the API on the endpoint ```/blogs```. Let's see how.

### Fetch All Blogs

```bash
GET /blogs
```

A GET request at ```/blogs``` endpoint will fetch all the blogs from the server in JSON format.

### Fetch A Blog by ID

```bash
GET /blogs/blogId
```

A GET request at ```/blogs/blogId``` endpoint will fetch that particular blog, if it exists, from the server in JSON format. 
If the blog does not exist, it returns a ```404 Not Found``` response.

### Create A New Blog

```bash
POST /blogs
```

A POST request at ```/blogs``` with a valid body will create a new blog, and will return the newly created blog from the server in JSON format. 
If the request body has missing parameters, it returns a ```400 Bad Request``` response.

<b> Parameters in the Request Body</b>
* blogTitle *(required)*
* blogContent *(required)*
* author *(required)*
* createdAt *(optional)*
* tags *(optional)*
* blogImage *(optional)*
* relatedLinks *(optional)*

<b> relatedLinks structure </b>

```json
"relatedlinks": [
        {
            "title": "Express Best Practices",
            "href": "https://expressjs.com"
        },
         {
            "title": "Node JS and Express",
            "href": "https://expressjs.com"
        }
    ]
```

<b> Note: We will be using <b>form-data</b> to send the request. </b>

#### Sample Body for Create

![Sample Body For Create](https://github.com/anonyda/blog-backend/blob/master/assets/create-example.png)

Since we're using ```form-data``` to take input in Postman, we can only send text and files in our body. 
But we need to send relatedLinks as a JSON Array. So we will replicate the structure of the JSON array in the argument, as shown above. 
The Backend takes care of the parsing. 

### Update A Blog

```bash
PUT /blogs/blogId
```

A PUT request at ```/blogs/blogId``` with a valid body will update an existing blog, and will return the updated blog from the server in JSON format.
You can pass the parameters you want to update. If you want to update ```relatedLinks```, you will have to pass a JSON Array like structure in the body.
If the blog does not exist, it returns a ```404 Not Found``` response.

#### Sample Body for Update
![Sample Body for Update](https://github.com/anonyda/blog-backend/blob/master/assets/update-example.png)

### Delete A Blog

```bash
DELETE /blogs/blogId
```

A DELETE request at ```/blogs/blogId``` endpoint will delete that particular blog, if it exists, from the server. 
If the blog does not exist, it returns a ```404 Not Found``` response.

## Additional Details
* Uses Multer for File Upload
* Uses Error Handling Middleware for handling application errors

## Try It Yourself
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/13174206-43074281-ef85-4a8e-a6a4-41cbdeede670?action=collection%2Ffork&collection-url=entityId%3D13174206-43074281-ef85-4a8e-a6a4-41cbdeede670%26entityType%3Dcollection%26workspaceId%3Df3c769ec-7032-4d9f-9b5a-b5fa49b429da)

### To Do
- [ ] Write Test Cases
- [ ] Handle 404 Routes






