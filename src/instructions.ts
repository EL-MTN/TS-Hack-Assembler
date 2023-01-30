import * as Constants from './constants';

export class INSTRUCTION {
	type: string;

	constructor(type: string) {
		this.type = type;
	}
}

export class L_INSTRUCTION extends INSTRUCTION {
	symbol: string;

	constructor(symbol: string) {
		super('L');
		this.symbol = symbol;
	}
}

export class A_INSTRUCTION extends INSTRUCTION {
	symbol: string;

	constructor(symbol: string) {
		super('A');
		this.symbol = symbol;
	}
}

type Comp = keyof typeof Constants.comp;
type Dest = keyof typeof Constants.dest;
type Jump = keyof typeof Constants.jump;
export class C_INSTRUCTION extends INSTRUCTION {
	dest: Dest;
	comp: Comp;
	jump: Jump;

	constructor(dest: string, comp: string, jump: string) {
		super('C');

		if (comp && !(comp in Constants.comp)) {
			throw new Error('Invalid comp: ' + comp);
		}

		if (!(dest in Constants.dest)) {
			throw new Error('Invalid dest: ' + dest);
		}

		if (jump && !(jump in Constants.jump)) {
			throw new Error('Invalid jump: ' + jump);
		}

		this.dest = <Dest>dest;
		this.comp = <Comp>comp;
		this.jump = <Jump>jump;
	}
}
