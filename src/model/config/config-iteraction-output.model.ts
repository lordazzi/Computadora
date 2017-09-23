import { ConfigIteraction } from "./config-iteraction.model";

export class ConfigIteractionOutput {
    text: string;
    follow: ConfigIteraction | Array<ConfigIteraction>;
    timeCondition: {
        before: number;
        after: number;
    }
}