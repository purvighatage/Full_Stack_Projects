import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CountryGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;
    const args = ctx.getArgs();

    // Re-BAC: Restrict users to operate only within their assigned country
    // ADMIN is org-wide and can access any country
    if (user.role === 'ADMIN') {
      return true;
    }
    
    // Example: If creating an order, check if restaurant is in user's country
    if (args.restaurantId) {
      const restaurant = await this.prisma.restaurant.findUnique({
        where: { id: args.restaurantId },
      });
      if (restaurant && restaurant.country !== user.country) {
        throw new ForbiddenException(`You can only operate within ${user.country}`);
      }
    }

    // If viewing a specific order
    if (args.orderId) {
       const order = await this.prisma.order.findUnique({
         where: { id: args.orderId },
         include: { user: true }
       });
       if (order && order.user.country !== user.country) {
         throw new ForbiddenException(`Access denied for orders in other countries`);
       }
    }

    return true;
  }
}
