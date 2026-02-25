import { Controller, Get, Param } from '@nestjs/common';
import { EventBus, eventBusInstance, EventType } from '../providers/EventBus';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('subscribe')
export class SubscribeController {
  constructor(
    private eventBus: EventBus,
    private eventEmitter: EventEmitter2,
  ) {}
  @Get(':eventType')
  getSubscribe(@Param('eventType') eventType: EventType): string {
    this.eventBus.subscribe<{ message: string }>(eventType, (args) => {
      console.log('Received event:', eventType, args);
    });
    return `subscribed to ${eventType} event`;
  }

  @Get('singleton/:eventType')
  getSubscribeSingleton(@Param('eventType') eventType: EventType): string {
    eventBusInstance.subscribe<{ message: string }>(eventType, (args) => {
      console.log('Received event:', eventType, args);
    });
    return `subscribed to singleton ${eventType} event`;
  }

  @Get('cross/:eventType')
  getSubscribeCross(@Param('eventType') eventType: EventType): string {
    eventBusInstance.subscribe<{ message: string }>(eventType, (args) => {
      this.eventEmitter.emit(`nest1.${eventType}`, {
        message: `Nest event ${eventType} message: ${args.message}`,
      });
    });
    return `subscribed to singleton ${eventType} event`;
  }
}
