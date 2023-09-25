import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtCustomService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService
  ){}

  sign(payload){
    return this.jwtService.sign(payload,{
      secret: this.configService.get('jwt.secret'),
    })
  }
}