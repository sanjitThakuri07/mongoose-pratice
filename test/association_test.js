const mongoose = require("mongoose");
const User = require("../src/UserModel");
const Comment = require("../src/commentModel");
const BlogPost = require("../src/blogPostModel");
const assert = require("assert");

describe("Associations", () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
      title: "Js is great",
      content: "Yes it really is",
    });
    comment = new Comment({ content: "Congrats on great article" });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    );
  });

  it("saves a relation between a user and a blogpost", () => {
    User.findOne({ name: "Joe" })
      .populate("blogPosts")
      .then((user) => {
        // console.log({ user });
        // console.log(user.blogPosts);
        assert(user.blogPosts[0].title === "Js is great");
        done();
      });
  });

  it("saves a ful relation graph", () => {
    User.findOne({ name: "Joe" })
      .populate({
        path: "blogPosts",
        populate: {
          path: "comments",
          model: "comment",
          populate: {
            path: "user",
            model: "user",
          },
        },
      })
      .then((user) => {
        // console.log(user.blogPosts[0]);
        // console.log(user.blogPosts[0].comments);
        // console.log(user.blogPosts[0].comments[0].user);
        assert(user.name === "Joe");
        assert(user.blogPosts[0].title === "Js is Great");
        assert(
          user.blogPosts[0].comments[0].content === "Congrats on great post"
        );
        assert(user.blogPosts[0].comments[0].user.name === "joe");
        // console.log({ user });
      });
  });
});
