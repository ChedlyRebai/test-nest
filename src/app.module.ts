import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { ChatmoduleModule } from './chatmodule/chatmodule.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EmployeeModule } from './employee/employee.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    EmployeeModule,
    ChatmoduleModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
})
export class AppModule {}
