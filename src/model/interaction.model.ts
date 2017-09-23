import { InteractionOutput } from './interaction-output.model';
import { InteractionInput } from './interaction-input.model';

export class Interaction {
    input: InteractionInput;

    outputs: Array<InteractionOutput>;

    single: boolean;

    reponseChance: number;

    continue: boolean;
}