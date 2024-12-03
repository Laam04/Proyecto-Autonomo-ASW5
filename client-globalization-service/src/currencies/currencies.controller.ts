import { Controller, Get } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { Currency } from './entities/currency.entity';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get('generate-pdf')
  async generatePdf(): Promise<string> {
    const currencies: Currency[] = await this.currenciesService.findAll();
    return this.currenciesService.generateCurrencyReport(currencies);
  }
}
