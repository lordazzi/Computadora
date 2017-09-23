import { ConfigInteractionOutput } from './config-interaction-output.model';

export class ConfigInteraction {
    input: string | Array<string>;

    output: string | ConfigInteractionOutput | Array<string | ConfigInteractionOutput>;

    single: boolean;

    reponseChance: number;

    continue: boolean;
}