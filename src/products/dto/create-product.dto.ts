import { IsInt, IsNotEmpty, IsString } from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsInt()
  price: number

  @IsInt()
  stock: number
}
