import { Tree } from "./binary-search-tree.mjs";

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 7, 10, 77]);

tree.prettyPrint();
console.log("Is balanced:", tree.isBalanced);

console.log("\n--- Level Order ---");
tree.levelOrder(console.log);

console.log("\n--- Pre Order ---");
tree.preOrder(console.log);

console.log("\n--- Post Order ---");
tree.postOrder(console.log);

console.log("\n--- In Order ---");
tree.inOrder(console.log);

tree.insert(101);
tree.insert(107);
tree.insert(200);
tree.insert(777);
tree.insert(427);

console.log("\nIs balanced:", tree.isBalanced);
tree.prettyPrint();

if (!tree.isBalanced) tree.rebalance();

console.log("\nIs balanced:", tree.isBalanced);
tree.prettyPrint();
