import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meta } from './entities/meta.entity';
import { CreateMetaInput } from './dto/create-meta.input';
import { UpdateMetaInput } from './dto/update-meta.input';

@Injectable()
export class MetasService {
  constructor(
    @InjectRepository(Meta)
    private metasRepository: Repository<Meta>,
  ) {}

  create(createMetaInput: CreateMetaInput): Promise<Meta> {
    const newMeta = this.metasRepository.create(createMetaInput);
    return this.metasRepository.save(newMeta);
  }

  findAll(): Promise<Meta[]> {
    return this.metasRepository.find({ relations: ['ahorros', 'historial'] });
  }

  findOne(id: number): Promise<Meta> {
    return this.metasRepository.findOne({ where: { id }, relations: ['ahorros', 'historial'] });
  }

  async update(id: number, updateMetaInput: UpdateMetaInput): Promise<Meta> {
    await this.metasRepository.update(id, updateMetaInput);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.metasRepository.delete(id);
  }
}
