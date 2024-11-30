"use strict";
// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// @Injectable()
// export class SessionGuard extends AuthGuard('session') {
//   canActivate(context: ExecutionContext): boolean | Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     if (request.isAuthenticated && request.isAuthenticated()) {
//       return true;
//     }
//     throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
//   }
// }
