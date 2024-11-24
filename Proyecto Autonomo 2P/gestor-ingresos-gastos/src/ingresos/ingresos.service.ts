import { Injectable } from '@nestjs/common';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
import { UpdateIngresoDto } from './dto/update-ingreso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingresos } from './entities/ingreso.entity';

@Injectable()
export class IngresosService {
  constructor(
    @InjectRepository(Ingresos)
    private readonly ingresosRepository: Repository<Ingresos>,
  ) {}

  create(createIngresoDto: CreateIngresoDto) {
    const ingreso = this.ingresosRepository.create(createIngresoDto);
    return this.ingresosRepository.save(ingreso);
  }

  findAll() {
    return this.ingresosRepository.find();
  }

  async findOne(id: number) {
    return this.ingresosRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateIngresoDto: UpdateIngresoDto) {
    return this.ingresosRepository.update(id, updateIngresoDto);
  }

  remove(id: number) {
    return this.ingresosRepository.delete(id);
  }
}
