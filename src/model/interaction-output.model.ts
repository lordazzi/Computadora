import { Interaction } from "./interaction.model";

export class InteractionOutput {
    text: string;
    follow: Array<Interaction>;
    timeCondition?: {
        before: number;
        after: number;
    }
}