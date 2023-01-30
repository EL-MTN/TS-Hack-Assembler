import { A_INSTRUCTION, C_INSTRUCTION, L_INSTRUCTION } from './instructions';

export function parseInstructions(text: string) {
	text.replace('\r', '');
	let lines = text.split('\n');

	lines = lines.map(removeComments);
	lines = lines.filter(removeEmpty);

	const instructions = lines.map(identifyInstruction);

	return instructions;
}

function removeComments(line: string) {
	return line.split('//')[0].trim();
}

function removeEmpty(line: string) {
	return line.trim() !== '';
}

function identifyInstruction(line: string) {
	if (line.startsWith('@')) {
		return new A_INSTRUCTION(line.slice(1));
	} else if (line.startsWith('(')) {
		return new L_INSTRUCTION(line.slice(1, -1));
	} else {
		let [dest, compJump] = line.split('=');

		if (!compJump) {
			dest = 'null';
			compJump = line;
		}

		let [comp, jump] = compJump.split(';');

		if (!jump) {
			jump = 'null';
		}

		return new C_INSTRUCTION(dest, comp, jump);
	}
}
