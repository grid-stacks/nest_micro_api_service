import {
  Body,
  Controller,
  OnModuleInit,
  Post,
  Put,
  Inject,
} from '@nestjs/common';
import {
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  LoginResponse,
  AUTH_SERVICE_NAME,
  AuthServiceClient,
} from './auth.pb';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

@Controller('auth')
export class AuthController implements OnModuleInit {
  private service: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.service = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }
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
