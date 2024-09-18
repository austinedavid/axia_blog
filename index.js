const express = require("express");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comments");
const authRoute = require("./routes/auth");
dotenv.config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();

// create connecttion
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected"))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// all the routes
app.use(userRoute);
app.use(postRoute);
app.use(commentRoute);
app.use(authRoute);
app.listen(PORT, () => {
  console.log(`app is running at ${PORT}`);
});
