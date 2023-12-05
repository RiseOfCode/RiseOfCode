import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.authToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: '39dkf93kdf032fD!kdfj3j2r3kdf@',
    });
  }

  async validate(payload: any) {
    return { id: payload.id, nickname: payload.nickname };
  }
}
