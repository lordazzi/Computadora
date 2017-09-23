import { ConfigIteractionOutput } from './config-iteraction-output.model';

export class ConfigIteraction {
    input: string | Array<string>;

    output: string | ConfigIteractionOutput | Array<string | ConfigIteractionOutput>;

    single: boolean;

    reponseChance: number;

    continue: boolean;
}