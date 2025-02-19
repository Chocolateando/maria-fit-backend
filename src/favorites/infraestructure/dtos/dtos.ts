import { ApiProperty } from '@nestjs/swagger';

export class IFavoriteDTO {
  @ApiProperty({ example: '2432424234242' })
  id?: string;
  @ApiProperty({ example: '3424324234234' })
  user: string;
  @ApiProperty({ example: '3424324234234' })
  recipe: string;
}
