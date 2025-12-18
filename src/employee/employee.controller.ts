import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './create-employee.dto';
import { UpdateEmployeeDto } from './update-employee.dto';


@Controller('employee')
export class EmployeeController {

    constructor(private service :EmployeeService){}

    
  @Post()
  create(@Body() dto: CreateEmployeeDto) {
    return this.service.create(dto);  }

  
  @Get(':id')
  findById(@Param('id') id: string) {return this.service.findById(id);
  }

  
  @Get()
  findAll() {
    return this.service.findAll();
  }

  
 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete(id);
  }

  
  @Get(':id/summary')
  async summary(@Param('id') id: string) {
    const emp = await this.service.findById(id);

    const wd = this.service.calculateWorkedHours(emp);
    const salary = this.service.calculateSalary(emp);
    const tax = this.service.calculateTax(emp);
    return {
      wd,
      salary,
      tax,
      netSalary: salary - tax,
    };
  }

}




