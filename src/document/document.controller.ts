import { Controller, Get, Post, Put, Delete, Param, Body, Logger, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentEntity } from './document.schema';
import { CreateDocumentDto } from './dto/create-document.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('documents')
export class DocumentController {
  private readonly logger = new Logger(DocumentController.name);
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  async getAll(): Promise<DocumentEntity[]> {
    return this.documentService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<DocumentEntity> {
    return this.documentService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() data: CreateDocumentDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<{ success: boolean; document?: DocumentEntity; message?: string }> {

    console.log('Fayl keldi:', file);
    console.log('Data keldi:', data);

    try {
      const document = await this.documentService.create({ ...data, file: file?.path });
      return { success: true, document };
    } catch (error) {
      this.logger.error(`Error creating document: ${error.message}`);
      return { success: false, message: 'Failed to create document' };
    }
  }
  

  @Put(':id')
  @UseInterceptors(FileInterceptor('file')) 
  async update(
    @Param('id') id: string,
    @Body() data: Partial<DocumentEntity>,
    @UploadedFile() file?: Express.Multer.File
  ): Promise<DocumentEntity> {
    const updatedData = {
      ...data,
      filePath: file ? file.path : undefined 
    };
  
    return this.documentService.update(id, updatedData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.documentService.delete(id);
    return { message: 'Документ удален' };
  }
}
