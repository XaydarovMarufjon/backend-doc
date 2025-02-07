import { Controller, Get, Post, Put, Delete, Param, Body, Logger } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentEntity } from './document.schema';
import { CreateDocumentDto } from './dto/create-document.dto';

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
  async create(@Body() data: CreateDocumentDto): Promise<{ success: boolean; document?: DocumentEntity; message?: string }> {
    this.logger.log(`Creating document with data: ${JSON.stringify(data)}`);
    try {
      const document = await this.documentService.create(data);
      return { success: true, document };
    } catch (error) {
      this.logger.error(`Error creating document: ${error.message}`);
      return { success: false, message: 'Failed to create document' };
    }
  }
  

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<DocumentEntity>): Promise<DocumentEntity> {
    return this.documentService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.documentService.delete(id);
    return { message: 'Документ удален' };
  }
}
