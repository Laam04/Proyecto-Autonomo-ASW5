import { Injectable } from '@nestjs/common';
import { CreateCategoriasGastoInput } from './dto/create-categorias-gasto.input';
import { UpdateCategoriasGastoInput } from './dto/update-categorias-gasto.input';

@Injectable()
export class CategoriasGastoService {
  create(createCategoriasGastoInput: CreateCategoriasGastoInput) {
    return 'This action adds a new categoriasGasto';
  }

  findAll() {
    return `This action returns all categoriasGasto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoriasGasto`;
  }

  update(id: number, updateCategoriasGastoInput: UpdateCategoriasGastoInput) {
    return `This action updates a #${id} categoriasGasto`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoriasGasto`;
  }
}
