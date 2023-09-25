import { UserEntity } from "@app/database";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {

  }
  async getUserById(id){
    return this.userRepository.findOneBy({
      id: id,
    })
  }

  async getUserByUserName(username: string){
    return this.userRepository.findOneBy({
      username: username,
    })
  }
}