import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProductsModule } from './products/product.module'

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost', // Cambia según tu configuración
      port: 5432, // Puerto por defecto de PostgreSQL
      username: 'root',
      password: 'password',
      database: 'special_offers',
      autoLoadModels: true,
      synchronize: true, // Solo para desarrollo, en producción usa migraciones
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
