import { ApiProperty } from '@nestjs/swagger';

export class IResponse<T = any> {
  @ApiProperty({ example: false })
  error: boolean;
  @ApiProperty({ example: 'The data is dynamic' })
  data: T;
  @ApiProperty({ example: 'Process successfully' })
  msg: string;
  @ApiProperty({ example: 200 })
  code: number;
  @ApiProperty({ example: 'success' })
  type: string;
}
