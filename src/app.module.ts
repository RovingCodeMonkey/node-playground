import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventBus } from './providers/EventBus';
import { SubscribeController } from './subscribe/subscribe.controller';
import { EmitController } from './emit/emit.controller';
import { SubscribeSecondController } from './subscribe-second/subscribe-second.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    SubscribeController,
    EmitController,
    SubscribeSecondController,
  ],
  providers: [AppService, EventBus],
})
export class AppModule {}
