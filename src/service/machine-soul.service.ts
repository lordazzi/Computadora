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
        this.soul.interaction.forEach((iteraction) => {
            
        });
    }
}