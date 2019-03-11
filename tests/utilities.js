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
    
    describe("suppressErrors", function() {
        it("Prevent error propagation", function() {
            const thrower = () => {throw "Error";};
            const wrapped = Utilities.suppressErrors(thrower);
            assert.doesNotThrow(wrapped);
        });
        it("Allows arguments through", function() {
            const thrower = (foo) => {
                assert.equal(foo, "bar");
            };
            const wrapped = Utilities.suppressErrors(thrower);
            wrapped("bar");
        });
        it("Retains the return value", function() {
            const thrower = () => {return "bar";};
            const wrapped = Utilities.suppressErrors(thrower);
            const foo = wrapped();
            assert.equal(foo, "bar");
        });
    });

    describe("formatTString", function() {
        it("Should handle direct replacement", function() {
            const template = `This is a \${success}`;
            const filledOut = Utilities.formatTString(template, {success: "success"});
            assert.equal("This is a success", filledOut);
        });
        it("Should not error with excess data", function() {
            const template = `This is a \${success}`;
            const filledOut = Utilities.formatTString(template, {success: "success", otherthing: "foo"});
            assert.equal("This is a success", filledOut);
        });
        it("Should stringify objects", function() {
            const template = `This is a \${success}`;
            const filledOut = Utilities.formatTString(template, {success: {misnomer: "good"}});
            assert.equal(`This is a {"misnomer":"good"}`, filledOut);
        });
        it("Should stringify arrays", function() {
            const template = `This is a \${success}`;
            const filledOut = Utilities.formatTString(template, {success: ["success", "or", "failure"]});
            assert.equal(`This is a ["success","or","failure"]`, filledOut);
        });
        it("Use the return value of functions", function() {
            const template = `This is a \${success}`;
            const filledOut = Utilities.formatTString(template, {success: () => "test"});
            assert.equal(`This is a test`, filledOut);
        });
    });

    describe("formatString", function() {
        it("Should handle direct replacement", function() {
            const template = `This is a {{success}}`;
            const filledOut = Utilities.formatString(template, {success: "success"});
            assert.equal("This is a success", filledOut);
        });
        it("Should not error with excess data", function() {
            const template = `This is a {{success}}`;
            const filledOut = Utilities.formatString(template, {success: "success", otherthing: "foo"});
            assert.equal("This is a success", filledOut);
        });
        it("Should stringify objects", function() {
            const template = `This is a {{success}}`;
            const filledOut = Utilities.formatString(template, {success: {misnomer: "good"}});
            assert.equal(`This is a {"misnomer":"good"}`, filledOut);
        });
        it("Should stringify arrays", function() {
            const template = `This is a {{success}}`;
            const filledOut = Utilities.formatString(template, {success: ["success", "or", "failure"]});
            assert.equal(`This is a ["success","or","failure"]`, filledOut);
        });
        it("Use the return value of functions", function() {
            const template = `This is a {{success}}`;
            const filledOut = Utilities.formatString(template, {success: () => "test"});
            assert.equal(`This is a test`, filledOut);
        });
    });

    describe("addToPrototype", function() {
        const Foo = function(){};
        const getFoo = function() {return "foo";};
        const getBar = function() {return "bar";};
        it("Adds to prototype when no function exists", function() {
            Utilities.addToPrototype(Foo, "getFoo", getFoo);
            assert.equal(Foo.prototype.getFoo, getFoo);
        });
        it("Does not add to the prototype if it already exists", function() {
            Utilities.addToPrototype(Foo, "getFoo", getBar);
            assert.notEqual(Foo.prototype.getFoo, getBar);
            assert.equal(Foo.prototype.getFoo, getFoo);
        });
        it("Produces no error if the prototype doesn't exist", function() {
            const random = {};
            assert.doesNotThrow(() => {Utilities.addToPrototype(random, "getFoo", getBar);});
        });
    });

    describe("removeFromArray", function() {
        it("Removes an entry from the array", function() {
            const myArray = [1, 5, 10];
            Utilities.removeFromArray(myArray, 5);
            assert.ok(!myArray.includes(5));
        });
        it("Removes all instances of the item to remove", function() {
            const myArray = [1, 5, 10, 5];
            Utilities.removeFromArray(myArray, 5);
            assert.ok(!myArray.includes(5));
        });
        it("Handles object instances", function() {
            const Foo = function(){};
            const foo = new Foo();
            const myArray = [1, foo, 10, 5, foo];
            Utilities.removeFromArray(myArray, foo);
            assert.ok(!myArray.includes(foo));
        });
        it("Handles arrays", function() {
            const foo = [1, 5, 10, 7];
            const myArray = [1, foo, 10, 5, foo];
            Utilities.removeFromArray(myArray, foo);
            assert.ok(!myArray.includes(foo));
        });
    });
});