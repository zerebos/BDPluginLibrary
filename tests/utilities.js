import assert from "assert";
import Utilities from "../src/modules/utilities";

describe("Utilities", function() {
    describe("isNil", function() {
        it("Should return true given null", function() {
            assert.ok(Utilities.isNil(null));
        });
        it("Should return true given undefined", function() {
            assert.ok(Utilities.isNil(undefined));
        });
        it("Should return false given a Number", function() {
            assert.ok(!Utilities.isNil(0));
        });
        it("Should return false given a String", function() {
            assert.ok(!Utilities.isNil(""));
        });
        it("Should return false given an Object", function() {
            assert.ok(!Utilities.isNil({}));
        });
        it("Should return false given an Array", function() {
            assert.ok(!Utilities.isNil([]));
        });
        it("Should return false given a Function", function() {
            assert.ok(!Utilities.isNil(assert));
        });
    });
});