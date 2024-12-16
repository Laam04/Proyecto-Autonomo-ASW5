import { Controller, Get, Res } from '@nestjs/common';
import { PdfGeneratorService } from './pdf-generator.service';
import { Response } from 'express';

@Controller('pdf')
export class PdfGeneratorController {
  constructor(private readonly pdfGeneratorService: PdfGeneratorService) {}

  @Get('generate')
  async generatePdf(@Res() res: Response): Promise<void> {
    try {
      const filePath = await this.pdfGeneratorService.generatePdf();
      
      res.sendFile(filePath, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          res.status(500).send('Error al generar el archivo PDF');
        }
      });
    } catch (error) {
      console.error('Error generando PDF:', error);
      res.status(500).send('Error interno del servidor');
    }
  }
}
