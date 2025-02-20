import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { Product } from './product.model'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(Number(id))
  }

  @Post()
  create(@Body() data: CreateProductDto): Promise<Product> {
    return this.productsService.create(data)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Product>,
  ): Promise<Product> {
    return this.productsService.update(Number(id), data)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.productsService.remove(Number(id))
    return {
      message: 'The product was deleted',
    }
  }
}
