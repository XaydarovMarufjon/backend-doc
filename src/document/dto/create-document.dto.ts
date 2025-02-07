import { Type } from 'class-transformer';
import { IsString, IsOptional, IsBoolean, IsNotEmpty, IsDate } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  regNumber: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  regDate: Date;

  @IsOptional()
  @IsString()
  outgoingNumber?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  outgoingDate?: Date;

  @IsOptional()
  @IsString()
  deliveryMethod?: string;

  @IsString()
  @IsNotEmpty()
  correspondent: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dueDate?: Date;

  @IsBoolean()
  access: boolean;

  @IsBoolean()
  control: boolean;
}
