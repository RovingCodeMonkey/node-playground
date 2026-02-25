import { Controller, Get, Param } from '@nestjs/common';
import { EventBus, eventBusInstance, EventType } from '../providers/EventBus';

@Controller('subscribe')
export class SubscribeController {
  constructor(private eventBus: EventBus) {}
  @Get(':eventType')
  getSubscribe(@Param('eventType') eventType: EventType): string {
    this.eventBus.subscribe<{ message: string }>(eventType, (args) => {
      console.log('Received event:', eventType, args);
    });
    return `subscribed to ${eventType} event`;
  }

  @Get('singleton/:eventType')
  getSubscribeSingleton(@Param('eventType') eventType: EventType): string {
    console.log(`Subscribing to ${eventType} event...`);
    eventBusInstance.subscribe<{ message: string }>(eventType, (args) => {
      console.log('Received event:', eventType, args);
    });
    return `subscribed to singleton ${eventType} event`;
  }
}
