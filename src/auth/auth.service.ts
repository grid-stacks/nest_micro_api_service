import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import {
  AuthServiceClient,
  AUTH_SERVICE_NAME,
  ValidateResponse,
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
} from './auth.pb';

@Injectable()
export class AuthService implements OnModuleInit {
  private service: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.service = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  public async validate(token: string): Promise<ValidateResponse> {
    return firstValueFrom(this.service.validate({ token }));
  }

  public async register(
    body: RegisterRequest,
  ): Promise<Observable<RegisterResponse>> {
    return this.service.register(body);
  }

  public async login(body: LoginRequest): Promise<Observable<LoginResponse>> {
    return this.service.login(body);
  }
}
