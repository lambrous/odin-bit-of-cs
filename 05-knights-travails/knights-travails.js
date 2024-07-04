class Node {
	#paths = [];
	#parent;

	constructor(data) {
		this.data = data;
	}

	addPath(path) {
		this.#paths.push(path);
	}

	get paths() {
		return this.#paths;
	}

	get parent() {
		return this.#parent;
	}

	set parent(node) {
		this.#parent = node;
	}
}

const board = [];
const boardSize = 8;

for (let row = 0; row < boardSize; row++) {
	board[row] = [];
	for (let col = 0; col < boardSize; col++) {
		board[row][col] = new Node([row, col]);
	}
}

for (const row of board) {
	for (const node of row) addAllPaths(node);
}

function addAllPaths(node) {
	const [row, col] = node.data;
	const moves = [
		[2, -1],
		[2, 1],
		[1, -2],
		[1, 2],
		[-2, -1],
		[-2, 1],
		[-1, -2],
		[-1, 2],
	];

	for (const [rm, cm] of moves) {
		const newRow = row + rm;
		const newCol = col + cm;

		if (
			newRow < boardSize &&
			newRow >= 0 &&
			newCol >= 0 &&
			newCol < boardSize
		) {
			node.addPath(board[newRow][newCol]);
		}
	}
}

function knightMoves([rowStart, colStart], [rowEnd, colEnd]) {
	const nodeStart = board[rowStart][colStart];
	const nodeEnd = board[rowEnd][colEnd];

	if (!nodeStart || !nodeEnd) throw new Error("Invalid arguments");

	let queue = [nodeStart];
	let moves = 0;
	const recentPaths = new Set();

	queueLoop: while (true) {
		const next = [];

		for (const node of queue) {
			if (node === nodeEnd) {
				break queueLoop;
			}

			for (const path of node.paths) {
				if (!recentPaths.has(path)) {
					path.parent = node;
					next.push(path);
				}
			}

			recentPaths.add(node);
		}

		moves++;
		queue = next;
	}

	const shortestPath = [];
	let currentPath = nodeEnd;
	for (let i = 0; i <= moves; i++) {
		shortestPath.unshift(currentPath.data);
		currentPath = currentPath.parent;
	}

	console.log(`You made it in ${moves} moves! Here's your path:`);
	for (const path of shortestPath) console.log(path);

	return shortestPath;
}

knightMoves([3, 3], [4, 3]);
