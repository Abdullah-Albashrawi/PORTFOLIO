import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { ExperienceModule } from './experience/experience.module';
import { MessagesModule } from './messages/messages.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [DbModule, ProjectsModule, ExperienceModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
