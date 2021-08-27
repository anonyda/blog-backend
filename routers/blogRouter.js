
const express = require('express');
const { getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog } = require('../controllers/blogController');
const { multerUploads } = require('../controllers/uploadController');

const router = express.Router();

router.route('/').get(getAllBlogs).post(multerUploads, createBlog);
router.route('/:blogId').get(getBlogById).put(multerUploads ,updateBlog).delete(deleteBlog);

module.exports = router;