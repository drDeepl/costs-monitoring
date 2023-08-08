import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CostsModule } from './costs/costs.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CostsModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
      cache: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
