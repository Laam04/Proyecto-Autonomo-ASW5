import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingreso } from './entities/ingreso.entity';
import { CreateIngresoInput } from './dto/create-ingreso.input';
import { UpdateIngresoInput } from './dto/update-ingreso.input';
import { FuenteIngreso } from '../fuente-ingresos/entities/fuente-ingreso.entity';

@Injectable()
export class IngresoService {
  constructor(
    @InjectRepository(Ingreso)
    private ingresoRepository: Repository<Ingreso>,
    @InjectRepository(FuenteIngreso)
    private fuenteIngresoRepository: Repository<FuenteIngreso>,
  ) {}

  async create(createIngresoInput: CreateIngresoInput): Promise<Ingreso> {
    const fuenteIngreso = await this.fuenteIngresoRepository.findOne({
      where: { id: createIngresoInput.fuenteIngresoId },
    });

    if (!fuenteIngreso) {
      throw new Error('Fuente de ingreso no encontrada');
    }

    const ingreso = this.ingresoRepository.create(createIngresoInput);
    ingreso.fuenteIngreso = fuenteIngreso;
    return this.ingresoRepository.save(ingreso);
  }

  async update(updateIngresoInput: UpdateIngresoInput): Promise<Ingreso> {
    const ingreso = await this.ingresoRepository.findOne({
      where: { id: updateIngresoInput.id },
    });

    if (!ingreso) {
      throw new Error('Ingreso no encontrado');
    }

    const fuenteIngreso = await this.fuenteIngresoRepository.findOne({
      where: { id: updateIngresoInput.fuenteIngresoId },
    });

    if (!fuenteIngreso) {
      throw new Error('Fuente de ingreso no encontrada');
    }

    ingreso.nombre = updateIngresoInput.nombre;
    ingreso.monto = updateIngresoInput.monto;
    ingreso.fecha = updateIngresoInput.fecha;  
    ingreso.fuenteIngreso = fuenteIngreso;

    return this.ingresoRepository.save(ingreso);
  }
  
  async findAll(): Promise<Ingreso[]> {
    return this.ingresoRepository.find({ relations: ['fuenteIngreso'] });
  }

  async findOne(id: number): Promise<Ingreso> {
    return this.ingresoRepository.findOne({
      where: { id },
      relations: ['fuenteIngreso'],
    });
  }
  
}
