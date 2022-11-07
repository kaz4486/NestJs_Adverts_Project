/* eslint-disable prettier/prettier */
import { IsArray, IsEnum, IsNotEmpty, IsNumber, MaxLength, Min, MinLength } from 'class-validator';
import { Tags } from '../enums/tags.enums';

export class UpdateProductDto {
    @IsNotEmpty()
    @MinLength(0)
    @MaxLength(25)
    name: string;
    @Min(0)
    @IsNumber()
    price: number;
    @Min(0)
    @IsNumber()
    count: number;
  
    @IsArray()
    @IsEnum(Tags, {each: true})
    tags: Tags[];
}