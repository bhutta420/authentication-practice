import { AuthGuard } from '@app/core';
import { Controller, Get, Param, UseGuards, Version } from '@nestjs/common';
import { UsersService } from '../services';

@Controller({
  path: 'users',
})
export class UsersController {
  constructor(
    private usersService: UsersService
  ){}
  
  @Version('1')
  @UseGuards(AuthGuard)
  @Get(':id')
  findById(@Param('id') id: number){
    return this.usersService.getById(id)
  }
}