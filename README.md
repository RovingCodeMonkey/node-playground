<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

Tinkering with NEST and EventEmitter.

Two NEST APIs starting up, using controllers to subscribe/emit and observing the difference between the injected EventEmitter which is a singleton, but only within one API and the item instantiated and imported as a singleton which emits no matter which API calls, acting as a global messaging service.

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
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
