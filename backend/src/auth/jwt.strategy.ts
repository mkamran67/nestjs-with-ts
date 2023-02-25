// strategy is an injectable class
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from './users.repository';
import { JwtPayload } from './types/jwt.payload.interface';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // Get the user from the DB -> need depedency injection

  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {
    // Derived classes need to implment super() method
    // The follow 2 options are required
    // the secretkey used to verify the JWT
    // and how it'll get the token
    super({
      secretOrKey: 'topsecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // This method will be called by Passport and we can add our own logic here
  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;

    const user = await this.usersRepository.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
