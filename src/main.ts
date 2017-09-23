import { MachineSoulService } from './service/machine-soul.service';
import { WebIOService } from './service/web-io.service';
import { ConfigService } from './service/config.service';
import { HumanIOService } from './service/human-io.service';

new class Main {
	humanService: HumanIOService;

	configService: ConfigService;

	machineSoulService: MachineSoulService;

	construtor() {
		this.humanService = HumanIOService.getInstance();
		this.configService = ConfigService.getInstance(
			WebIOService.getInstance()
		);
		this.machineSoulService = MachineSoulService.getInstance(
			this.configService.readFile('knowledge-base.json')
		);

		this.humanService.listen((voiceHeard) => {
			this.machineSoulService
				.iteract(voiceHeard)
				.forEach((response) => {
					this.humanService.speak(response);
				});
		});
	}
}
