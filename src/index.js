const app = require("./app");
require("dotenv").config();
const mongoose = require("mongoose");
//connect to DB
// console.log(process.env.DATABASE_URL);
mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to DB");
  }
);

app.listen(3000, () => console.log("Server running......"));
