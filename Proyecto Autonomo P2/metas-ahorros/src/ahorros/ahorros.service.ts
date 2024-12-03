import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ahorro } from './entities/ahorro.entity';
import { CreateAhorroInput } from './dto/create-ahorro.input';

@Injectable()
export class AhorrosService {
  constructor(
    @InjectRepository(Ahorro)
    private ahorrosRepository: Repository<Ahorro>,
  ) {}

  create(createAhorroInput: CreateAhorroInput): Promise<Ahorro> {
    const newAhorro = this.ahorrosRepository.create(createAhorroInput);
    return this.ahorrosRepository.save(newAhorro);
  }

  findAll(): Promise<Ahorro[]> {
    return this.ahorrosRepository.find({ relations: ['meta'] });
  }

  findOne(id: number): Promise<Ahorro> {
    return this.ahorrosRepository.findOne({ where: { id }, relations: ['meta'] });
  }

  async remove(id: number): Promise<void> {
    await this.ahorrosRepository.delete(id);
  }
}
