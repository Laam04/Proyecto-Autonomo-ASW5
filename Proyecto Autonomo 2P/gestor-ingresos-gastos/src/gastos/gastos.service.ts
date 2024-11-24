import { Injectable } from '@nestjs/common';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Gastos } from './entities/gasto.entity';

@Injectable()
export class GastosService {
  constructor(
    @InjectRepository(Gastos)
    private readonly gastosRepository: Repository<Gastos>,
  ) {}

  create(createGastoDto: CreateGastoDto) {
    const gasto = this.gastosRepository.create(createGastoDto);
    return this.gastosRepository.save(gasto);
  }

  findAll() {
    return this.gastosRepository.find();
  }

  async findOne(id: number) {
    // Aquí corregimos la llamada a findOne, pasamos un objeto con la clave `where`
    const options: FindOneOptions<Gastos> = {
      where: { id },
    };
    return this.gastosRepository.findOne(options);
  }

  update(id: number, updateGastoDto: UpdateGastoDto) {
    return this.gastosRepository.update(id, updateGastoDto);
  }

  remove(id: number) {
    return this.gastosRepository.delete(id);
  }
}
