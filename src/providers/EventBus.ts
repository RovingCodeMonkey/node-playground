import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'node:events';

export enum EventType {
  PHASE_ONE = 'PHASE_ONE',
  STARTUP_ONLY = 'STARTUP_ONLY',
  WEBHOOK = 'WEBHOOK',
}

export interface EventBusInterface {
  subscribe<T>(event: EventType, listener: (args: T) => void): void;
  emit<T>(event: EventType, args: T): void;
}

@Injectable()
export class EventBus implements EventBusInterface {
  private emitter: EventEmitter;
  constructor() {
    this.emitter = new EventEmitter({ captureRejections: true });

    this.emitter.on('newListener', (event) => {
      console.log(`Added listener for event: ${event}`);
    });

    this.emitter.on('removeListener', (event) => {
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

export const eventBusInstance = new EventBus();
