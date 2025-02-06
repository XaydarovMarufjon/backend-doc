import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentModel, DocumentEntity } from './document.schema';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(DocumentModel.name) private documentModel: Model<DocumentEntity>,
  ) {}

  async findAll(): Promise<DocumentEntity[]> {
    return this.documentModel.find().exec();
  }

  async findOne(id: string): Promise<DocumentEntity> {
    const doc = await this.documentModel.findById(id).exec();
    if (!doc) throw new NotFoundException('Документ не найден');
    return doc;
  }

  async create(data: Partial<DocumentEntity>): Promise<DocumentEntity> {
    const newDoc = new this.documentModel(data);
    return newDoc.save();
  }

  async update(id: string, data: Partial<DocumentEntity>): Promise<DocumentEntity> {
    const updatedDoc = await this.documentModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updatedDoc) throw new NotFoundException('Документ не найден');
    return updatedDoc;
  }

  async delete(id: string): Promise<void> {
    const result = await this.documentModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Документ не найден');
  }
}
