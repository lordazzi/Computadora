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
        let subjectMatter;
        
        if (this.subjectMatter) {
            subjectMatter = this.soul.interaction.concat(this.subjectMatter);
        } else {
            subjectMatter = this.soul.interaction;
        }

        subjectMatter.forEach((interaction) => {
            let isMatch = false;

            interaction.input.forEach((rule) => {
                if (rule.test(speak)) {
                    isMatch = true;
                }
            });

            // if (isMatch) { a lógica está errada aqui
            //     if (!this.checkIfChoose(interaction)) {
            //         isMatch = false;
            //     }
            // }

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
        this.subjectMatter = null;

        interactionMatches.forEach((interaction) => {
            interaction.outputs.forEach((output) => {
                if (this.checkIfChoose(output)) {
                    outputs.push(output);
                    if (output.follow) {
                        this.subjectMatter = output.follow;
                    }
                }
            });
        });

        return outputs;
    }

    private checkIfChoose(anyAction: { reponseChance: number }) {
        if (anyAction.reponseChance == null) {
            return true;
        }

        return Math.random() > anyAction.reponseChance ? true : false;
    }
}