import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PdfGeneratorController } from './common/pdf-generator.controller';
import { GraphQLModule } from '@nestjs/graphql';

describe('AppModule', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should initialize TypeORM module with entities', () => {
    const typeOrmModule = app.get(TypeOrmModule);
    expect(typeOrmModule).toBeDefined();
  });

  it('should contain the PdfGeneratorController', () => {
    const pdfGeneratorController = app.get(PdfGeneratorController);
    expect(pdfGeneratorController).toBeDefined();
  });


  it('should register the GraphQL module', () => {
    const graphQLModule = app.get(GraphQLModule);
    expect(graphQLModule).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
