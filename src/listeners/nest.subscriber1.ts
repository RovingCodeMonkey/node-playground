import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter/dist/decorators/on-event.decorator';
import { AppIdentifier } from 'src/providers/appIdentifier';

@Injectable()
export class NestListener1 {
  constructor(private appIdentifierChild: AppIdentifier) {}
  @OnEvent('nest1.*')
  handleAll(payload: { message: string }) {
    // The payload matches what was emitted
    console.log(
      this.appIdentifierChild.getID(),
      'Nest CROSS event received:',
      payload,
    );
    // ... business logic to handle the event, e.g., send a confirmation email ...
  }
}
