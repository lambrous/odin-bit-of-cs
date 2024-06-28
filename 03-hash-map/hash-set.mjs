import { LinkedList } from "./linked-list.mjs";

export class HashSet {
	static #LOAD_FACTOR = 0.75;
	static #BASE_CAPACITY = 16;
	#capacity = HashSet.#BASE_CAPACITY;
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

	set(key) {
		const index = this.hash(key) % this.#capacity;
		const bucket = this.#buckets[index];

		if (bucket instanceof LinkedList) {
			const keyExist = bucket.replace(key);
			if (!keyExist) {
				bucket.prepend(key);
				this.#length++;
			}
			return;
		}

		const fullCapacity =
			Math.round(this.#capacity * HashSet.#LOAD_FACTOR) <= this.#filledBuckets;

		if (!fullCapacity) {
			this.#buckets[index] = new LinkedList();
			this.#buckets[index].prepend(key);
			this.#length++;
			this.#filledBuckets++;
			return;
		}

		this.#grow();
		this.set(key);
	}

	#grow() {
		const oldBuckets = this.#buckets;
		this.#capacity *= 2;
		this.#reset();

		for (const list of oldBuckets) {
			if (list instanceof LinkedList) {
				list.forEachNode(({ key }) => {
					this.set(key);
				});
			}
		}
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
		this.#capacity = HashSet.#BASE_CAPACITY;
		this.#reset();
	}

	get keys() {
		const arr = [];

		for (const list of this.#buckets) {
			if (list == null) continue;
			arr.push(...list.getAll("key"));
		}

		return arr;
	}
}
