import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { CreateEmployeeDto } from './create-employee.dto';
import { UpdateEmployeeDto } from './update-employee.dto';
import { Employee } from './entities/employee.entity';
@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: MongoRepository<Employee>,
  ) {}

  async create(dto: CreateEmployeeDto): Promise<Employee> {
    if (new Date(dto.startTime) >= new Date(dto.endTime)) {
      throw new BadRequestException('start must  before endTime');
    }

    const employee = this.employeeRepository.create(dto);
    return this.employeeRepository.save(employee);
  }

  async findById(_id: string): Promise<Employee> {
    const objet = new ObjectId(_id);
    const employee = await this.employeeRepository.findOne({ where: { _id: objet } });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return employee;
  }
  

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async update(id: string, dto: UpdateEmployeeDto): Promise<Employee> {
    if (dto.startTime && dto.endTime) {
      if (new Date(dto.startTime) >= new Date(dto.endTime)) {
        throw new BadRequestException('startTime must be before endTime');
      }
    }

    await this.employeeRepository.updateOne(
      { _id: new ObjectId(id) },
      { $set: dto as any },
    );
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.employeeRepository.deleteOne({ _id: new ObjectId(id) });
  }

  calculateWorkedHours(employee: Employee): number {
    const diff = employee.endTime.getTime() - employee.startTime.getTime();
    return diff / (1000 * 60 * 60); 
  }

  
  calculateSalary(employee: Employee): number {
    return this.calculateWorkedHours(employee) * Number(employee.hourlyRate);
  }

  
  calculateTax(employee: Employee): number {
    return this.calculateSalary(employee) * 0.09;
  }
}
