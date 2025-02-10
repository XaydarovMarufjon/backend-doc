import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentModel, DocumentEntity } from './document.schema';
import { CreateDocumentDto } from './dto/create-document.dto';

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

  async create(data: CreateDocumentDto): Promise<DocumentEntity> {
    try {
      const newDoc = new this.documentModel(data);
      return await newDoc.save();
    } catch (error) {
      if (error.code === 11000) {  // MongoDB duplicate key error
        throw new BadRequestException('Документ с таким regNumber уже существует');
      }
      throw new BadRequestException('Ошибка при создании документа');
    }
  }

  async update(id: string, data: Partial<DocumentEntity>): Promise<DocumentEntity> {
    console.log(id , data);
    
    const updatedDoc = await this.documentModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updatedDoc) throw new NotFoundException('Документ не найден');
    return updatedDoc;
  }

  async delete(id: string): Promise<void> {
    const result = await this.documentModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Документ не найден');
  }
}
