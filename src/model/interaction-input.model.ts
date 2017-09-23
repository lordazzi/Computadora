import { InteractionInputType } from "./interaction-input-type.enum";

export class InteractionInput {
    type: InteractionInputType;

    matches: Array<RegExp>;
}