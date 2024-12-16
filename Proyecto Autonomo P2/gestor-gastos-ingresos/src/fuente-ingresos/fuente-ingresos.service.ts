import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FuenteIngreso } from './entities/fuente-ingreso.entity';
import { CreateFuenteIngresoInput } from './dto/create-fuente-ingreso.input';
import { UpdateFuenteIngresoInput } from './dto/update-fuente-ingreso.input';

@Injectable()
export class FuenteIngresoService {
  constructor(
    @InjectRepository(FuenteIngreso)
    private fuenteIngresoRepository: Repository<FuenteIngreso>,
  ) {}

  async create(createFuenteIngresoInput: CreateFuenteIngresoInput): Promise<FuenteIngreso> {
    const fuenteIngreso = this.fuenteIngresoRepository.create(createFuenteIngresoInput);
    return this.fuenteIngresoRepository.save(fuenteIngreso);
  }

  async update(updateFuenteIngresoInput: UpdateFuenteIngresoInput): Promise<FuenteIngreso> {
    const fuenteIngreso = await this.fuenteIngresoRepository.findOne({
      where: { id: updateFuenteIngresoInput.id },
    });

    if (!fuenteIngreso) {
      throw new Error('Fuente de ingreso no encontrada');
    }

    fuenteIngreso.nombre = updateFuenteIngresoInput.nombre;
    return this.fuenteIngresoRepository.save(fuenteIngreso);
  }

  async findAll(): Promise<FuenteIngreso[]> {
    return this.fuenteIngresoRepository.find();
  }

  async findOne(id: number): Promise<FuenteIngreso> {
    return this.fuenteIngresoRepository.findOne({
      where: { id },
    });
  }
}
