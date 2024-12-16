import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gasto } from './entities/gasto.entity';
import { CreateGastoInput } from './dto/create-gasto.input';
import { UpdateGastoInput } from './dto/update-gasto.input';
import { CategoriaGasto } from '../categoria-gastos/entities/categoria-gasto.entity';

@Injectable()
export class GastosService {
  constructor(
    @InjectRepository(Gasto)
    private gastoRepository: Repository<Gasto>,
    @InjectRepository(CategoriaGasto)
    private categoriaGastoRepository: Repository<CategoriaGasto>,
  ) {}

  async create(createGastoInput: CreateGastoInput): Promise<Gasto> {
    const categoriaGasto = await this.categoriaGastoRepository.findOne({
      where: { id: createGastoInput.categoriaGastoId },
    });

    if (!categoriaGasto) {
      throw new Error('Categoría de gasto no encontrada');
    }

    const gasto = this.gastoRepository.create(createGastoInput);
    gasto.categoriaGasto = categoriaGasto;
    return this.gastoRepository.save(gasto);
  }

  async update(updateGastoInput: UpdateGastoInput): Promise<Gasto> {
    const gasto = await this.gastoRepository.findOne({
      where: { id: updateGastoInput.id },
    });

    if (!gasto) {
      throw new Error('Gasto no encontrado');
    }

    const categoriaGasto = await this.categoriaGastoRepository.findOne({
      where: { id: updateGastoInput.categoriaGastoId },
    });

    if (!categoriaGasto) {
      throw new Error('Categoría de gasto no encontrada');
    }

    gasto.descripcion = updateGastoInput.descripcion;
    gasto.monto = updateGastoInput.monto;
    gasto.fecha = updateGastoInput.fecha;
    gasto.categoriaGasto = categoriaGasto;

    return this.gastoRepository.save(gasto);
  }
  async findAll(): Promise<Gasto[]> {
    return this.gastoRepository.find({ relations: ['categoriaGasto'] });
  }

  async findOne(id: number): Promise<Gasto> {
    return this.gastoRepository.findOne({
      where: { id },
      relations: ['categoriaGasto'],
    });
  }
}
