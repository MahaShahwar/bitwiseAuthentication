import { Inject, Injectable } from '@nestjs/common';
// import {Cache} from 'cache-manager'

@Injectable()
export class AppService {
  //Using cache
  //constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async getHello() {
    //Add this element in cache
    // await this.cacheManager.set('cached_item', { key: 32 }, { ttl: 10 });
    // //Delete from cache
    // await this.cacheManager.del('cached_item');
    // await this.cacheManager.reset();
    // const cachedItem = await this.cacheManager.get('cached_item');
    // console.log(cachedItem);
    return 'Hello World!';
  }
}
