import { comp, dest, jump } from './constants';
import {
	A_INSTRUCTION,
	C_INSTRUCTION,
	INSTRUCTION,
	L_INSTRUCTION,
} from './instructions';
import { SymbolTable } from './symbol';

const table = new SymbolTable();

export function translate(instructions: INSTRUCTION[]) {
	table.addEntry('SP', 0);
	table.addEntry('LCL', 1);
	table.addEntry('ARG', 2);
	table.addEntry('THIS', 3);
	table.addEntry('THAT', 4);
	table.addEntry('SCREEN', 16384);
	table.addEntry('KBD', 24576);

	ScanLInstructions(instructions);

	return instructions.map(translateInstruction).filter((x) => {
		return x != '';
	});
}

function translateInstruction(instruction: INSTRUCTION) {
	if (instruction instanceof C_INSTRUCTION) {
		return translateCInstruction(instruction);
	} else if (instruction instanceof A_INSTRUCTION) {
		return translateAInstruction(instruction);
	} else return '';
}

function translateCInstruction(instruction: C_INSTRUCTION) {
	let bytecode = '111';

	if (instruction.jump) {
		bytecode += comp[instruction.comp!];
		bytecode += dest[instruction.dest];
		bytecode += jump[instruction.jump];
	} else {
		bytecode += comp[instruction.comp!];
		bytecode += dest[instruction.dest];
		bytecode += '000';
	}

	return bytecode;
}

function translateAInstruction(instruction: A_INSTRUCTION) {
	let bytecode = '0';

	const symbol = instruction.symbol;

	if (symbol.match(/^[0-9]+$/)) {
		bytecode += parseInt(symbol).toString(2).padStart(15, '0');
	} else {
		if (!table.contains(symbol)) {
			table.addEntry(symbol);
		}

		bytecode += table.getAddress(symbol).toString(2).padStart(15, '0');
	}

	return bytecode;
}

function ScanLInstructions(instructions: INSTRUCTION[]) {
	let count = 0;

	for (const instruction of instructions) {
		if (instruction instanceof L_INSTRUCTION) {
			table.addEntry(instruction.symbol, count);
		} else {
			count++;
		}
	}

	return count;
}
