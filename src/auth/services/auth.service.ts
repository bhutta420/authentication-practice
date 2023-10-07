import { Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthTokenEntity } from "@app/database";
import { Repository } from "typeorm";
import { EncryptionsServices } from "@app/core";
import { UsersService } from "src/users";
import { InvalidUsernameOrPasswordException } from "../exceptions";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private encryptionsServices: EncryptionsServices,
    @InjectRepository(AuthTokenEntity) 
    private authTokenRepository: Repository<AuthTokenEntity>
  ) {
    
  }
  async login(request){
    const { username, password } = request.body
    const user = await this.usersService.getUserByEmail(username)
    if(!user) throw new InvalidUsernameOrPasswordException()
    const matched = await this.encryptionsServices.encryptCompare(password,user.password)
    if(!matched) throw new InvalidUsernameOrPasswordException()
    const token = await this.jwtService.sign({
      user_id: user.id,
    },{
      secret: this.configService.get('jwt.secret'),
      expiresIn: this.configService.get('jwt.expire')
    })
    await this.authTokenRepository.save({
      token: token
    })
    return {
      token: token,
    }
  }
  async logout(request){
    const { token } = request.body
    const record = await this.authTokenRepository.findOneBy({
      token: token
    })
    if(record) {
      await record.remove()
      return {
        message: 'revoked'
      }
    } else {
      return {
        message: 'Invalid Token'
      }
    }
  }
}