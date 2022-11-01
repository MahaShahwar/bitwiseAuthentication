import { Controller, Get, Request } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { Request as ExpressRequest, Router } from 'express';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}
  @Get('route')
  root(@Request() req: ExpressRequest) {
    const router = req.app._router as Router;
    this.routesService.route(router);
    return 'done';
  }
}
