import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return {
      status: 'online',
      message: 'Abdullah Albashrawi Portfolio Backend API',
      version: '1.0.0',
      endpoints: [
        '/api/projects',
        '/api/experience',
        '/api/messages',
      ],
    };
  }
}
