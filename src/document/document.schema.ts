import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DocumentEntity = Document & DocumentModel;

@Schema()
export class DocumentModel {
  @Prop({ required: true })
  regNumber: string;

  @Prop({ required: true })
  regDate: Date;

  @Prop()
  outgoingNumber?: string;

  @Prop()
  outgoingDate?: Date;

  @Prop()
  deliveryMethod?: string;

  @Prop({ required: true })
  correspondent: string;

  @Prop({ required: true })
  subject: string;

  @Prop()
  description?: string;

  @Prop()
  dueDate?: Date;

  @Prop()
  access: boolean;

  @Prop()
  control: boolean;

  @Prop()
  file?: string; 
}

export const DocumentSchema = SchemaFactory.createForClass(DocumentModel);
