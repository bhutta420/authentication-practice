import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class LocalStratergy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('jwt.secret'),
    });
  }
  async validate(username: string, password: string){
    const user = await this.authService.validUser(username,password)
    if(!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}