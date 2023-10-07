import { AuthTokenEntity } from '@app/database';
import { Injectable, CanActivate, ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name)
  constructor(
    @InjectRepository(AuthTokenEntity) 
    private authTokenRepository: Repository<AuthTokenEntity>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ){}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwt = request.headers.authorization.replace('Bearer ', '');
    if(!jwt) {
      throw new UnauthorizedException('Invalid Token')
    }
    try {
      await this.jwtService.verifyAsync(jwt,{
        secret: this.configService.get('jwt.secret'),
        ignoreExpiration: false,
      })
      const record = await this.authTokenRepository.findOneBy({
        token: jwt
      })
      if(!record) throw new Error('Invalid Token')
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid Token')
    }
  }
}