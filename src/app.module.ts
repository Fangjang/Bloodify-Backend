import { Module } from '@nestjs/common';
import { AuthModule } from './Auth/Auth.module';
import { MainService } from './Main/Main.service';
import { MainModule } from './Main/Main.module';
import { AdminModule } from './Admin/Admin.module';

@Module({
  imports: [AuthModule, MainModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
