import { HumanIOService } from './service/human-io.service';

new class Main {
	humanService: HumanIOService;

	construtor() {
		this.humanService = HumanIOService.getInstance();
	}
}
