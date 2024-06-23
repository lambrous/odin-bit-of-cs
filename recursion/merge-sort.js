function sort(arr) {
	if (arr.length < 2) return arr;

	const mid = Math.floor(arr.length / 2);
	const leftArr = sort(arr.slice(0, mid));
	const rightArr = sort(arr.slice(mid));

	return merge(leftArr, rightArr);
}

function merge(leftArr, rightArr) {
	const totalLength = leftArr.length + rightArr.length;
	let output = [];
	let lPointer = 0;
	let rPointer = 0;

	for (let i = 0; i < totalLength; i++) {
		const lNum = leftArr[lPointer];
		const rNum = rightArr[rPointer];

		if (leftArr.length === lPointer) {
			output = output.concat(rightArr.slice(rPointer));
			break;
		}

		if (rightArr.length === rPointer) {
			output = output.concat(leftArr.slice(lPointer));
			break;
		}

		if (lNum < rNum) {
			output[i] = lNum;
			lPointer++;
			continue;
		}

		output[i] = rNum;
		rPointer++;
	}

	return output;
}

const test1 = sort([3, 2, 1, 13, 8, 5, 0, 1]);
console.log(test1);

const test2 = sort([105, 79, 100, 110]);
console.log(test2);
