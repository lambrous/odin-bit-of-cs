// sort and remove duplicates
export function uniqueSort(arr) {
	if (arr.length < 2) return arr;

	const mid = Math.floor(arr.length / 2);
	const leftArr = uniqueSort(arr.slice(0, mid));
	const rightArr = uniqueSort(arr.slice(mid));

	return merge(leftArr, rightArr);
}

function merge(leftArr, rightArr) {
	const mergeArr = [];
	let lPointer = 0;
	let rPointer = 0;

	while (lPointer < leftArr.length && rPointer < rightArr.length) {
		if (leftArr[lPointer] < rightArr[rPointer]) {
			mergeArr.push(leftArr[lPointer]);
			lPointer++;
		} else if (leftArr[lPointer] > rightArr[rPointer]) {
			mergeArr.push(rightArr[rPointer]);
			rPointer++;
		} else {
			if (mergeArr.at(-1) !== leftArr[lPointer]) {
				mergeArr.push(leftArr[lPointer]);
			}
			lPointer++;
			rPointer++;
		}
	}

	while (lPointer < leftArr.length) {
		if (mergeArr.at(-1) !== leftArr[lPointer]) {
			mergeArr.push(leftArr[lPointer]);
		}
		lPointer++;
	}

	while (rPointer < rightArr.length) {
		if (mergeArr.at(-1) !== rightArr[rPointer]) {
			mergeArr.push(rightArr[rPointer]);
		}
		rPointer++;
	}

	return mergeArr;
}
