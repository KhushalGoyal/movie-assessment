import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentVariables } from 'src/config/configuration';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let jwtService: JwtService;
  let configService: ConfigService<EnvironmentVariables>;
  let authGuard: AuthGuard;
  it('should be defined', () => {
    authGuard = new AuthGuard(jwtService, configService);
    expect(authGuard).toBeDefined();
  });
});
