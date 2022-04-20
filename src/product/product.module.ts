import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_SERVICE_NAME, PRODUCT_PACKAGE_NAME } from './product.pb';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50053',
          package: PRODUCT_PACKAGE_NAME,
          protoPath: 'node_modules/nest_micro_proto/proto/product.proto',
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
