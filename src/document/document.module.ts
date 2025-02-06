import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentModel, DocumentSchema } from './document.schema';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DocumentModel.name, schema: DocumentSchema }]),
  ],
  providers: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
