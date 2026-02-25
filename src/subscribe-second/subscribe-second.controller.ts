import { Controller, Get, Param } from '@nestjs/common';
import { EventBus, EventType } from 'src/providers/EventBus';

@Controller('subscribe-second')
export class SubscribeSecondController {
  constructor(private eventBus: EventBus) {}
  @Get(':eventType')
  getSubscribe(@Param('eventType') eventType: EventType): string {
    this.eventBus.subscribe<{ message: string }>(eventType, (args) => {
      console.log('Received event:', eventType, args);
    });
    return `subscribed to ${eventType} event`;
  }
}
