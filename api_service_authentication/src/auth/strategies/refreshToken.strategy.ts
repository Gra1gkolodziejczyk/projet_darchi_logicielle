import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { jwtConstants } from '../constant';
import { Request } from 'express';

type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.get('authorization')?.replace('Bearer', '').trim();

    if (!refreshToken) throw new ForbiddenException('Refresh token missing');

    return {
      userId: payload.sub,
      email: payload.email,
      refreshToken,
    };
  }
}
