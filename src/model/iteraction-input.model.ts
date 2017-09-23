import { IteractionInputType } from "./iteraction-input-type.enum";

export class IteractionInput {
    type: IteractionInputType;

    matches: Array<RegExp>;
}