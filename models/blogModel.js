const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    blogId: {
        type: String,
        required: true,
        unique: true,
        // What happens in the background when you set unique = true
        // how does it affect the performance of the application
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
        type: String // not be mandtory // add random by default
        },
        // should this be a subdocument 
        // or include it in blogs schema 
        // what are the differences 
    relatedLinks: {
        type:[{
            title:{
                type:String,
                required: [true, 'Title of the related link is required.']
            },
            href:{
                type:String,
                required:true,
                validate: {
                    validator: function(v) {
                        return /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(v);
                    },
                    message: props => `${props.value} is not a valid URL.   `
                }
            }
        }],
        default:[]
    }
    
});

let Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;