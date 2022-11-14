import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID, Min, IsNumber, IsEnum, ValidateNested } from 'class-validator';
import { Column } from 'typeorm';
import { Statuses } from '../enums/statuses.enums';
import { CreateOrderedProductDto } from './create-order.dto';

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  userAddressesId: string;

  @IsEnum(Statuses)
  status: Statuses;

  @Column({
    type: 'text',
    nullable: true,
  })
  additionalInformations: string;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderedProductDto)
  products: Array<CreateOrderedProductDto>;
}

export class UpdateOrderedProductDto {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @Min(0)
  @IsNumber()
  count: number;
}
