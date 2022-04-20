import {
  Controller,
  OnModuleInit,
  Inject,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  CreateOrderRequest,
  OrderServiceClient,
  ORDER_SERVICE_NAME,
  CreateOrderResponse,
} from './order.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthGuard } from '../auth/auth.guard';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Controller('order')
export class OrderController implements OnModuleInit {
  private service: OrderServiceClient;

  @Inject(ORDER_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.service =
      this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
  }

  @Post()
  @UseGuards(AuthGuard)
  private async createOrder(
    @Req() req: Request,
  ): Promise<Observable<CreateOrderResponse>> {
    const body: CreateOrderRequest = req.body;

    body.userId = <number>req.user;

    return this.service.createOrder(body);
  }
}
