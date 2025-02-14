import { Controller, Get, Post, Put, Delete, Param, Body, Logger, UploadedFile, UseInterceptors, BadRequestException, Res, NotFoundException } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentEntity } from './document.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';

@Controller('documents')
export class DocumentController {
  private readonly logger = new Logger(DocumentController.name);
  constructor(private readonly documentService: DocumentService) { }

  @Get()
  async getAll(): Promise<DocumentEntity[]> {
    return this.documentService.findAll();
  }

@Post()
@UseInterceptors(FileInterceptor('file', {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileExt = file.originalname.split('.').pop();
      cb(null, `document-${uniqueSuffix}.${fileExt}`);
    },
  }),
}))
async create(
  @UploadedFile() file: Express.Multer.File,
  @Body() data: any
) {
  if (!file) {
    throw new BadRequestException("Файл не прибыл или был назван неправильно!");
  }

  // const fileUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${file.filename}`;
  const fileUrl = `https://backend-doc-eight.vercel.app/uploads/${file.filename}`;


  const newDocument = await this.documentService.create({
    ...data,
    file: fileUrl 
  });

  return newDocument;
}

@Put(':id')
@UseInterceptors(FileInterceptor('file', {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileExt = file.originalname.split('.').pop();
      cb(null, `document-${uniqueSuffix}.${fileExt}`);
    },
  }),
}))

async update(
  @Param('id') id: string,
  @Body() data: Partial<DocumentEntity>,
  @UploadedFile() file?: Express.Multer.File
): Promise<DocumentEntity> {
  
  const existingDocument = await this.documentService.findOne(id);
  if (!existingDocument) {
    throw new NotFoundException('Документ не найден!')
  }

  let fileUrl = existingDocument.file; 

  if (file) {
    fileUrl = `http://localhost:3000/uploads/${file.filename}`; 
  }

  const updatedData = {
    ...data,
    file: fileUrl, 
  };

  return this.documentService.update(id, updatedData);
}

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.documentService.delete(id);
    return { message: 'Документ удален' };
  }
}
