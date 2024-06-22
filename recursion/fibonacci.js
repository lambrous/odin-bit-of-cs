// 1.
function fibs(n) {
	const sequence = [0, 1];
	for (let i = 2; i < n; i++) {
		sequence[i] = sequence[i - 1] + sequence[i - 2];
	}
	return sequence.slice(0, n);
}
console.log(fibs(8));

// 2.
function fibsRec(n) {
	if (n <= 1) return [0];
	if (n === 2) return [0, 1];

	const sequence = fibsRec(n - 1);
	const fib = sequence[sequence.length - 1] + sequence[sequence.length - 2];

	return [...sequence, fib];
}
console.log(fibsRec(8));

// 3.
console.log(fibs(10));
console.log(fibsRec(10));
