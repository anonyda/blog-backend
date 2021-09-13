const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    blogId: {
        type: String,
        required: true,
        unique: true,
    },
    author:{
        type:String, 
        required: [true, 'The author name is required. Please provide valid author name.']
    },
    createdAt: {
        type:Date,
        default: Date.now()
    },
    tags:{
        type:[String],
    },
    blogTitle: {
        type: String,
        required: [true, 'The blogTitle is required. Please provide valid title.'],
        // add some vaidations
    },
    blogContent: {
        type: String,
        required: [true, 'The blogContent is required. Please provide valid content.'],
        // add some vaidations
    },
    blogImage: {
        type: String
        },
    relatedLinks: {
        type:[{
            title:{
                type:String,
                required: [true, 'Title of the related link is required.']
            },
            href:{
                type:String,
                required:true,
                
            }
        }],
        default:[]
    }
    
});

let Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;