import { WebIOService } from './service/web-io.service';
import { ConfigService } from './service/config.service';
import { HumanIOService } from './service/human-io.service';

new class Main {
	humanService: HumanIOService;

	configService: ConfigService;

	construtor() {
		this.humanService = HumanIOService.getInstance();
		this.configService = ConfigService.getInstance(
			WebIOService.getInstance()
		);
	}
}
