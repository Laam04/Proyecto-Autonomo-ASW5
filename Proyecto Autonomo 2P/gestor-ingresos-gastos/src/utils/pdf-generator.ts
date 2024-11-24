import * as PDFDocument from 'pdfkit';
import { Response } from 'express';

export const generateGastosReport = (gastos: any[], res: Response) => {
  const doc = new PDFDocument();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="gastos-report.pdf"');

  doc.pipe(res);
  doc.fontSize(25).text('Reporte de Gastos', 100, 80);

  gastos.forEach((gasto, index) => {
    doc.fontSize(12).text(`${index + 1}. ${gasto.descripcion} - ${gasto.monto} - ${gasto.fecha}`);
  });

  doc.end();
};
