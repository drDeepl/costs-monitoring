import { ApiProperty } from '@nestjs/swagger';
export class CreateCostDto {
  @ApiProperty({ nullable: false })
  name: string;
  @ApiProperty({ nullable: false })
  mount: number;
  @ApiProperty({ nullable: false })
  userId: number;
}
