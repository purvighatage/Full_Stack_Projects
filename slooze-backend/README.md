# Role-Based Food Ordering Backend

A perfect NestJS backend for a food-ordering application featuring **Role-Based Access Control (RBAC)** and **Country-Based Relational Access Control (Re-BAC)**.

## Features
- **Authentication**: JWT-based auth with Role and Country metadata.
- **RBAC**: Admin, Manager, and Member roles with specific permissions.
- **Re-BAC**: Users are restricted to operations within their assigned country (India or America).
- **GraphQL API**: Purely GraphQL-based architecture using Apollo Server and Prisma.
- **Prisma ORM**: Type-safe database interactions with SQLite.

## Tech Stack
- **NestJS** (v11+)
- **GraphQL** (Apollo Driver)
- **Prisma** (SQLite)
- **Passport & JWT**
- **Jest** (E2E Testing)

## Roles & Permissions
| Feature | Admin | Manager | Member |
| :--- | :---: | :---: | :---: |
| View Restaurants | ✅ | ✅ | ✅ |
| Create Order | ✅ | ✅ | ✅ |
| Checkout & Pay | ✅ | ✅ | ❌ |
| Cancel Order | ✅ | ✅ | ❌ |
| Manage Payments | ✅ | ❌ | ❌ |

## Country Restriction (Re-BAC)
Users can only see restaurants and manage orders within their assigned country (India or America).

## Setup & Run
1. **Install Dependencies**: `npm install`
2. **Setup Database**: `npx prisma migrate dev --name init`
3. **Seed Data**: `npx prisma db seed`
4. **Start Server**: `npm run start:dev`

## Automated Tests
The project includes comprehensive E2E tests for RBAC and Country-based restrictions:
- **Run E2E Tests**: `npm run test:e2e`
- **Verification**: Tests cover access control for Admins, Managers (India/America), and Members.

## Default Users (Password: `password123`)
| Email | Role | Country |
| :--- | :--- | :--- |
| `nick.fury@slooze.com` | ADMIN | - |
| `captain.marvel@slooze.com` | MANAGER | INDIA |
| `captain.america@slooze.com` | MANAGER | AMERICA |
| `member.india@foody.com` | MEMBER | INDIA |
| `thanos@slooze.com` | MEMBER | INDIA |
| `travis@slooze.com` | MEMBER | AMERICA |

## API Documentation
Go to `http://localhost:3000/graphql` to access the Apollo Sandbox.

