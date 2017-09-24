declare class webkitSpeechRecognition extends SpeechRecognition { }

/**
 * Execute IO operation with humans, listening and speaking
 */
export class HumanIOService {
    private static instance = new HumanIOService();

    private listening: (speach: string) => void = null;

    private speechRegocnize: SpeechRecognition | webkitSpeechRecognition = null;

    static getInstance(): HumanIOService {
        return this.instance;
    }

    private constructor() {
        if (typeof webkitSpeechRecognition !== 'undefined') {
            this.speechRegocnize = new webkitSpeechRecognition();
        } else if (typeof SpeechRecognition !== 'undefined') {
            this.speechRegocnize = new SpeechRecognition();
        } else {
            throw new Error('Reconhecimento de voz não é suportado em seu browser.');
        }

        this.speechRegocnize.continuous = true;
        this.speechRegocnize.addEventListener('result', (event: SpeechRecognitionEvent) => this.onSpeak(event));
        this.speechRegocnize.addEventListener('error', () => this.onCantHeard());
    }

    private onSpeak(event: SpeechRecognitionEvent) {
        var text = "";
        for (var i = event.resultIndex; i < event.results.length; i++) {
            text += event.results[i][0].transcript;
        }
        try {
            this.listening(text);
        } catch (e) {
            this.onCantHeard();
        }
    }

    private onCantHeard() {
        console.error('Não é possível escutar');
    }

    listen(listening: (speach: string) => void) {
        this.listening = listening;
        this.speechRegocnize.start();
    }

    speak(text: string) {
        speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    }
}