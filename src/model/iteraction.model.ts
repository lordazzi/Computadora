import { InteractionOutput } from './interaction-output.model';

export class Iteraction {
    input: Array<RegExp>;

    output: InteractionOutput;

    single: boolean;

    reponseChance: number;

    continue: boolean;
}