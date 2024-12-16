import { Injectable } from '@nestjs/common';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import { Ingreso } from '../ingresos/entities/ingreso.entity';
import { Gasto } from '../gastos/entities/gasto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChartConfiguration, ChartTypeRegistry } from 'chart.js';
import * as moment from 'moment';

@Injectable()
export class GraphGeneratorService {
  constructor(
    @InjectRepository(Ingreso)
    private ingresoRepository: Repository<Ingreso>,
    @InjectRepository(Gasto)
    private gastoRepository: Repository<Gasto>,
  ) {}

  async generateGraph(): Promise<string> {
    const ingresos = await this.ingresoRepository.find();
    const gastos = await this.gastoRepository.find();
    const ingresosByMonth = this.aggregateByMonth(ingresos);
    const gastosByMonth = this.aggregateByMonth(gastos);
    const months = Object.keys(ingresosByMonth); 
    const ingresosData = months.map(month => ingresosByMonth[month]);
    const gastosData = months.map(month => gastosByMonth[month]);
    const configuration: ChartConfiguration<keyof ChartTypeRegistry> = {
      type: 'bar',  
      data: {
        labels: months, 
        datasets: [
          {
            label: 'Ingresos',
            data: ingresosData,  
            backgroundColor: 'rgba(75, 192, 192, 0.2)',  
            borderColor: 'rgba(75, 192, 192, 1)',  
            borderWidth: 1,
          },
          {
            label: 'Gastos',
            data: gastosData,  
            backgroundColor: 'rgba(255, 99, 132, 0.2)',  
            borderColor: 'rgba(255, 99, 132, 1)',  
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Meses',  
            },
          },
          y: {
            title: {
              display: true,
              text: 'Monto',  
            },
          },
        },
      },
    };

    const width = 800; 
    const height = 600; 
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });
    const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
    const imageBase64 = imageBuffer.toString('base64');

    return `data:image/png;base64,${imageBase64}`;
  }

  private aggregateByMonth(data: any[]): { [key: string]: number } {
    const result = {};
    data.forEach(item => {
      const month = moment(item.fecha).format('YYYY-MM'); 
      if (!result[month]) {
        result[month] = 0;
      }
      result[month] += item.monto;
    });
    return result;
  }
}
