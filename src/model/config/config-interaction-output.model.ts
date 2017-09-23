import { ConfigInteraction } from './config-interaction.model';

export class ConfigInteractionOutput {
    text: string;
    follow: ConfigInteraction | Array<ConfigInteraction>;
    timeCondition: {
        before: number;
        after: number;
    }
}