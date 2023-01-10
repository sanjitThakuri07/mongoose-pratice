const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect("mongodb://localhost/users_test");

  mongoose.connection
    .once("open", () => {
      console.log("Good to go");
      done();
    })
    .on("error", (err) => console.warn("Error", err));
});

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    // ready to run the test
    done();
  });
});
