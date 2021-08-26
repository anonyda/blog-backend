const uniqid = require('uniqid');
const Blog = require("../models/blogModel");
const { APIError } = require('../models/errorModel');
const {successResponseHandler} = require('./responseController');


const createBlog = async (req, res, next) => {
    let selectQuery = "-_id";
    try{
        let {blogTitle, blogContent, author, createdAt, tags, relatedLinks} = req.body;
        // let blogImage = req.file.filename;
        let newBlog = await Blog.create({
            blogId: uniqid(),
            blogTitle,
            blogContent,
            author,
            tags,
            relatedLinks
        }).select(selectQuery);
        res.send(newBlog);

    }catch(err){
       next(APIError.badRequest(err.message));
    }
}

const getAllBlogs = async (req, res, next) => {
    let selectQuery = "-_id";
    try{

        let blogs = await Blog.find().select(selectQuery);
        res.send(blogs);

    }catch(err){
        next(err);
    }
}

const getBlogById = async (req, res, next) => {
    let selectQuery = "-_id";
    try{
        let blog = await Blog.findOne({blogId: req.params.blogId}).select(selectQuery);
        if(!blog){
            next(APIError.notFound(`The Blog ID ${req.params.blogId} not found.`));
            return;
        }
        successResponseHandler({
            res,
            statusCode: 200,
            data: blog
        });
        

    }catch(err){
        console.log(err);
        next({});
    }
}

const updateBlog = async (req, res, next) => {
    let updateKeys = ['blogTitle', 'blogContent', 'author', 'tags', 'relatedLinks'];
    const updates = {};
	Object.keys(req.body).forEach((key) => {
		if (updateKeys.includes(key)) {
			updates[key] = req.body[key];
		}
	});

    try{

        let updatedBlog = await Blog.findOneAndUpdate({blogId: req.params.blogId}, updates, {
            new: true,
            runValidators: true
        });
        if(!updatedBlog){
            next(APIError.notFound(`The Blog ID ${req.params.blogId} not found.`));
            return;
        }
        successResponseHandler({
            res,
            statusCode: 200,
            data: updatedBlog
        });

    }catch(err){
        console.log(err);
        if(err.name === 'ValidationError'){
            next(APIError.badRequest(err.message));
            return;
        }
        next({});
    }

    // res.send(updates);
    // console.log(typeof updates);

}

const deleteBlog = async (req, res, next) => {
    try{

        let deletedBlog = await Blog.findOneAndDelete({blogId: req.params.blogId});
        if(!deletedBlog){
            next(APIError.notFound(`The Blog ID ${req.params.blogId} not found.`));
            return;
        }
        successResponseHandler({
            res,
            statusCode: 204,
        });

    }catch(err){
        console.log(err);
        next({});

    }
}

module.exports = {
    getAllBlogs,
    createBlog,
    getBlogById,
    updateBlog,
    deleteBlog
}