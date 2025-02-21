import { faker } from '@faker-js/faker'
import { SequelizeModule } from '@nestjs/sequelize'
import { Test, TestingModule } from '@nestjs/testing'
import { z } from 'zod'
import { Product } from './product.model'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

// Aquí puedes definir el validador de productos
export const productValidator = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  stock: z.number(),
  currencyName: z.string(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
export const productsValidator = z.array(productValidator)

describe('ProductsController', () => {
  let productsController: ProductsController
  let productsService: ProductsService
  let product: Product

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          username: 'root',
          password: 'password',
          database: 'special_offers',
          port: 5432,
          host: 'localhost',
          dialect: 'postgres',
          autoLoadModels: true,
          synchronize: true,
          dialectOptions: {
            searchPath: 'public',
            prependSearchPath: true,
          },
          quoteIdentifiers: false,
        }),
        SequelizeModule.forFeature([Product]), // Asegúrate de registrar el modelo Product
      ],
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile()

    productsController = app.get<ProductsController>(ProductsController)
    productsService = app.get<ProductsService>(ProductsService)

    product = await Product.create({
      name: faker.commerce.productName(),
      price: Number(faker.number.int({ max: 999 })),
      stock: Number(faker.number.int({ max: 999 })),
      currencyName: faker.finance.currencyCode(),
      description: faker.commerce.productDescription(),
    } as any)
  })

  afterAll(async () => {
    await Product.destroy({ force: true, where: { id: product.id } })
  })

  describe('findAll', () => {
    test('should return products', async () => {
      const [product] = await productsController.findAll()
      const { error, success } = productValidator.safeParse(product.toJSON())
      expect(success).toBe(true)
    })
  })

  describe('get', () => {
    test('should return a product by id', async () => {
      const foundProduct = await Product.findByPk(product.id)
      const { success } = productValidator.safeParse(foundProduct?.toJSON())
      expect(success).toBe(true)
    })
  })

  describe('create', () => {
    let productId: number
    afterEach(async () => {
      productId && (await Product.destroy({ where: { id: productId } }))
    })
    test('should create a new product', async () => {
      const newProductData = {
        name: faker.commerce.productName(),
        price: 150,
        stock: 30,
        currencyName: faker.finance.currencyCode(),
        description: faker.commerce.productDescription(),
      }

      const createdProduct = await productsController.create(newProductData)
      const product = createdProduct.toJSON()
      const { success } = productValidator.safeParse(product)
      expect(success).toBe(true)
      productId = product.id
    })
  })

  describe('update', () => {
    test('should update a product', async () => {
      const updatedData = {
        name: 'Updated Product',
        price: 200,
        stock: 100,
        currencyName: 'USD',
        description: 'Updated Description',
      }
      const { dataValues: updatedProduct } = await productsController.update(
        String(product.id),
        updatedData,
      )
      const { success } = productValidator.safeParse(product.toJSON())
      expect(updatedProduct.name).toBe(updatedData.name)
      expect(updatedProduct.price).toBe(updatedData.price)
      expect(updatedProduct.stock).toBe(updatedData.stock)
      expect(updatedProduct.currencyName).toBe(updatedData.currencyName)
      expect(updatedProduct.description).toBe(updatedData.description)

      expect(success).toBe(true)
    })
  })

  describe('remove', () => {
    let productId: number
    beforeAll(async () => {
      const productInstance = await Product.create({
        name: faker.commerce.productName(),
        price: Number(faker.number.int({ max: 999 })),
        stock: Number(faker.number.int({ max: 999 })),
        currencyName: faker.finance.currencyCode(),
        description: faker.commerce.productDescription(),
      } as any)
      productId = productInstance.id
    })
    afterAll(async () => {
      productId &&
        (await Product.destroy({ force: true, where: { id: productId } }))
    })
    test('should remove a product', async () => {
      await productsController.remove(String(productId))
      try {
        await productsController.findOne(String(productId))
      } catch (error) {
        expect(error.response.statusCode).toBe(404)
      }
    })
  })
})
