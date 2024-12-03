import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module'; 
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AccountsModule } from './accounts/accounts.module';
import { ProfilesModule } from './profiles/profiles.module';
import { CurrenciesModule } from './currencies/currencies.module';

describe('AppModule', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], 
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init(); 
  });

  it('should be defined', () => {
    expect(app).toBeDefined(); 
  });

  it('should contain the TypeOrmModule', async () => {
    const typeOrmModule = app.get(TypeOrmModule); 
    expect(typeOrmModule).toBeDefined();
  });

  it('should contain the GraphQLModule', async () => {
    const graphQLModule = app.get(GraphQLModule); 
    expect(graphQLModule).toBeDefined();
  });

  it('should contain AccountsModule', async () => {
    const accountsModule = app.get(AccountsModule); 
    expect(accountsModule).toBeDefined();
  });

  it('should contain ProfilesModule', async () => {
    const profilesModule = app.get(ProfilesModule); 
    expect(profilesModule).toBeDefined();
  });

  it('should contain CurrenciesModule', async () => {
    const currenciesModule = app.get(CurrenciesModule);
    expect(currenciesModule).toBeDefined();
  });


  afterAll(async () => {
    await app.close();
  });
});
