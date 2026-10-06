import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentMethod } from './models/payment-method.model';
import { CreatePaymentMethodInput } from './dto/create-payment-method.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => PaymentMethod)
@UseGuards(GqlAuthGuard, RolesGuard)
export class PaymentsResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [PaymentMethod])
  @Roles(Role.ADMIN)
  async allPaymentMethods() {
    return this.prisma.paymentMethod.findMany();
  }

  @Mutation(() => PaymentMethod)
  @Roles(Role.ADMIN)
  async addPaymentMethod(
    @CurrentUser() user: any,
    @Args('createPaymentMethodInput') input: CreatePaymentMethodInput,
  ) {
    return this.prisma.paymentMethod.create({
      data: {
        userId: user.userId,
        ...input,
      },
    });
  }

  @Mutation(() => PaymentMethod)
  @Roles(Role.ADMIN)
  async deletePaymentMethod(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.paymentMethod.delete({
      where: { id },
    });
  }
}
