import { Injectable } from '@nestjs/common';
import { CreateCategoriaGastoDto } from './dto/create-categorias-gasto.dto';
import { UpdateCategoriaGastoDto } from './dto/update-categorias-gasto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaGasto } from './entities/categorias-gasto.entity';

@Injectable()
export class CategoriasGastoService {
  constructor(
    @InjectRepository(CategoriaGasto)
    private readonly categoriasGastoRepository: Repository<CategoriaGasto>,
  ) {}

  create(createCategoriaGastoDto: CreateCategoriaGastoDto) {
    const categoriaGasto = this.categoriasGastoRepository.create(createCategoriaGastoDto);
    return this.categoriasGastoRepository.save(categoriaGasto);
  }

  findAll() {
    return this.categoriasGastoRepository.find();
  }

  async findOne(id: number) {
    return this.categoriasGastoRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateCategoriaGastoDto: UpdateCategoriaGastoDto) {
    return this.categoriasGastoRepository.update(id, updateCategoriaGastoDto);
  }

  remove(id: number) {
    return this.categoriasGastoRepository.delete(id);
  }
}
