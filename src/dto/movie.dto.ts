import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public genre: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  public rating: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  public streamingLink: string;
}

export class UpdateMovieDto extends PartialType(CreateMovieDto) {};