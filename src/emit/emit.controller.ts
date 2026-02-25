import { Controller, Get, Param, Query } from '@nestjs/common';
import { eventBusInstance, EventBus, EventType } from '../providers/EventBus';

@Controller('emit')
export class EmitController {
  constructor(private eventBus: EventBus) {}
  @Get(':eventType')
  getEmit(
    @Param('eventType') eventType: EventType,
    @Query('message') message: string,
  ): string {
    eventBusInstance.emit<{ message: string }>(eventType, {
      message: `Singleton message: ${message}`,
    });
    this.eventBus.emit<{ message: string }>(eventType, {
      message: `Injected message: ${message}`,
    });
    return `emitted ${message}`;
  }

  @Get('/singleton/:eventType')
  getEmitSingleton(
    @Param('eventType') eventType: EventType,
    @Query('message') message: string,
  ): string {
    eventBusInstance.emit<{ message: string }>(eventType, {
      message: `Singleton message: ${message}`,
    });
    this.eventBus.emit<{ message: string }>(eventType, {
      message: `Injected message: ${message}`,
    });
    return `emitted ${message}`;
  }
}
