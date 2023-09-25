import { JwtCustomService } from "@app/booting";
import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/services";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtCustomService: JwtCustomService,
  ) {

  }
  async validUser(username: string,password: string){
    const user = await this.userService.getUserByUserName(username)
    if(user && user.password == password) {
      return user
    }
    return null
  }
  async login(user){
    const token = await this.jwtCustomService.sign({
      user_id: user.id,
    })
    return {
      token: token,
    }
  }
}