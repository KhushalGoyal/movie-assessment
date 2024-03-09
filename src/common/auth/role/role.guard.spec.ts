import { Reflector } from '@nestjs/core';
import { RoleGuard } from './role.guard';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let reflector: Reflector;
  it('should be defined', () => {
    reflector = new Reflector();
    guard= new RoleGuard(reflector)
    expect(guard).toBeDefined();
  });
});
