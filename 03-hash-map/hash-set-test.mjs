import { HashSet } from "./hash-set.mjs";

const test = new HashSet();

test.set("apple");
test.set("banana");
test.set("carrot");
test.set("dog");
test.set("elephant");
test.set("frog");
test.set("grape");
test.set("hat");
test.set("ice cream");
test.set("jacket");
test.set("kite");
test.set("lion");

test.set("apple");
test.set("moon");
test.set("shirt");
test.set("test1");
test.set("test2");
test.set("test3");
test.set("test4");

test.set("hat");
test.set("grape");

console.log(test.has("dog"));
console.log(test.has("cat"));
console.log(test.remove("test3"));
console.log(test.length);
console.log(test.keys);
console.log(test);

test.clear();
console.log(test.keys);
