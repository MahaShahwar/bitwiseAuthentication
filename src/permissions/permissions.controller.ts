import { Body, Controller, Post } from '@nestjs/common';
import { PermissionsDto } from './permissions.dto';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}
  @Post('createPermission')
  async createPermission(@Body() body: PermissionsDto) {
    const added = await this.permissionsService.createPermission(body);
    return added;
  }
}
