import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { MetasModule } from './metas/metas.module';
import { AhorrosModule } from './ahorros/ahorros.module';
import { HistorialMetasModule } from './historial/historial.module';
import { HistorialMetaController } from './historial/historial.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'metas_ahorros',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
    MetasModule,
    AhorrosModule,
    HistorialMetasModule,
  ],
})
export class AppModule {}
