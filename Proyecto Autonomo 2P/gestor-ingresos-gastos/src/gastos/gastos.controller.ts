import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { GastosService } from './gastos.service';
import { CreateGastoInput } from './dto/create-gasto.input';
import { UpdateGastoInput } from './dto/update-gasto.input';

@Controller('gastos')
export class GastosController {
  constructor(private readonly gastosService: GastosService) {}

  @Post()
  create(@Body() createGastoInput: CreateGastoInput) {
    return this.gastosService.create(createGastoInput);
  }

  @Get()
  findAll() {
    return this.gastosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gastosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGastoDto: UpdateGastoInput) {
    return this.gastosService.update(+id, updateGastoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gastosService.remove(+id);
  }
}
