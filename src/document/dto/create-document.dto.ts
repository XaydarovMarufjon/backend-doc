import { IsString, IsDateString, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  regNumber: string;

  @IsDateString()
  @IsNotEmpty()
  regDate: Date;

  @IsOptional()
  @IsString()
  outgoingNumber?: string;

  @IsOptional()
  @IsDateString()
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
  @IsDateString()
  dueDate?: Date;

  @IsBoolean()
  access: boolean;

  @IsBoolean()
  control: boolean;
}
