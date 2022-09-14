const { string } = require("joi");
const mongooose = require("mongoose");

const blogSchema = new mongooose.Schema({
  // Your code goes here
  topic: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  posted_at: {
    type: String,
    default: "anonymous",
  },
  posted_by: {
    type: String,
    default: "anonymous",
  },
});

const Blog = mongooose.model("Blog", blogSchema);

module.exports = Blog;
