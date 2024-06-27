import { LinkedList } from "./linked-list.mjs";

export class HashMap {
	static #LOAD_FACTOR = 0.75;
	static #BASE_CAPACITY = 16;
	#capacity = HashMap.#BASE_CAPACITY;
	#buckets = [];
	#filledBuckets = 0;
	#length = 0;

	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = hashCode * primeNumber + key.charCodeAt(i);
		}

		return hashCode;
	}

	set(key, value) {
		const index = this.hash(key) % this.#capacity;
		const bucket = this.#buckets[index];

		if (bucket instanceof LinkedList) {
			const keyExist = bucket.replace(key, value);
			if (!keyExist) {
				bucket.prepend(key, value);
				this.#length++;
			}
			return;
		}

		const fullCapacity =
			Math.round(this.#capacity * HashMap.#LOAD_FACTOR) <= this.#filledBuckets;

		if (!fullCapacity) {
			this.#buckets[index] = new LinkedList();
			this.#buckets[index].prepend(key, value);
			this.#length++;
			this.#filledBuckets++;
			return;
		}

		this.#grow();
		this.set(key, value);
	}

	#grow() {
		const oldBuckets = this.#buckets;
		this.#capacity *= 2;
		this.#reset();

		for (const list of oldBuckets) {
			if (list instanceof LinkedList) {
				list.forEachNode(({ key, value }) => {
					this.set(key, value);
				});
			}
		}
	}

	get(key) {
		const index = this.hash(key) % this.#capacity;
		return this.#buckets[index]?.getValue(key) ?? null;
	}

	has(key) {
		const index = this.hash(key) % this.#capacity;
		return this.#buckets[index]?.contains(key) ?? false;
	}

	remove(key) {
		const bucketIndex = this.hash(key) % this.#capacity;
		const list = this.#buckets[bucketIndex];
		if (list == null) return false;

		const removed = list.remove(key);
		if (removed) this.#length--;
		if (list.size === 0) {
			this.#buckets[bucketIndex] = null;
			this.#filledBuckets--;
		}
		return removed;
	}

	get length() {
		return this.#length;
	}

	#reset() {
		this.#buckets = [];
		this.#length = 0;
		this.#filledBuckets = 0;
	}

	clear() {
		this.#capacity = HashMap.#BASE_CAPACITY;
		this.#reset();
	}

	#getAll(property = null) {
		const arr = [];

		for (const list of this.#buckets) {
			if (list == null) continue;
			arr.push(...list.getAll(property));
		}

		return arr;
	}

	get keys() {
		return this.#getAll("key");
	}

	get values() {
		return this.#getAll("value");
	}

	get entries() {
		return this.#getAll();
	}
}
