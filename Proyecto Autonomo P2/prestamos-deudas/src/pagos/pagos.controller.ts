import { Controller, Get } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { Pago } from './entities/pago.entity';

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Get('generate-pdf')
  async generatePdf(): Promise<string> {
    const pagos: Pago[] = await this.pagosService.findAll();
    return this.pagosService.generatePagoReport(pagos);
  }
}
