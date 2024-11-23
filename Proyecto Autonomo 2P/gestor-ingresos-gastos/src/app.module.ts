import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GestionIngresosGastosModule } from './gestion-ingresos-gastos/gestion-ingresos-gastos.module';
import { GastosModule } from './gastos/gastos.module';
import { IngresosModule } from './ingresos/ingresos.module';
import { CategoriasGastoModule } from './categorias-gasto/categorias-gasto.module';
import { FuentesIngresoModule } from './fuentes-ingreso/fuentes-ingreso.module';

@Module({
  imports: [GestionIngresosGastosModule, GastosModule, IngresosModule, CategoriasGastoModule, FuentesIngresoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
