import { Controller, Get, Param, Query } from '@nestjs/common';
import { eventBusInstance, EventBus, EventType } from '../providers/EventBus';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AppIdentifier } from 'src/providers/appIdentifier';

@Controller('emit')
export class EmitController {
  constructor(
    private eventBus: EventBus,
    private eventEmitter: EventEmitter2,
    private app: AppIdentifier,
  ) {}
  @Get(':eventType')
  getEmit(
    @Param('eventType') eventType: EventType,
    @Query('message') message: string,
  ): string {
    eventBusInstance.emit<{ message: string }>(eventType, {
      message: `${this.app.getID()},Singleton message: ${message}`,
    });
    this.eventBus.emit<{ message: string }>(eventType, {
      message: `${this.app.getID()},Injected message: ${message}`,
    });
    this.eventEmitter.emit(`nest.${eventType}`, {
      message: `${this.app.getID()} Nest event ${eventType} message: ${message}`,
    });
    return `emitted ${message}`;
  }

  @Get('/injected/:eventType')
  getEmitInjected(
    @Param('eventType') eventType: EventType,
    @Query('message') message: string,
  ): string {
    this.eventBus.emit<{ message: string }>(eventType, {
      message: `${this.app.getID()} Injected message: ${message}`,
    });
    return `emitted ${message}`;
  }

  @Get('/singleton/:eventType')
  getEmitSingleton(
    @Param('eventType') eventType: EventType,
    @Query('message') message: string,
  ): string {
    eventBusInstance.emit<{ message: string }>(eventType, {
      message: `${this.app.getID()} Singleton message: ${message}`,
    });

    return `emitted ${message}`;
  }

  @Get('nest/:eventType')
  getEmitNest(
    @Param('eventType') eventType: EventType,
    @Query('message') message: string,
  ): string {
    console.log(`Emitting Nest event ${eventType} with message: ${message}`);
    this.eventEmitter.emit(`nest.${eventType}`, {
      message: `Nest event ${eventType} message: ${message}`,
    });
    return `emitted ${message}`;
  }
}
