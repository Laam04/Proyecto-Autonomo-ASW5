import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingreso } from './ingresos/entities/ingreso.entity';
import { Gasto } from './gastos/entities/gasto.entity';
import { FuenteIngreso } from './fuente-ingresos/entities/fuente-ingreso.entity';
import { CategoriaGasto } from './categoria-gastos/entities/categoria-gasto.entity';
import { IngresoModule } from './ingresos/ingresos.module';
import { GastoModule } from './gastos/gastos.module';
import { CategoriaGastoModule } from './categoria-gastos/categoria-gastos.module';
import { FuenteIngresoModule } from './fuente-ingresos/fuente-ingresos.module';
import { PdfGeneratorController } from './common/pdf-generator.controller';
import { PdfGeneratorModule } from './common/pdf-generator.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { GraphGeneratorModule } from './common/graph-generator.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', 
      database: 'gastos_ingresos', 
      entities: [Ingreso, Gasto, FuenteIngreso, CategoriaGasto],
      synchronize: true, 
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
    }),

    TypeOrmModule.forFeature(),
    IngresoModule,
    GastoModule,
    CategoriaGastoModule,
    FuenteIngresoModule,
    PdfGeneratorModule,
    GraphGeneratorModule,
    
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'graphic'),
      serveRoot: '/graphic',
    }),
  ],
  controllers: [PdfGeneratorController],
})
export class AppModule {}
