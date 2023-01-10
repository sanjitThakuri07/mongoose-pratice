const assert = require("assert");

const User = require("../src/UserModel");

describe("Validating records", () => {
  it("requires a user name", (done) => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === "Name is required");
    done();
  });

  it("requires a name longer than 2 characters", (done) => {
    const user = new User({ name: "Al" });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === "Name must be longer thant 2 characters");
    done();
  });

  it("disallows invalid records from being saved", (done) => {
    const user = new User({ name: "Al" });
    user.save().catch((validationResult) => {
      const { message } = validationResult.errors.name;
      assert(message === "Name must be longer thant 2 characters");
      done();
    });
  });
});
