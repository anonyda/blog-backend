
const express = require('express');
const { getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog } = require('../controllers/blogController');

const router = express.Router();

router.route('/').get(getAllBlogs).post(createBlog);
router.route('/:blogId').get(getBlogById).put(updateBlog).delete(deleteBlog);

module.exports = router;