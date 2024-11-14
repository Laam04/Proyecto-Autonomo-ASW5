import { Controller, Get } from '@nestjs/common';
import { PrestamosService } from './prestamos.service';
import { Prestamo } from './entities/prestamo.entity';

@Controller('prestamos')
export class PrestamosController {
  constructor(private readonly prestamosService: PrestamosService) {}

  @Get('generate-pdf')
  async generatePdf(): Promise<string> {
    const prestamos: Prestamo[] = await this.prestamosService.findAll();
    return this.prestamosService.generatePrestamoReport(prestamos);
  }
}
