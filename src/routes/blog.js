const router = require("express").Router();
const app = require("../app");
const { route } = require("../app");
const Blog = require("../models/Blog");
const AppErr = require("../../AppError");
// Your routing code goes here

// router.get("/blog", async (req, res) => {
//   res.json({ ok: "blog" });
// });

function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
}

router.get(
  "/blog",
  wrapAsync(async (req, res, next) => {
    const { page, search } = req.query;
    const regexp = new RegExp(`\\b${search}\\b`, "gi");
    const blogs = await Blog.find({ topic: regexp })
      .skip(5 * Number(search) - 1)
      .limit(5);
    res.json({
      status: "success",
      result: blogs,
    });
  })
);

router.post(
  "/blog",
  wrapAsync(async (req, res, next) => {
    const blog = new Blog(req.body);
    const savedData = await blog.save();
    res.json({
      status: "success",
      result: savedData,
    });
  })
);

router.put(
  "/blog/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    res.json({
      status: "success",
      result: blog,
    });
  })
);

router.delete(
  "/blog/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    res.json({
      status: "success",
      result: blog,
    });
  })
);

router.use((req, res) => {
  res.status(404).send("Page Not Found");
});

router.use((err, req, res, next) => {
  const { status = 500, message = "Something Went Wrong" } = err;
  res.status(status).json({
    status: `Failded status-code: ${status}`,
    message: message,
  });
});

module.exports = router;
