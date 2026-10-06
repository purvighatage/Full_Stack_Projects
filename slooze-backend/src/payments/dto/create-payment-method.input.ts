import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePaymentMethodInput {
  @Field()
  type: string;

  @Field()
  details: string;
}
