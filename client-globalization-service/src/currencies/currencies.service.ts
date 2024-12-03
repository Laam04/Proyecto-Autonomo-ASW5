import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from './entities/currency.entity';
import { CreateCurrencyInput } from './dto/create-currency.input';
import * as fs from 'fs';
import * as path from 'path';
import * as pdf from 'pdfkit';

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
  ) {}

  create(createCurrencyInput: CreateCurrencyInput): Promise<Currency> {
    const { name, code, symbol } = createCurrencyInput;
    const newCurrency = this.currencyRepository.create({ name, code, symbol });

    return this.currencyRepository.save(newCurrency);
  }

  findAll(): Promise<Currency[]> {
    return this.currencyRepository.find();
  }

  findOne(id: number): Promise<Currency> {
    return this.currencyRepository.findOne({ where: { id } });
  }

  async generateCurrencyReport(currencies: Currency[]): Promise<string> {
    const doc = new pdf();
    const filePath = path.join(__dirname, '../../pdfs', 'currencies_report.pdf');
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(18).text('Reporte de Monedas', { align: 'center' });
    doc.moveDown();

    currencies.forEach(currency => {
      doc.fontSize(12).text(`${currency.name} (${currency.code}) - ${currency.symbol}`);
    });

    doc.end();
    return filePath;
  }
}
