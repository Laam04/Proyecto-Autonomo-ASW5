import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaGasto } from './entities/categoria-gasto.entity';
import { CreateCategoriaGastoInput } from './dto/create-categoria-gasto.input';
import { UpdateCategoriaGastoInput } from './dto/update-categoria-gasto.input';

@Injectable()
export class CategoriaGastoService {
  constructor(
    @InjectRepository(CategoriaGasto)
    private categoriaGastoRepository: Repository<CategoriaGasto>,
  ) {}

  async create(createCategoriaGastoInput: CreateCategoriaGastoInput): Promise<CategoriaGasto> {
    const categoriaGasto = this.categoriaGastoRepository.create(createCategoriaGastoInput);
    return this.categoriaGastoRepository.save(categoriaGasto);
  }

  async update(updateCategoriaGastoInput: UpdateCategoriaGastoInput): Promise<CategoriaGasto> {
    const categoriaGasto = await this.categoriaGastoRepository.findOne({
      where: { id: updateCategoriaGastoInput.id },
    });

    if (!categoriaGasto) {
      throw new Error('Categoría de gasto no encontrada');
    }

    categoriaGasto.nombre = updateCategoriaGastoInput.nombre;

    return this.categoriaGastoRepository.save(categoriaGasto);
  }

  async findAll(): Promise<CategoriaGasto[]> {
    return this.categoriaGastoRepository.find();
  }

  async findOne(id: number): Promise<CategoriaGasto> {
    return this.categoriaGastoRepository.findOne({
      where: { id },
    });
  }
}
