export class SymbolTable {
	symbols: Map<string, number>;
	customSymbols = 0;

	constructor() {
		this.symbols = new Map();
	}

	addEntry(name: string, address?: number) {
		this.symbols.set(
			name,
			address === undefined ? this.customSymbols + 1024 : address
		);

		if (address === undefined) {
			this.customSymbols++;
		}
	}

	contains(name: string) {
		return this.symbols.has(name);
	}

	getAddress(name: string) {
		return this.symbols.get(name) || 0;
	}
}
