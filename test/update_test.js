// const assert = require("assert");

// const User = require("../src/UserModel");

// describe("Update a user", () => {
//   let joe;

//   beforeEach((done) => {
//     joe = new User({ name: "joe" });
//     joe.save().then(() => {
//       done();
//     });
//   });

//   function assertName(operation, done, compareName) {
//     operation
//       .then(() => User.find({}))
//       .then((users) => {
//         assert(users.length === 1);
//         assert(users[0].name === compareName);
//         done();
//       });
//   }

//   // used for updating specific fields => safe method=> directly on document
//   it("instance type using set n save", (done) => {
//     joe.set("name", "sanjit");
//     assertName(joe.save(), done, "sanjit");
//   });

//   // one go and save it all => directly on a document
//   // it("model method update", (done) => {
//   //   assertName(joe.update({ name: "Alex" }), done, "Alex");
//   // });

//   it("A moel class can update", (done) => {
//     assertName(User.update({ name: "joe" }, { name: "Alex" }), done, "Alex");
//     // assertName(User.updateMany({ name: "joe" }, { name: "Alex" }), done, "Alex");
//   });

//   // it("A moel class can update one record", (done) => {
//   //   assertName(
//   //     User.findOneAndUpdate({ name: "Alex" }, { name: "sanjit" }),
//   //     done,
//   //     "sanjit"
//   //   );
//   // });

//   it("class method findByIdAndupdate", (done) => {
//     assertName(
//       User.findByIdAndUpdate(joe._id, { name: "sishant" }),
//       done,
//       "sishant"
//     );
//   });

//   it("A user can have their postcount incremented by 1", (done) => {
//     User.updateMany({ name: "joe" }, { $inc: { postCount: 10 } })
//       .then(() => User.findOne({ name: "joe" }))
//       .then((user) => {
//         assert(user.postCount === 10);
//         done();
//       });
//   });
// });
