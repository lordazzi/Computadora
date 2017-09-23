import { Interaction } from './../model/interaction.model';
import { Soul } from '../model/soul.model';

export class MachineSoulService {
    private static instance: MachineSoulService;

    static getInstance(soul: Soul): MachineSoulService {
        if (!this.instance) {
            this.instance = new MachineSoulService(soul);
        }
        return this.instance;
    }

    private constructor(
        private soul: Soul
    ) {

    }

    iteract(speak: string) {
        const response = this.getInteractionResponse(speak);
        // response.outputs
    }

    private getInteractionResponse(speak: string): Array<Interaction> {
        let interactionMatch = new Array<Interaction>();

        this.soul.interaction.forEach((interaction) => {
            let isMatch = false;

            interaction.input.forEach((rule) => {
                if (rule.test(speak)) {
                    isMatch = true;
                }
            });

            if (isMatch) {
                if (interaction.reponseChance != null && Math.random() < interaction.reponseChance) {
                    isMatch = false;
                }
            }

            if (isMatch) {
                interactionMatch.push(interaction);

                if (!interaction.continue) {
                    return false;
                }
            }
        });

        if (!interactionMatch) {
            const unmatch = this.soul.unmatchInteraction;
            if (unmatch.reponseChance != null && Math.random() > unmatch.reponseChance) {
                interactionMatch.push(this.soul.unmatchInteraction);
            }
        }

        return interactionMatch;
    }
}