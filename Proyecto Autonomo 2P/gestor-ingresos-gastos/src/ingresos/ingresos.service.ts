import { Injectable } from '@nestjs/common';
import { CreateIngresoInput } from './dto/create-ingreso.input';
import { UpdateIngresoInput } from './dto/update-ingreso.input';

@Injectable()
export class IngresosService {
  create(createIngresoInput: CreateIngresoInput) {
    return 'This action adds a new ingreso';
  }

  findAll() {
    return `This action returns all ingresos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingreso`;
  }

  update(id: number, updateIngresoInput: UpdateIngresoInput) {
    return `This action updates a #${id} ingreso`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingreso`;
  }
}
