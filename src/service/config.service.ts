import { InteractionOutput } from './../model/interaction-output.model';
import { ConfigInteractionOutput } from './../model/config/config-interaction-output.model';
import { InteractionInput } from './../model/interaction-input.model';
import { ConfigInteraction } from './../model/config/config-interaction.model';
import { Interaction } from './../model/interaction.model';
import { Config } from './../model/config/config.model';
import { Soul } from './../model/soul.model';
import { IOServiceInterface } from './io-service.interface';
import { InteractionInputType } from '../model/interaction-input-type.enum';

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
            soul.interaction.push(this.treatInteraction(configIteraction));
        });

        return soul;
    }

    private treatInteraction(configIteraction: ConfigInteraction): Interaction {
        const iteraction = new Interaction();

        iteraction.continue = configIteraction.continue;
        iteraction.single = configIteraction.single;

        iteraction.input = new InteractionInput();
        iteraction.input.matches = new Array<RegExp>();
        iteraction.input.type = InteractionInputType.MATCH;

        if (configIteraction.reponseChance) {
            iteraction.reponseChance = configIteraction.reponseChance;
        }

        iteraction.input = this.treatIteractionInput(configIteraction.input);
        iteraction.outputs = this.treatIteractionOutput(configIteraction.output);

        return iteraction;
    }

    private treatIteractionInput(configIteractionInput: string | Array<string>): InteractionInput {
        const input = new InteractionInput();

        if (typeof configIteractionInput === 'string') {
            if (configIteractionInput === 'unmatch') {
                input.type = InteractionInputType.UNMATCH;
            } else {
                input.matches.push(
                    new RegExp(configIteractionInput)
                );
            }
        } else if (configIteractionInput instanceof Array) {
            configIteractionInput.forEach((match) => {
                input.matches.push(
                    new RegExp(match)
                );
            });
        }

        return input;
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