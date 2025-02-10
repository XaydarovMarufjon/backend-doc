import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentModule } from './document/document.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [DocumentModule,
    MulterModule.register({
      dest: './uploads',
    }),
    MongooseModule.forRoot('mongodb+srv://marufjankhaydarov:l8OfkMCsirRA897X@listdoc.h03kn.mongodb.net/?retryWrites=true&w=majority&appName=listdoc')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
