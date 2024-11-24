import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '¡Bienvenido al simulador de finanzas personales!';
  }
}
