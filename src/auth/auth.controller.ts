import { Body, Controller, Post, Put } from '@nestjs/common';
import {
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  LoginResponse,
} from './auth.pb';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('register')
  private async register(
    @Body() body: RegisterRequest,
  ): Promise<Observable<RegisterResponse>> {
    return this.service.register(body);
  }

  @Put('login')
  private async login(
    @Body() body: LoginRequest,
  ): Promise<Observable<LoginResponse>> {
    return this.service.login(body);
  }
}
