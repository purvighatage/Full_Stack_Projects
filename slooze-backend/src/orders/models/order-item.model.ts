import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class OrderItem {
  @Field(() => ID)
  id: string;

  @Field()
  orderId: string;

  @Field()
  menuItemId: string;

  @Field(() => Int)
  quantity: number;
}
