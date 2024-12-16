import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { GraphQLModule } from '@nestjs/graphql';
import { INestApplication } from '@nestjs/common';

describe('AppModule', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule, 
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should initialize GraphQL gateway with subgraphs', async () => {
    const graphQLModule = app.get(GraphQLModule);
    expect(graphQLModule).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
