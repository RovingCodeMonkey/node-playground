import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter/dist/decorators/on-event.decorator';
import { AppIdentifier } from 'src/providers/appIdentifier';

@Injectable()
export class NestListener {
  constructor(private appIdentifierChild: AppIdentifier) {}
  @OnEvent('nest.PHASE_ONE')
  handlePhaseOne(payload: { message: string }) {
    // The payload matches what was emitted
    console.log(
      this.appIdentifierChild.getID(),

      'Nest PHASE_ONE event received:',
      payload,
    );
    // ... business logic to handle the event, e.g., send a confirmation email ...
  }

  @OnEvent('nest.WEBHOOK')
  handleWebhook(payload: { message: string }) {
    // The payload matches what was emitted
    console.log(
      this.appIdentifierChild.getID(),
      'Nest WEBHOOK event received:',
      payload,
    );
    // ... business logic to handle the event, e.g., send a confirmation email ...
  }

  @OnEvent('nest.*')
  handleAll(payload: { message: string }) {
    // The payload matches what was emitted
    console.log(
      this.appIdentifierChild.getID(),
      'Nest ALL event received:',
      payload,
    );
    // ... business logic to handle the event, e.g., send a confirmation email ...
  }
}
