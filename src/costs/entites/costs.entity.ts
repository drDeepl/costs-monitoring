import { ApiProperty } from '@nestjs/swagger';

export class Cost {
  @ApiProperty({ nullable: false })
  id: number;
  @ApiProperty({ nullable: false })
  name: string;
  @ApiProperty({ nullable: false })
  mount: number;
  @ApiProperty({ nullable: false })
  userId: number;
  @ApiProperty({ nullable: false })
  date: Date;
}
