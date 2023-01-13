const assert = require("assert");
const User = require("../src/UserModel");

describe("Subdocuments", () => {
  it("can create a subdocument", (done) => {
    // const
    const joe = new User({
      name: "joe",
      posts: [{ title: "PostTitle" }],
    });
    joe
      .save()
      .then((user) => User.findOne({ name: "joe" }))
      .then((user) => {
        assert(user.posts[0].title === "PostTitle");
        done();
      });
  });

  it("Can add subdocuments to an existing record", (done) => {
    const joe = new User({
      name: "joe",
      posts: [],
    });
    joe
      .save()
      .then(() => User.findOne({ name: "joe" }))
      .then((user) => {
        user.posts.push({ title: "New Post" });
        return user.save();
      })
      .then((user) => {
        assert(user.posts[0].title === "New Post");
        done();
      });
  });

  it("Can remove an existing subdocument", () => {
    const joe = new User({
      name: "joe",
      posts: [{ title: "PostTitle" }],
    });

    joe
      .save()
      .then(() => User.findOne({ name: "joe" }))
      .then((user) => {
        const post = user.posts[0];
        post.remove();
        return joe.save();
      })
      .then(() => User.findOne({ name: "joe" }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
