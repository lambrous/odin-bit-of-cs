class Node {
	constructor(value = null, nextNode = null) {
		this.value = value;
		this.nextNode = nextNode;
	}
}

class LinkedList {
	head = null;
	size = 0;

	append(value) {
		const node = new Node(value);
		this.size++;

		if (this.head === null) {
			this.head = node;
			return;
		}

		let pointer = this.head;
		while (pointer.nextNode) {
			pointer = pointer.nextNode;
		}
		pointer.nextNode = node;
	}

	prepend(value) {
		const node = new Node(value);
		node.nextNode = this.head;
		this.head = node;
		this.size++;
	}

	get tail() {
		let pointer = this.head;
		while (pointer?.nextNode) pointer = pointer.nextNode;
		return pointer;
	}

	at(index) {
		if (index >= this.size || index < 0) {
			return null;
		}

		let pointer = this.head;
		for (let i = 0; i !== index; i++) {
			pointer = pointer.nextNode;
		}

		return pointer;
	}

	pop() {
		if (this.size === 0) return;
		if (this.size === 1) {
			this.head = null;
			this.size--;
			return;
		}

		const beforeLastNode = this.at(this.size - 2);
		beforeLastNode.nextNode = null;
		this.size--;
	}

	contains(value) {
		let pointer = this.head;

		while (pointer) {
			if (pointer.value === value) return true;
			pointer = pointer.nextNode;
		}

		return false;
	}

	find(value) {
		let pointer = this.head;

		for (let i = 0; pointer !== null; i++) {
			if (pointer.value === value) return i;
			pointer = pointer.nextNode;
		}

		return null;
	}

	toString() {
		if (!this.head) return null;
		let pointer = this.head;
		let string = "";

		while (pointer) {
			string += `( ${pointer.value} ) -> `;
			pointer = pointer.nextNode;
		}

		string += "null";
		return string;
	}
}
