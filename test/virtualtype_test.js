const assert = require("assert");
const User = require("../src/UserModel");

describe("Virtual Types", () => {
  it("postCount returns number of posts", (done) => {
    const joe = new User({
      name: "joe",
      posts: [{ title: "post tittle" }],
    });

    joe
      .save()
      .then(() => User.findOne({ name: "joe" }))
      .then((user) => {
        assert(joe.postCount === 1);
        done();
      });
  });
});
