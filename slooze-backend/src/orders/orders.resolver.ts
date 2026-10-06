import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Order } from './models/order.model';
import { CreateOrderInput } from './dto/create-order.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CountryGuard } from '../common/guards/country.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role, OrderStatus } from '@prisma/client';

@Resolver(() => Order)
@UseGuards(GqlAuthGuard, RolesGuard)
export class OrdersResolver {
  constructor(private prisma: PrismaService) {}

  @Mutation(() => Order)
  @UseGuards(CountryGuard)
  async createOrder(
    @CurrentUser() user: any,
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ) {
    const menuItems = await this.prisma.menuItem.findMany({
      where: { id: { in: createOrderInput.items.map(i => i.menuItemId) } }
    });

    let totalAmount = 0;
    createOrderInput.items.forEach(item => {
      const menuItem = menuItems.find(mi => mi.id === item.menuItemId);
      if (menuItem) {
        totalAmount += menuItem.price * item.quantity;
      }
    });

    return this.prisma.order.create({
      data: {
        userId: user.userId,
        totalAmount,
        status: OrderStatus.PENDING,
        items: {
          create: createOrderInput.items.map(item => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });
  }

  @Mutation(() => Order)
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(CountryGuard)
  async checkoutOrder(@Args('orderId', { type: () => ID }) orderId: string) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.COMPLETED },
    });
  }

  @Mutation(() => Order)
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(CountryGuard)
  async cancelOrder(@Args('orderId', { type: () => ID }) orderId: string) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.CANCELLED },
    });
  }

  @Query(() => [Order])
  async myOrders(@CurrentUser() user: any) {
    return this.prisma.order.findMany({
      where: { userId: user.userId },
      include: { items: true },
    });
  }
}
