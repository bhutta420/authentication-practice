import { UserEntity } from "@app/database";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name)
  constructor(
    @InjectRepository(UserEntity) 
    private userRepository: Repository<UserEntity>
  ){

  }
  async getById(id){
    const user = await this.userRepository.findOneBy({
      id: id,
    })
    if(user) return {
      ...user,
      password: undefined,
    }
    else return null
  }
  async getUserByEmail(username=''){
    return this.userRepository.findOneBy({
      email: username,
    })
  }
}