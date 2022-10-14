import { Body, Controller, Post } from '@nestjs/common';
import { RolesDto } from './roles.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('createRole')
  async createRole(@Body() role: RolesDto) {
    const added = await this.rolesService.createRole(role);
    return added;
  }
}
