import { ConfigIteractionOutput } from './../model/config/config-iteraction-output.model';
import { IteractionOutput } from './../model/iteraction-output.model';
import { IteractionInput } from './../model/iteraction-input.model';
import { ConfigIteraction } from './../model/config/config-iteraction.model';
import { Iteraction } from './../model/iteraction.model';
import { Config } from './../model/config/config.model';
import { Soul } from './../model/soul.model';
import { IOServiceInterface } from './io-service.interface';
import { IteractionInputType } from '../model/iteraction-input-type.enum';

export class ConfigService {
    private static instance: ConfigService;

    private ioService: IOServiceInterface;

    static getInstance(ioService: IOServiceInterface): ConfigService {
        if (!this.instance) {
            this.instance = new ConfigService(ioService);
        }
        return this.instance;
    }

    private constructor(ioService: IOServiceInterface) {

    }

    private readFile(): Soul {
        const data = this.ioService.read('config.json');
        return this.treatData(JSON.parse(data) as Config);
    }

    private treatData(config: Config): Soul {
        const soul = new Soul();
        soul.interaction = new Array<Iteraction>();

        config.interaction.forEach((configIteraction: ConfigIteraction) => {
            soul.interaction.push(this.treatInteraction(configIteraction));
        });

        return soul;
    }

    private treatInteraction(configIteraction: ConfigIteraction): Iteraction {
        const iteraction = new Iteraction();

        iteraction.continue = configIteraction.continue;
        iteraction.single = configIteraction.single;

        iteraction.input = new IteractionInput();
        iteraction.input.matches = new Array<RegExp>();
        iteraction.input.type = IteractionInputType.MATCH;

        if (configIteraction.reponseChance) {
            iteraction.reponseChance = configIteraction.reponseChance;
        }

        iteraction.input = this.treatIteractionInput(configIteraction.input);
        iteraction.outputs = this.treatIteractionOutput(configIteraction.output);

        return iteraction;
    }

    private treatIteractionInput(configIteractionInput: string | Array<string>): IteractionInput {
        const input = new IteractionInput();

        if (typeof configIteractionInput === 'string') {
            if (configIteractionInput === 'unmatch') {
                input.type = IteractionInputType.UNMATCH;
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
        configOutput: string | ConfigIteractionOutput | Array<string | ConfigIteractionOutput>
    ): Array<IteractionOutput> {
        let outputs = new Array<IteractionOutput>();
        if (typeof configOutput === 'string') {
            let output = new IteractionOutput();
            output.text = configOutput;
            outputs.push(output);
        } else if (configOutput.constructor === Object) {
            let output = new IteractionOutput();
            configOutput = configOutput as ConfigIteractionOutput;
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