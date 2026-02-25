import { EventEmitter } from 'node:events';

class MyEmitter extends EventEmitter {}
enum EventType {
    PHASE_ONE = 'PHASE_ONE',
    STARTUP_ONLY = 'STARTUP_ONLY',
    WEBHOOK = 'WEBHOOK',
}

interface EventBusInterface {
    subscribe<T>(event: EventType, listener: (args: T) => void): void;
    emit<T>(event: EventType, args: T): void;
}

class EventBus implements EventBusInterface {   
    private emitter: MyEmitter;
    constructor(emitter: MyEmitter) {
        this.emitter = emitter;

        this.emitter.on('newListener', (event, listener) => {
            console.log(`Added listener for event: ${event}`);
        });

        this.emitter.on('removeListener', (event, listener) => {
            console.log(`Removed listener for event: ${event}`);
        });

        this.emitter.on('error', console.log);
    }

    once<T>(event: EventType, listener: (args: T) => void) {
        this.emitter.once(event, listener);
    }

    subscribe<T>(event: EventType, listener: (args: T) => void) {
        this.emitter.on(event, listener);
    }

    emit<T>(event: EventType, args: T) {
        this.emitter.emit(event, args);
    }
}

const myEmitter = new EventBus(new MyEmitter({ captureRejections: true }));

myEmitter.once(EventType.STARTUP_ONLY, async (args) => {
    console.log('Received STARTUP_ONLY event with args:', args);    
});

myEmitter.subscribe(EventType.WEBHOOK, async (args) => {
    setTimeout(() => {
        console.log('Processing WEBHOOK event after delay...');
        console.log('Received WEBHOOK event with args:', args);
    }, 5000);    
});

myEmitter.subscribe(EventType.PHASE_ONE, async (args) => {
    console.log('Received PHASE_ONE event with args:', args);
    myEmitter.emit(EventType.STARTUP_ONLY, { message: 'connecting' });
    myEmitter.emit(EventType.WEBHOOK, { message: 'Webhook triggered after PHASE_ONE' });
});






myEmitter.emit<{message: string}>(EventType.PHASE_ONE, { message: "Hello World!" });
myEmitter.emit<{message: string}>(EventType.PHASE_ONE, { message: "The second dance" });
//myEmitter.removeAllListeners('event1')



