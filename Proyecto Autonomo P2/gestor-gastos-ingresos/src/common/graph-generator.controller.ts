import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { GraphGeneratorService } from './graph-generator.service';

@Controller('graph')
export class GraphGeneratorController {
  constructor(private readonly graphGeneratorService: GraphGeneratorService) {}

  @Get('generate')
  async generateGraph(@Res() res: Response): Promise<void> {
    try {
      const imageBuffer = await this.graphGeneratorService.generateGraph();
      res.set('Content-Type', 'image/png');
      res.send(imageBuffer);
    } catch (error) {
      console.error('Error generando gráfico:', error);
      res.status(500).send('Error al generar el gráfico');
    }
  }
}
