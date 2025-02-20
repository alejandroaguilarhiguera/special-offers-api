import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateProductDto } from './dto/create-product.dto'
import { Product } from './product.model'

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.findAll()
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productModel.findByPk(id)
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`)
    }
    return product
  }

  async create(data: CreateProductDto): Promise<Product> {
    return this.productModel.create(data as any)
  }

  async update(id: number, data: Partial<Product>): Promise<Product> {
    const product = await this.findOne(id)
    return product.update(data)
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id)
    await product.destroy()
  }
}
