const mongoose = require("mongoose");
const Blog = require("./src/models/Blog");
const faker = require("faker");
require("dotenv").config();
// dotenv.config();
//connect to DB
mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to DB");
  }
);

let topics = ["React", "JavaSript", "HTML/CSS", "Data Structures", "NodeJS"];

let blogs = [];

for (let topic of topics) {
  for (let i = 0; i < 20; i++) {
    blogs.push({
      topic: topic,
      description: faker.lorem.paragraph(),
      posted_at: faker.hacker.noun(),
      posted_by: faker.name.findName(),
    });
  }
}

Blog.insertMany(blogs)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
