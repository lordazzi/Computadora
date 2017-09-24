import { InteractionOutput } from './interaction-output.model';

export class Interaction {
    input: Array<RegExp>;

    outputs: Array<InteractionOutput>;

    single: boolean;

    reponseChance: number;

    continue: boolean;
}