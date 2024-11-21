import { Controller, Get } from '@nestjs/common';
import { DeudasService } from './deudas.service';
import { Deuda } from './entities/deuda.entity';

@Controller('deudas')
export class DeudasController {
  constructor(private readonly deudasService: DeudasService) {}

  @Get('generate-pdf')
  async generatePdf(): Promise<string> {
    const deudas: Deuda[] = await this.deudasService.findAll();
    return this.deudasService.generateDeudaReport(deudas);
  }
}
