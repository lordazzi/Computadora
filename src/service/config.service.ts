import { InteractionOutput } from './../model/interaction-output.model';
import { ConfigInteractionOutput } from './../model/config/config-interaction-output.model';
import { ConfigInteraction } from './../model/config/config-interaction.model';
import { Interaction } from './../model/interaction.model';
import { Config } from './../model/config/config.model';
import { Soul } from './../model/soul.model';
import { IOServiceInterface } from './io-service.interface';

export class ConfigService {
    private static instance: ConfigService;

    static getInstance(ioService: IOServiceInterface): ConfigService {
        if (!this.instance) {
            this.instance = new ConfigService(ioService);
        }
        return this.instance;
    }

    private constructor(
        private ioService: IOServiceInterface
    ) {

    }

    private readFile(): Soul {
        const data = this.ioService.read('config.json');
        return this.treatData(JSON.parse(data) as Config);
    }

    private treatData(config: Config): Soul {
        const soul = new Soul();
        soul.interaction = new Array<Interaction>();

        config.interaction.forEach((configIteraction: ConfigInteraction) => {
            const interaction = this.treatInteraction(configIteraction);
            if (interaction.input) {
                soul.interaction.push(interaction);
            } else {
                soul.unmatchInteractions.push(interaction);
            }
        });

        return soul;
    }

    private treatInteraction(configIteraction: ConfigInteraction): Interaction {
        const iteraction = new Interaction();

        iteraction.continue = configIteraction.continue;
        iteraction.single = configIteraction.single;

        iteraction.input = new Array<RegExp>();

        if (configIteraction.reponseChance) {
            iteraction.reponseChance = configIteraction.reponseChance;
        }

        iteraction.input = this.treatIteractionInput(configIteraction.input);
        iteraction.outputs = this.treatIteractionOutput(configIteraction.output);

        return iteraction;
    }

    private treatIteractionInput(configIteractionInput: string | Array<string>): Array<RegExp> {
        const matches = new Array<RegExp>();

        if (!configIteractionInput) {
            return matches;
        } else if (typeof configIteractionInput === 'string') {
            matches.push(
                new RegExp(configIteractionInput)
            );
        } else if (configIteractionInput instanceof Array) {
            configIteractionInput.forEach((match) => {
                matches.push(
                    new RegExp(match)
                );
            });
        }

        return matches;
    }

    private treatIteractionOutput(
        configOutput: string | ConfigInteractionOutput | Array<string | ConfigInteractionOutput>
    ): Array<InteractionOutput> {
        let outputs = new Array<InteractionOutput>();
        if (typeof configOutput === 'string') {
            let output = new InteractionOutput();
            output.text = configOutput;
            outputs.push(output);
        } else if (configOutput.constructor === Object) {
            let output = new InteractionOutput();
            configOutput = configOutput as ConfigInteractionOutput;
            if (configOutput.follow) {
                if (configOutput.follow instanceof Array) {
                    output.follow = new Array();
                    configOutput.follow.forEach((configIteraction) => {
                        output.follow.push(
                            this.treatInteraction(configIteraction)
                        );
                    });
                } else if (configOutput.follow.constructor === Object) {
                    output.follow = [
                        this.treatInteraction(configOutput.follow)
                    ];
                }
            }

            outputs.push(output);
        } else if (configOutput instanceof Array) {
            configOutput.forEach((output) => {
                outputs = outputs.concat(this.treatIteractionOutput(output));
            });
        }

        return outputs;
    }
}