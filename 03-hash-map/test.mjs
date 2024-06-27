import { HashMap } from "./hash-map.mjs";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("apple", "green");
test.set("moon", "silver");
test.set("shirt", "black");
test.set("test1", "brown");
test.set("test2", "brown");
test.set("test3", "brown");
test.set("test4", "brown");

test.set("hat", "white");
test.set("grape", "green");

console.log(test.get("grape"));
console.log(test.has("dog"));
console.log(test.remove("test3"));
console.log(test.length);
console.log(test.keys);
console.log(test.values);
console.log(test.entries);
console.log(test);

test.clear();
console.log(test.entries);
