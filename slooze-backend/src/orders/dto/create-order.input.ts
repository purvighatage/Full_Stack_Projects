import { InputType, Field } from '@nestjs/graphql';
import { OrderItemInput } from './order-item.input';

@InputType()
export class CreateOrderInput {
  @Field(() => [OrderItemInput])
  items: OrderItemInput[];

  @Field()
  restaurantId: string;
}
