import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentEntity } from './document.schema';
import { CreateDocumentDto } from './dto/create-document.dto';

@Controller('documents')
export class DocumentController {
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
  async create(@Body() data: CreateDocumentDto): Promise<any> {
    console.log('data: ', data)
    return this.documentService.create(data);
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
