import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaClient } from '@prisma/client';

describe('RBAC and Location-Based Access (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;
  let indiaRestId: string;
  let americaRestId: string;
  let paneerId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    
    prisma = new PrismaClient();
    const restaurants = await prisma.restaurant.findMany({ include: { menuItems: true } });
    indiaRestId = restaurants.find(r => r.country === 'INDIA')!.id;
    americaRestId = restaurants.find(r => r.country === 'AMERICA')!.id;
    paneerId = restaurants.find(r => r.country === 'INDIA')!.menuItems[0]!.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  const login = async (email: string) => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            login(loginInput: { email: "${email}", password: "password123" }) {
              access_token
            }
          }
        `,
      });
    if (response.body.errors) {
      console.log('Login Errors:', JSON.stringify(response.body.errors, null, 2));
    }
    return response.body.data.login.access_token;
  };

  const graphqlRequest = (token: string, query: string, variables: any = {}) => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({ query, variables });
  };

  describe('Nick Fury (ADMIN)', () => {
    let token: string;
    beforeAll(async () => { token = await login('nick.fury@slooze.com'); });

    it('should see all restaurants', async () => {
      const res = await graphqlRequest(token, '{ restaurants { name country } }');
      expect(res.body.data.restaurants.length).toBeGreaterThanOrEqual(2);
      const countries = res.body.data.restaurants.map(r => r.country);
      expect(countries).toContain('INDIA');
      expect(countries).toContain('AMERICA');
    });

    it('should see all payment methods', async () => {
      const res = await graphqlRequest(token, '{ allPaymentMethods { id type } }');
      expect(res.body.data.allPaymentMethods).toBeDefined();
    });
  });

  describe('Captain Marvel (MANAGER - INDIA)', () => {
    let token: string;
    beforeAll(async () => { token = await login('captain.marvel@slooze.com'); });

    it('should ONLY see India restaurants', async () => {
      const res = await graphqlRequest(token, '{ restaurants { name country } }');
      const countries = res.body.data.restaurants.map(r => r.country);
      expect(countries.every(c => c === 'INDIA')).toBe(true);
      expect(countries).not.toContain('AMERICA');
    });

    it('should NOT see payment methods (RBAC)', async () => {
      const res = await graphqlRequest(token, '{ allPaymentMethods { id } }');
      expect(res.body.errors[0].message).toContain('Forbidden');
    });

    it('should NOT access America menu items (CountryGuard)', async () => {
      const res = await graphqlRequest(token, `query { menuItems(restaurantId: "${americaRestId}") { name } }`);
      expect(res.body.errors[0].message).toContain('You can only operate within INDIA');
    });

    it('should be able to create an order in India', async () => {
      const res = await graphqlRequest(token, `
        mutation {
          createOrder(createOrderInput: {
            restaurantId: "${indiaRestId}",
            items: [{ menuItemId: "${paneerId}", quantity: 2 }]
          }) {
            id
            status
            totalAmount
          }
        }
      `);
      expect(res.body.data.createOrder).toBeDefined();
      expect(res.body.data.createOrder.status).toBe('PENDING');
    });
  });

  describe('Captain America (MANAGER - AMERICA)', () => {
    let token: string;
    beforeAll(async () => { token = await login('captain.america@slooze.com'); });

    it('should ONLY see America restaurants', async () => {
      const res = await graphqlRequest(token, '{ restaurants { name country } }');
      const countries = res.body.data.restaurants.map(r => r.country);
      expect(countries.every(c => c === 'AMERICA')).toBe(true);
    });
  });

  describe('Travis (MEMBER - AMERICA)', () => {
    let token: string;
    beforeAll(async () => { token = await login('travis@slooze.com'); });

    it('should NOT be able to checkout (RBAC)', async () => {
      const res = await graphqlRequest(token, 'mutation { checkoutOrder(orderId: "id") { id } }');
      expect(res.body.errors[0].message).toContain('Forbidden');
    });
  });

  describe('Thanos (MEMBER - INDIA)', () => {
    let token: string;
    beforeAll(async () => { token = await login('thanos@slooze.com'); });

    it('should NOT be able to checkout orders (RBAC)', async () => {
      const res = await graphqlRequest(token, `mutation { checkoutOrder(orderId: "some-id") { id } }`);
      expect(res.body.errors[0].message).toContain('Forbidden');
    });
  });
});
