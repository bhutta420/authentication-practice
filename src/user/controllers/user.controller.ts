import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { UserService } from '../services';
import { JwtAuthGuard } from '@app/booting';

@Controller({
  path: 'user'
})
export class UserController {
  constructor(private userService: UserService){}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUsers(@Param('id') id: number, @Request() request: Request){
    console.log(request)
    return this.userService.getUserById(id)
  }
}