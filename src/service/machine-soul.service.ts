import { InteractionOutput } from './../model/interaction-output.model';
import { Interaction } from './../model/interaction.model';
import { Soul } from '../model/soul.model';

export class MachineSoulService {
    private static instance: MachineSoulService;

    private subjectMatter: Array<Interaction> = null;

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

    iteract(heard: string): Array<string> {
        const speak = new Array<string>();
        const speakOutput = this.chooseOutputs(
            this.getInteractionResponse(heard)
        );

        speakOutput.forEach((output) => {
            speak.push(output.text);
        });

        return speak;
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
            if (this.checkIfChoose(unmatch)) {
                interactionMatch.push(this.soul.unmatchInteraction);
            }
        }

        return interactionMatch;
    }

    private chooseOutputs(interactionMatches: Array<Interaction>) {
        const outputs = new Array<InteractionOutput>();

        interactionMatches.forEach((interaction) => {
            interaction.outputs.forEach((output) => {
                if (this.checkIfChoose(output)) {
                    outputs.push(output);
                }
            });
        });

        return outputs;
    }

    private checkIfChoose(anyAction: { reponseChance: number }) {
        return anyAction.reponseChance != null && Math.random() > anyAction.reponseChance ? true : false;
    }
}