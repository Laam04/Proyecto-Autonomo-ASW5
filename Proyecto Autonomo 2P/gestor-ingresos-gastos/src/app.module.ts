import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriasGastoModule } from './categorias-gasto/categorias-gasto.module';
import { FuentesIngresoModule } from './fuentes-ingreso/fuentes-ingreso.module';
import { GastosModule } from './gastos/gastos.module';
import { IngresosModule } from './ingresos/ingresos.module';
import { CategoriaGasto } from './categorias-gasto/entities/categorias-gasto.entity';
import { FuenteIngreso } from './fuentes-ingreso/entities/fuentes-ingreso.entity';
import { Gastos } from './gastos/entities/gasto.entity';
import { Ingresos } from './ingresos/entities/ingreso.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, 
      username: 'root', 
      password: '', 
      database: 'finanzas_personales',
      entities: [CategoriaGasto, FuenteIngreso, Gastos, Ingresos], 
      synchronize: true,  
      logging: true, 
    }),
    CategoriasGastoModule,
    FuentesIngresoModule,
    GastosModule,
    IngresosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
