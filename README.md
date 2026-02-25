<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

Tinkering with NEST and EventEmitter.

Two NEST APIs starting up, using controllers to subscribe/emit and observing the difference between

- injected EventEmitter which is a singleton, but only within one API
- Imported Global Singleton which emits no matter which API calls, acting as a global messaging service.
- Nest baked in EventEmitters

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## TO TEST/Tinker

Available eventTypes PHASE_ONE | WEBHOOK | STARTUP_ONLY

Start server

```bash
#observe the attached default subscriptions on the global singleton
curl http://localhost:3000/emit/PHASE_ONE?message=yourmessage

#other API
curl http://localhost:3001/emit/PHASE_ONE?message=yourothermessage

#Tinker with adding subscriptions
#only to the injected emitter
curl http://localhost:3000/subscribe/PHASE_ONE
curl http://localhost:3000/subscribe/WEBHOOK

#show that the injected emitter is a singleton within an individual API
curl http://localhost:3000/subscribe-second/PHASE_ONE

#Add an event to the global singleton, now either emitter will emit it
curl http://localhost:3000/subscribe/singleton/PHASE_ONE

#See the results
#trigger emit an all
curl http://localhost:3000/emit/PHASE_ONE?message=message
#global singleton
curl http://localhost:3000/emit/singleton/PHASE_ONE?message=message
#instance singleton
curl http://localhost:3000/emit/instance/PHASE_ONE?message=message
#nest singleton
curl http://localhost:3000/emit/nest/PHASE_ONE?message=message
```

## Stay in touch

- Author - Anthony Roberts
- X - [@RovingCodeMnkey](https://x.com/RovingCodeMnkey)
