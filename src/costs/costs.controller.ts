import {
  Controller,
  Get,
  Logger,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CostsService } from './costs.service';
import { Cost } from './entites/costs.entity';
import { CostT } from './types';
import { CreateCostDto } from './dto/create-cost.dto';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Costs')
@Controller('costs')
export class CostsController {
  private readonly logger = new Logger('COSTS.CONTROLLER');

  constructor(private readonly costsService: CostsService) {}

  @Get()
  @ApiOperation({ summary: 'get all costs' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [Cost] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findAll(): Promise<Cost[]> {
    this.logger.verbose('costs.controller: findAll');
    return this.costsService.findCosts();
  }

  @Get('cost/:costId')
  @ApiOperation({ summary: 'get cost by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [Cost] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findCost(@Param('costdId') costId: string): Promise<CostT> {
    this.logger.verbose('costs.controller: findCost');
    return this.costsService.findCostById(+costId);
  }

  @Post('cost/create')
  @ApiOperation({ summary: 'create cost' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created',
    type: Cost,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.NOT_FOUND)
  createCost(@Body() dto: CreateCostDto): Promise<any> {
    this.logger.verbose('costs.controller: createCost');
    return this.costsService.createCost(dto.name, dto.mount, dto.userId);
  }
}
