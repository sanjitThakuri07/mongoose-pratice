const mongoose = require("mongoose");

const PostSchema = require("./PostSchema");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: "Name must be longer thant 2 characters",
    },
    required: [true, "Name is required"],
  },
  // postCount: Number,
  posts: [PostSchema],
  blogPosts: [{ type: mongoose.Types.ObjectId, ref: "blogPost" }],
});

UserSchema.virtual("postCount").get(function () {
  return this.posts.length;
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
