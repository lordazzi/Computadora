import { Iteraction } from './iteraction.model';

export class InteractionOutput {
    text: string;
    follow: Iteraction | Array<Iteraction>;
    timeCondition: {
        before: number;
        after: number;
    }
}