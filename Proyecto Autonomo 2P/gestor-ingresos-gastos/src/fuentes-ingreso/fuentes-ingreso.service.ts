import { Injectable } from '@nestjs/common';
import { CreateFuentesIngresoInput } from './dto/create-fuentes-ingreso.input';
import { UpdateFuentesIngresoInput } from './dto/update-fuentes-ingreso.input';

@Injectable()
export class FuentesIngresoService {
  create(createFuentesIngresoInput: CreateFuentesIngresoInput) {
    return 'This action adds a new fuentesIngreso';
  }

  findAll() {
    return `This action returns all fuentesIngreso`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fuentesIngreso`;
  }

  update(id: number, updateFuentesIngresoInput: UpdateFuentesIngresoInput) {
    return `This action updates a #${id} fuentesIngreso`;
  }

  remove(id: number) {
    return `This action removes a #${id} fuentesIngreso`;
  }
}
