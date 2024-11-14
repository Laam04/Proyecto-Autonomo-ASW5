import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestamosModule } from './prestamos/prestamos.module';
import { PagosModule } from './pagos/pagos.module';
import { DeudasModule } from './deudas/deudas.module';
import { Prestamo } from './prestamos/entities/prestamo.entity';
import { Pago } from './pagos/entities/pago.entity';
import { Deuda } from './deudas/entities/deuda.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver } from '@nestjs/apollo';

describe('AppModule', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '',
          database: 'prestamos_deudas',
          autoLoadEntities: true,
          synchronize: true, 
        }),

        GraphQLModule.forRoot({
          driver: ApolloFederationDriver,
          autoSchemaFile: true,
        }),

        PrestamosModule,
        PagosModule,
        DeudasModule,

        TypeOrmModule.forFeature([Prestamo, Pago, Deuda]),
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should initialize TypeORM module with entities', () => {
    const typeOrmModule = app.get(TypeOrmModule);
    expect(typeOrmModule).toBeDefined();
  });

  it('should contain PrestamosModule, PagosModule, and DeudasModule', () => {
    const prestamosModule = app.get(PrestamosModule);
    const pagosModule = app.get(PagosModule);
    const deudasModule = app.get(DeudasModule);

    expect(prestamosModule).toBeDefined();
    expect(pagosModule).toBeDefined();
    expect(deudasModule).toBeDefined();
  });

  it('should register the GraphQL module', () => {
    const graphQLModule = app.get(GraphQLModule);
    expect(graphQLModule).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
