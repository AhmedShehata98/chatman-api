import { Test, TestingModule } from '@nestjs/testing';
import { ChatmanGateway } from './chatman.gateway';

describe('ChatmanGateway', () => {
  let gateway: ChatmanGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatmanGateway],
    }).compile();

    gateway = module.get<ChatmanGateway>(ChatmanGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
