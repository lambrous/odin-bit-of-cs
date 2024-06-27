class Node {
	#nextNode = null;

	constructor(value = null) {
		this.value = value;
	}

	get nextNode() {
		return this.#nextNode;
	}

	set nextNode(node) {
		if (node != null && !(node instanceof Node)) {
			throw new Error("Invalid nextNode: Node expected");
		}
		this.#nextNode = node;
	}
}

class LinkedList {
	#head = null;
	#size = 0;

	append(value) {
		const node = new Node(value);
		this.#size++;

		if (this.#head == null) {
			this.#head = node;
			return;
		}

		let pointer = this.#head;
		while (pointer.nextNode) {
			pointer = pointer.nextNode;
		}
		pointer.nextNode = node;
	}

	prepend(value) {
		const node = new Node(value);
		node.nextNode = this.#head;
		this.#head = node;
		this.#size++;
	}

	get size() {
		return this.#size;
	}

	get head() {
		return this.#head;
	}

	get tail() {
		let pointer = this.#head;
		while (pointer?.nextNode) pointer = pointer.nextNode;
		return pointer;
	}

	at(index) {
		if (index >= this.#size || index < 0) {
			return null;
		}

		let pointer = this.#head;
		for (let i = 0; i !== index; i++) {
			pointer = pointer.nextNode;
		}

		return pointer;
	}

	pop() {
		if (this.#size === 0) return;
		if (this.#size === 1) {
			this.#head = null;
			this.#size--;
			return;
		}

		const beforeLastNode = this.at(this.#size - 2);
		beforeLastNode.nextNode = null;
		this.#size--;
	}

	contains(value) {
		let pointer = this.#head;

		while (pointer) {
			if (pointer.value === value) return true;
			pointer = pointer.nextNode;
		}

		return false;
	}

	find(value) {
		let pointer = this.#head;

		for (let i = 0; pointer != null; i++) {
			if (pointer.value === value) return i;
			pointer = pointer.nextNode;
		}

		return null;
	}

	toString() {
		if (!this.#head) return null;
		let pointer = this.#head;
		let string = "";

		while (pointer) {
			string += `( ${pointer.value} ) -> `;
			pointer = pointer.nextNode;
		}

		string += "null";
		return string;
	}

	#getNodePair(index) {
		let prev;
		let current;
		let pointer = this.#head;

		for (let i = 0; i <= index; i++) {
			if (i === index - 1) {
				prev = pointer;
			} else if (i === index) {
				current = pointer;
				break;
			}
			pointer = pointer.nextNode;
		}
		return [prev, current];
	}

	insertAt(value, index) {
		if (index < 0 || index > this.#size) {
			throw new Error("Invalid index");
		}

		if (index === 0) {
			this.prepend(value);
			return;
		}

		if (index === this.#size) {
			this.append(value);
			return;
		}

		const nodeToInsert = new Node(value);
		const [nodeBefore, nodeAfter] = this.#getNodePair(index);

		nodeBefore.nextNode = nodeToInsert;
		nodeToInsert.nextNode = nodeAfter;
		this.#size++;
	}

	removeAt(index) {
		if (index < 0 || index >= this.#size) {
			throw new Error("Invalid index");
		}

		if (index === this.#size - 1) {
			this.pop();
			return;
		}

		if (index === 0) {
			this.#head = this.#head.nextNode;
			this.#size--;
			return;
		}

		const [nodeBefore, nodeToRemove] = this.#getNodePair(index);
		nodeBefore.nextNode = nodeToRemove.nextNode;
		this.#size--;
	}
}
