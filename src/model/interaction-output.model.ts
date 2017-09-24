import { Interaction } from "./interaction.model";

export class InteractionOutput {
    text: string;
    follow: Array<Interaction>;
    reponseChance: number;
    timeCondition?: {
        before: number;
        after: number;
    }
}