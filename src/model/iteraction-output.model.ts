import { Iteraction } from './iteraction.model';

export class IteractionOutput {
    text: string;
    follow: Array<Iteraction>;
    timeCondition?: {
        before: number;
        after: number;
    }
}