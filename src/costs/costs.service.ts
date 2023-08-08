import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Cost } from './entites/costs.entity';
import { CostT } from './types';

@Injectable()
export class CostsService {
  private readonly logger = new Logger('COSTS.SERVICE');
  constructor(private prisma: PrismaService) {}

  async findCosts(): Promise<any> {
    this.logger.verbose('findCosts');
    return this.prisma.cost.findMany();
  }

  async findCostById(costId: number): Promise<any> {
    this.logger.verbose('findCostById');
    return await this.prisma.cost.findUnique({
      where: { id: costId },
    });
  }

  async createCost(name: string, mount: number, userId: number) {
    this.logger.verbose('createCost');
    const createdCost = await this.prisma.cost
      .create({
        data: {
          name: name,
          mount: mount,
          userId: userId,
        },
      })
      .catch((error) => {
        this.logger.error(error.code);
        if (error.code == 'P2003') {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: 'Пользователь не найден',
            },
            HttpStatus.NOT_FOUND,
          );
        }
      });

    return createdCost;
  }
}
