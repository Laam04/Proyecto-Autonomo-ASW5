import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { FuentesIngresoService } from './fuentes-ingreso.service';
import { CreateFuenteIngresoDto } from './dto/create-fuentes-ingreso.dto';
import { UpdateFuenteIngresoDto } from './dto/update-fuentes-ingreso.dto';

@Controller('fuentes-ingreso')
export class FuentesIngresoController {
  constructor(private readonly fuentesIngresoService: FuentesIngresoService) {}

  @Post()
  create(@Body() createFuenteIngresoDto: CreateFuenteIngresoDto) {
    return this.fuentesIngresoService.create(createFuenteIngresoDto);
  }

  @Get()
  findAll() {
    return this.fuentesIngresoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fuentesIngresoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFuenteIngresoDto: UpdateFuenteIngresoDto) {
    return this.fuentesIngresoService.update(+id, updateFuenteIngresoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fuentesIngresoService.remove(+id);
  }
}
