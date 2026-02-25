import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { eventBusInstance, EventType } from './providers/EventBus';
import { AppModule1 } from './app.module1';

const myEmitter = eventBusInstance;

myEmitter.once(EventType.STARTUP_ONLY, (args) => {
  console.log('STARTUP_ONLY event with args:', args);
});

myEmitter.subscribe(EventType.WEBHOOK, (args) => {
  setTimeout(() => {
    console.log('WEBHOOK - DELAYED ORIGINAL event with args:', args);
  }, 8000);
});

myEmitter.subscribe(EventType.PHASE_ONE, (args) => {
  console.log('PHASE_ONE event with args:', args);
  myEmitter.emit(EventType.STARTUP_ONLY, { message: 'connecting' });
  myEmitter.emit(EventType.WEBHOOK, args);
});

async function bootstrap(port: number) {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
async function bootstrap1(port: number) {
  const app = await NestFactory.create(AppModule1);
  await app.listen(port);
}
bootstrap(3000);
bootstrap1(3001);
