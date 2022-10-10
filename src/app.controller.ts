import { Controller, Get } from '@nestjs/common';
import { AppService } from '@root/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  //Customize caching
  // @CacheKey('some_route')
  // @CacheTTL(30)
  async getHello() {
    return this.appService.getHello();
  }
}
