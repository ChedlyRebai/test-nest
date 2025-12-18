import { IsDateString, IsNumber, Min } from 'class-validator';

export class CreateEmployeeDto {

  @IsDateString()
  startTime: Date;

  @IsDateString()
  endTime: Date;

  @IsNumber()
  @Min(0)
  hourlyRate: number;
}
