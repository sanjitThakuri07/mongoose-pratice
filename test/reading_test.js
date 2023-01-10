const assert = require("assert");
const User = require("../src/UserModel");

describe("Reading records from the database", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "joe" });
    joe.save().then(() => {
      done();
    });
  });

  it("finds all users with a name of joe", (done) => {
    User.find({ name: "joe" }).then((users) => {
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });
  it("finds a user with a name of joe", (done) => {
    User.findOne({ _id: joe._id }).then((user) => {
      assert(user.name === "joe");
      done();
    });
  });
});
