import { uniqueSort } from "./sort.mjs";

class Node {
	#left = null;
	#right = null;

	constructor(value) {
		this.value = value;
	}

	get left() {
		return this.#left;
	}

	set left(node) {
		if (node != null && !(node instanceof Node)) {
			throw new TypeError("The left child must be a Node or null");
		}
		this.#left = node;
	}

	get right() {
		return this.#right;
	}

	set right(node) {
		if (node != null && !(node instanceof Node)) {
			throw new TypeError("The right child must be a Node or null");
		}
		this.#right = node;
	}
}

class Tree {
	#root = null;

	constructor(array) {
		this.#root = Tree.buildTree(uniqueSort(array));
	}

	get root() {
		return this.#root;
	}

	static buildTree(array = [], start = 0, end = array.length - 1) {
		if (start > end) return null;
		const mid = Math.floor((start + end) / 2);

		const root = new Node(array[mid]);
		root.left = Tree.buildTree(array, start, mid - 1);
		root.right = Tree.buildTree(array, mid + 1, end);

		return root;
	}

	prettyPrint(node = this.#root, prefix = "", isLeft = true) {
		if (node == null) return;

		if (node.right != null) {
			this.prettyPrint(
				node.right,
				`${prefix}${isLeft ? "│   " : "    "}`,
				false,
			);
		}

		console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);

		if (node.left != null) {
			this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
		}
	}

	insert(value, pointer = this.#root) {
		if (pointer == null) return;

		const nextNode = value < pointer.value ? pointer?.left : pointer?.right;
		if (nextNode == null) {
			const newNode = new Node(value);
			this.#replaceNodeInParent(pointer, newNode, newNode);
			return;
		}

		this.insert(value, nextNode);
	}

	deleteItem(value, pointer = this.#root, parent = null) {
		if (pointer == null) return;

		if (pointer.value === value) {
			if (pointer.left == null && pointer.right == null) {
				this.#replaceNodeInParent(parent, pointer, null);
			} else if (pointer.left != null && pointer.right != null) {
				pointer.value = this.#extractMinValue(pointer.right, pointer);
			} else {
				const child = pointer.left == null ? pointer.right : pointer.left;
				this.#replaceNodeInParent(parent, pointer, child);
			}
			return;
		}

		const nextNode = value < pointer.value ? pointer.left : pointer.right;
		this.deleteItem(value, nextNode, pointer);
	}

	#replaceNodeInParent(parent, toRemove, newNode) {
		if (parent == null) {
			this.#root = newNode;
		} else if (toRemove.value < parent.value) {
			parent.left = newNode;
		} else {
			parent.right = newNode;
		}
	}

	#extractMinValue(pointer, parent, isLeft = false) {
		if (pointer.left == null) {
			if (isLeft) parent.left = pointer.right;
			else parent.right = pointer.right;
			return pointer.value;
		}
		return this.#extractMinValue(pointer.left, pointer, true);
	}

	find(value) {
		let pointer = this.#root;
		if (pointer == null) return;

		while (pointer != null) {
			if (pointer.value === value) {
				return pointer;
			}
			pointer = value < pointer.value ? pointer.left : pointer.right;
		}

		return null;
	}

	levelOrder(callback) {
		if (this.#root == null) return;

		const queue = [this.#root];
		const array = [];

		while (queue.length) {
			const node = queue.shift();

			if (!callback) array.push(node.value);
			else callback(node);

			if (node.left != null) queue.push(node.left);
			if (node.right != null) queue.push(node.right);
		}

		if (!callback) return array;
	}

	#levelOrderRecursive = this.#order(
		(callback = addToArray, queue = [this.#root]) => {
			if (queue.length === 0) return;

			const [node, ...nextQueue] = queue;
			callback(node);
			if (node.left != null) nextQueue.push(node.left);
			if (node.right != null) nextQueue.push(node.right);

			this.#levelOrderRecursive(callback, nextQueue);
		},
	);

	get levelOrderRecursive() {
		return this.#levelOrderRecursive;
	}

	#order(recursiveOrder) {
		return (callback, pointer) => {
			const array = [];

			const addToArray = (node) => {
				array.push(node.value);
			};

			recursiveOrder(callback ?? addToArray, pointer);
			return array;
		};
	}

	#inOrder = this.#order((callback, pointer = this.#root) => {
		if (pointer == null) return;
		this.inOrder(callback, pointer.left);
		callback(pointer);
		this.inOrder(callback, pointer.right);
	});

	get inOrder() {
		return this.#inOrder;
	}

	#preOrder = this.#order((callback, pointer = this.#root) => {
		if (pointer == null) return;
		callback(pointer);
		this.preOrder(callback, pointer.left);
		this.preOrder(callback, pointer.right);
	});

	get preOrder() {
		return this.#preOrder;
	}

	#postOrder = this.#order((callback, pointer = this.#root) => {
		if (pointer == null) return;
		this.postOrder(callback, pointer.left);
		this.postOrder(callback, pointer.right);
		callback(pointer);
	});

	get postOrder() {
		return this.#postOrder;
	}

	height(node) {
		if (!(node instanceof Node)) {
			throw new Error("Invalid node type");
		}

		let currentLevel = [node];
		let height = -1;

		while (currentLevel.length) {
			height++;
			const nextLevel = [];
			for (const currentNode of currentLevel) {
				if (currentNode.left != null) nextLevel.push(currentNode.left);
				if (currentNode.right != null) nextLevel.push(currentNode.right);
			}
			currentLevel = nextLevel;
		}

		return height;
	}

	depth(node) {
		if (!(node instanceof Node)) {
			throw new Error("Invalid node type");
		}

		let pointer = this.#root;
		let depth = -1;

		while (pointer != null) {
			depth++;
			if (node === pointer) return depth;
			pointer = node.value < pointer.value ? pointer.left : pointer.right;
		}

		return -1;
	}
}
