import { ApiProperty } from '@nestjs/swagger';

export class ICreatePlanDTO {
  @ApiProperty({ example: 'free' })
  type: string;
  @ApiProperty({ example: '00.00' })
  price: string;
  @ApiProperty({ example: 'PEN' })
  currency: string;
  @ApiProperty({ example: 'monthly' })
  cicleType: string;
  @ApiProperty({ example: 1 })
  cicleNumber: number;
  @ApiProperty({ example: 'This is a free plan' })
  description: string;
  @ApiProperty({ example: ['Feature 1', 'Feature 2'] })
  characteristics: string[];
  @ApiProperty({ example: true })
  status: boolean;
}
