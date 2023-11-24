import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // constructor() {
  //   super({
  //     jwtFromRequest: ExtractJwt.fromExtractors([
  //       JwtStrategy.extractJWT,
  //       ExtractJwt.fromAuthHeaderAsBearerToken(),
  //     ]),
  //     ignoreExpiration: false,
  //     secretOrKey: '39dkf93kdf032fD!kdfj3j2r3kdf@',
  //   });
  // }
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

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'authToken' in req.cookies) {
      return req.cookies.token;
    }
    return null;
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
