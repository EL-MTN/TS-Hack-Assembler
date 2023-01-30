import { readFileSync, writeFileSync } from 'fs';
import { parseInstructions } from './parser';
import { translate } from './translator';

if (!process.argv[2]) {
	throw new Error('No file specified');
}

const contents = readFileSync(process.argv[2], 'utf-8');

const instructions = parseInstructions(contents);

const hack = translate(instructions);

writeFileSync(process.argv[3] || './out.hack', hack.join('\r\n'), 'utf-8');
