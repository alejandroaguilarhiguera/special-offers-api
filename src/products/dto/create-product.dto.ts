import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  description: string

  @IsString()
  @IsOptional()
  currencyName: string

  @IsInt()
  @IsOptional()
  price: number

  @IsInt()
  @IsOptional()
  stock: number
}
