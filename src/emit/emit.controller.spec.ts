import { Test, TestingModule } from '@nestjs/testing';
import { EmitController } from './emit.controller';

describe('EmitController', () => {
  let controller: EmitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmitController],
    }).compile();

    controller = module.get<EmitController>(EmitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
