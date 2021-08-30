const uniqid = require('uniqid');
const Blog = require("../models/blogModel");
const { APIError } = require('../models/errorModel');
const {successResponseHandler} = require('./responseController');
const { getImageURI } = require('../controllers/uploadController');
const { uploader } = require('../config/cloudinaryConfig');


const createBlog = async (req, res, next) => {
    let blogImage = undefined;
    try{
        let {blogTitle, blogContent, author, createdAt, tags, relatedLinks} = req.body;
        if(req.file){
            let file = (await getImageURI(req)).content;
            blogImage = (await uploader.upload(file)).url;
        }
        let newBlog = await Blog.create({
            blogId: uniqid(),
            blogTitle,
            blogContent,
            author,
            tags,
            relatedLinks: JSON.parse(relatedLinks),
            blogImage,
            createdAt
        });
        successResponseHandler({
            res,
            statusCode: 201,
            data: newBlog
        })

    }catch(err){
        console.log(err);
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
        next({});
    }
}

const updateBlog = async (req, res, next) => {
    let updateKeys = ['blogTitle', 'blogContent', 'author', 'tags', 'relatedLinks'];
    const updates = {};
	Object.keys(req.body).forEach((key) => {
		if (updateKeys.includes(key)) {
            if(key === 'relatedLinks'){
                updates[key] = JSON.parse(req.body[key]);    
                return;
            }
			updates[key] = req.body[key];
		}
	});

    try{

        if(req.file){
            let file = (await getImageURI(req)).content;
            blogImage = (await uploader.upload(file)).url;
            updates.blogImage = blogImage;
        }

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
        next(APIError.internalError(err.message));
    }

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