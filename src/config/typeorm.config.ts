// src/config/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Employee } from 'src/employee/entities/employee.entity';
import { User } from 'src/user/entities/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url:  'mongodb://localhost:27017/atelier-typeorm',
  autoLoadEntities: true,     // charge automatiquement toutes les @Entity
  synchronize: true,          // false en prod
  logging: true,
  entities:[User,Employee]
  // useNewUrlParser et useUnifiedTopology n’existent PLUS → supprimés
};