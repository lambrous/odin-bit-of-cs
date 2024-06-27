class Node {
	#nextNode = null;

	constructor(key, value = null) {
		if (key == null) {
			throw new Error("Missing key for Node");
		}
		this.key = key;
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

export class LinkedList {
	#head = null;
	#size = 0;

	prepend(key, value) {
		const node = new Node(key, value);
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

	contains(key) {
		let pointer = this.#head;

		while (pointer) {
			if (pointer.key === key) return true;
			pointer = pointer.nextNode;
		}

		return false;
	}

	toString() {
		if (!this.#head) return null;
		let pointer = this.#head;
		let string = "";

		while (pointer) {
			string += `( ${pointer.key} ) -> `;
			pointer = pointer.nextNode;
		}

		string += "null";
		return string;
	}

	replace(key, value = null) {
		let pointer = this.#head;

		while (pointer != null) {
			if (pointer.key === key) {
				pointer.value = value;
				return true;
			}
			pointer = pointer.nextNode;
		}

		return false;
	}

	forEachNode(action) {
		let pointer = this.#head;

		while (pointer != null) {
			action(pointer);
			pointer = pointer.nextNode;
		}
	}

	getValue(key) {
		let pointer = this.#head;
		while (pointer != null) {
			if (pointer.key === key) return pointer.value;
			pointer = pointer.nextNode;
		}
		return null;
	}

	remove(key) {
		let pointer = this.#head;
		let prevNode;

		while (pointer != null) {
			if (pointer.key === key) {
				if (prevNode == null) this.#head = pointer.nextNode;
				else prevNode.nextNode = pointer.nextNode;
				this.#size--;
				return true;
			}
			prevNode = pointer;
			pointer = pointer.nextNode;
		}

		return false;
	}

	getAll(property = null) {
		if (property !== "key" && property !== "value" && property != null) {
			throw new Error("Invalid property argument.");
		}

		let pointer = this.#head;
		const result = [];

		while (pointer != null) {
			const entry =
				property == null ? [pointer.key, pointer.value] : pointer[property];
			result.push(entry);
			pointer = pointer.nextNode;
		}

		return result;
	}
}
