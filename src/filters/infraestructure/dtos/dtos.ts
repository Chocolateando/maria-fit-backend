import { ApiProperty } from '@nestjs/swagger';

export class FilterDTO {
  @ApiProperty({ example: '123423423423423' })
  id?: string;
  @ApiProperty({ example: 'filter name' })
  name: string;
  @ApiProperty({ example: ['type 1', 'type 2'] })
  type: string[];
  @ApiProperty({ example: ['difficulty 1', 'difficulty 2'] })
  difficulty: string[];
  @ApiProperty({ example: ['category 1', 'category 2'] })
  category: string[];
  @ApiProperty({ example: ['plan type 1', 'plan type 2'] })
  planType: string[];
}
