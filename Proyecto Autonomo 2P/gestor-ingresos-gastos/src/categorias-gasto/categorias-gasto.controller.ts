import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { CategoriasGastoService } from './categorias-gasto.service';
import { CreateCategoriaGastoDto } from './dto/create-categorias-gasto.dto';
import { UpdateCategoriaGastoDto } from './dto/update-categorias-gasto.dto';

@Controller('categorias-gasto')
export class CategoriasGastoController {
  constructor(private readonly categoriasGastoService: CategoriasGastoService) {}

  @Post()
  create(@Body() createCategoriaGastoDto: CreateCategoriaGastoDto) {
    return this.categoriasGastoService.create(createCategoriaGastoDto);
  }

  @Get()
  findAll() {
    return this.categoriasGastoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriasGastoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriaGastoDto: UpdateCategoriaGastoDto) {
    return this.categoriasGastoService.update(+id, updateCategoriaGastoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriasGastoService.remove(+id);
  }
}
