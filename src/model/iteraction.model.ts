import { IteractionInput } from './iteraction-input.model';
import { IteractionOutput } from './iteraction-output.model';

export class Iteraction {
    input: IteractionInput;

    outputs: Array<IteractionOutput>;

    single: boolean;

    reponseChance: number;

    continue: boolean;
}