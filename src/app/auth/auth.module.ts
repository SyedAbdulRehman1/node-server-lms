// // src/auth/auth.module.ts
// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// // import { AuthController } from './auth.controller';
// import { JwtModule } from '@nestjs/jwt';
// // import { JwtStrategy } from './strategies/jwt.strategy';
// import { PrismaModule } from 'src/prisma/prisma.module';
// import { JwtStrategy } from './strategies/jwt.strategy';
// import { AuthController } from './auth.controller';

// @Module({
//   imports: [
//     JwtModule.register({
//       secret: 'your_secret_key',
//       signOptions: { expiresIn: '1h' },
//     }),
//     PrismaModule,
//   ],
//   providers: [AuthService, JwtStrategy],
//   controllers: [AuthController],
// })
// export class AuthModule {}
