class Node {
	constructor(key, value = null) {
		if (!key) {
			throw new Error("Node: Missing key argument.");
		}
		this.key = key;
		this.value = value;
	}
}

class HashMap {
	#capacity = 16;
	#buckets = new Array(this.#capacity);
	#length = 0;
	static #LOAD_FACTOR = 0.75;

	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = hashCode * primeNumber + key.charCodeAt(i);
		}

		return hashCode;
	}

	get length() {
		return this.#length;
	}

	set(key, value) {
		const index = this.hash(key) % this.#capacity;
		const existingNode = this.#buckets[index];
		const fullCapacity =
			Math.floor(this.#capacity * HashMap.#LOAD_FACTOR) < this.length;

		if (existingNode?.key === key || (existingNode == null && !fullCapacity)) {
			this.#buckets[index] = new Node(key, value);
			this.#length++;
			return;
		}

		this.#grow();
		this.set(key, value);
	}

	#grow() {
		const oldBuckets = this.#buckets;
		this.#capacity *= 2;
		this.clear();

		for (const node of oldBuckets) {
			if (node == null) continue;
			this.set(node.key, node.value);
		}
	}

	get(key) {
		const index = this.hash(key) % this.#capacity;
		return this.#buckets[index]?.value ?? null;
	}

	has(key) {
		const index = this.hash(key) % this.#capacity;
		return this.#buckets[index] != null;
	}

	remove(key) {
		const index = this.hash(key) % this.#capacity;
		if (this.#buckets[index] == null) return false;

		this.#buckets[index] = null;
		this.#length--;
		return true;
	}

	clear() {
		this.#buckets = new Array(this.#capacity);
		this.#length = 0;
	}

	keys() {
		return this.#buckets.reduce((result, node) => {
			if (node == null) return result;
			return result.concat(node.key);
		}, []);
	}

	values() {
		return this.#buckets.reduce((result, node) => {
			if (node == null) return result;
			return result.concat(node.value);
		}, []);
	}

	entries() {
		return this.#buckets.reduce((result, node) => {
			if (node == null) return result;
			return result.concat([[node.key, node.value]]);
		}, []);
	}

	get capacity() {
		return this.#capacity;
	}

	get buckets() {
		return this.#buckets;
	}
}

// Test
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
