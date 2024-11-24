import { Injectable } from '@nestjs/common';
import { CreateFuenteIngresoDto } from './dto/create-fuentes-ingreso.dto';
import { UpdateFuenteIngresoDto } from './dto/update-fuentes-ingreso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FuenteIngreso } from './entities/fuentes-ingreso.entity';

@Injectable()
export class FuentesIngresoService {
  constructor(
    @InjectRepository(FuenteIngreso)
    private readonly fuentesIngresoRepository: Repository<FuenteIngreso>,
  ) {}

  create(createFuenteIngresoDto: CreateFuenteIngresoDto) {
    const fuenteIngreso = this.fuentesIngresoRepository.create(createFuenteIngresoDto);
    return this.fuentesIngresoRepository.save(fuenteIngreso);
  }

  findAll() {
    return this.fuentesIngresoRepository.find();
  }

  async findOne(id: number) {
    return this.fuentesIngresoRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateFuenteIngresoDto: UpdateFuenteIngresoDto) {
    return this.fuentesIngresoRepository.update(id, updateFuenteIngresoDto);
  }

  remove(id: number) {
    return this.fuentesIngresoRepository.delete(id);
  }
}
