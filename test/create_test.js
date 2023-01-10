const assert = require("assert");
const User = require("../src/UserModel");

describe("Creating Records", () => {
  it("savesuser", (done) => {
    const doc = new User({ name: "Sanjit" });

    doc.save().then(() => {
      assert(!doc.isNew);
      done();
    });
  });
});
