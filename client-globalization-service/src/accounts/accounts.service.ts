import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { CreateAccountInput } from './dto/create-account.input';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
  ) {}

  create(createAccountInput: CreateAccountInput): Promise<Account> {
    const { email, password } = createAccountInput;
    const newAccount = this.accountsRepository.create({ email, password });

    return this.accountsRepository.save(newAccount);
  }


  findAll(): Promise<Account[]> {
    return this.accountsRepository.find();
  }

  findOne(id: number): Promise<Account> {
    return this.accountsRepository.findOne({ where: { id } });
  }
  async findOneByEmail(email: string): Promise<Account> {
    return this.accountsRepository.findOne({ where: { email } });
  }
}
