import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Restaurant } from './models/restaurant.model';
import { MenuItem } from './models/menu-item.model';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CountryGuard } from '../common/guards/country.guard';

@Resolver()
@UseGuards(GqlAuthGuard)
export class RestaurantsResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Restaurant])
  async restaurants(@CurrentUser() user: any) {
    // Re-BAC: Only show restaurants in user's country, unless ADMIN
    return this.prisma.restaurant.findMany({
      where: user.role === 'ADMIN' ? {} : { country: user.country },
    });
  }

  @Query(() => [MenuItem])
  @UseGuards(CountryGuard)
  async menuItems(@Args('restaurantId', { type: () => ID }) restaurantId: string) {
    return this.prisma.menuItem.findMany({
      where: { restaurantId },
    });
  }
}
