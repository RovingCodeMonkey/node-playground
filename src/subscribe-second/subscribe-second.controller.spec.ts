import { Test, TestingModule } from '@nestjs/testing';
import { SubscribeSecondController } from './subscribe-second.controller';

describe('SubscribeSecondController', () => {
  let controller: SubscribeSecondController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscribeSecondController],
    }).compile();

    controller = module.get<SubscribeSecondController>(
      SubscribeSecondController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
