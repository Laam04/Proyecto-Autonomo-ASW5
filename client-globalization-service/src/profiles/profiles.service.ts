import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Account } from '../accounts/entities/account.entity';
import { Currency } from '../currencies/entities/currency.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as pdf from 'pdfkit';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
    @InjectRepository(Currency)
    private currenciesRepository: Repository<Currency>,
  ) {}
  async create(createProfileInput: CreateProfileInput): Promise<Profile> {
    const { accountId, currencyId, ...rest } = createProfileInput;

    const account = await this.accountsRepository.findOne({ where: { id: accountId } });
    const currency = await this.currenciesRepository.findOne({ where: { id: currencyId } });

    if (!account || !currency) {
      throw new Error('Cuenta o moneda no encontrada');
    }

    const newProfile = this.profilesRepository.create({
      ...rest,
      account,
      currency,
    });

    return this.profilesRepository.save(newProfile);
  }

  async update(id: number, updateProfileInput: UpdateProfileInput): Promise<Profile> {
    const profile = await this.profilesRepository.findOne({ where: { id }, relations: ['account', 'currency'] });

    if (!profile) {
      throw new Error('Perfil no encontrado');
    }

    const updatedProfile = this.profilesRepository.create({
      ...profile,
      ...updateProfileInput,
    });

    return this.profilesRepository.save(updatedProfile);
  }

  async findOne(id: number): Promise<Profile> {
    return this.profilesRepository.findOne({
      where: { id }, 
      relations: ['account', 'currency'], 
    });
  }

  async findAll(): Promise<Profile[]> {
    return this.profilesRepository.find({
      relations: ['account', 'currency'], 
    });
  }

  async generateProfileReport(profiles: Profile[]): Promise<string> {
    const doc = new pdf();

    const filePath = path.join(__dirname, '../../pdfs', 'profiles_report.pdf');
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(16).text('Profile Report', { align: 'center' });

    profiles.forEach(profile => {
      doc.moveDown(1);
      doc.fontSize(12).text(`ID: ${profile.id}`);
      doc.text(`Name: ${profile.name}`);
      doc.text(`Email: ${profile.email}`);
      doc.text(`Balance: ${profile.balance}`);
      doc.text(`Currency: ${profile.currency.name}`);
      doc.text('----------------------------');
    });

    doc.end();

    return filePath;
  }
}
