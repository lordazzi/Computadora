import { IOServiceInterface } from './io-service.interface';

export class WebIOService implements IOServiceInterface {

    private static instance = new WebIOService();

    static getInstance(): WebIOService {
        return this.instance;
    }

    private constructor() {

    }

    read(file: string): string {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', file+'?_='+(new Date).getTime(), false);
        xhr.send(null);
        return xhr.responseText;
    }
}