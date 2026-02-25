import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventBus } from './providers/EventBus';
import { SubscribeController } from './subscribe/subscribe.controller';
import { EmitController } from './emit/emit.controller';
import { SubscribeSecondController } from './subscribe-second/subscribe-second.controller';
import { EventEmitterModule } from '@nestjs/event-emitter/dist/event-emitter.module';
import { NestListener } from './listeners/nest.subscriber';
import { NestListener1 } from './listeners/nest.subscriber1';
import { AppIdentifierChild1, AppIdentifier } from './providers/appIdentifier';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: true,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
  ],
  controllers: [
    AppController,
    SubscribeController,
    EmitController,
    SubscribeSecondController,
  ],
  providers: [
    AppService,
    {
      provide: AppIdentifier, // The "Token" other classes will ask for
      useClass: AppIdentifierChild1,
    },
    EventBus,
    NestListener,
    NestListener1,
  ],
})
export class AppModule1 {}
