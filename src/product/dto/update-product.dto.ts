import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  name?: string;

  @IsNumber()
  price?: number;

  @IsString()
  description?: string;
}
