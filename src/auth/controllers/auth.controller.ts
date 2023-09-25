import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services';
import { LocalAuthGuard } from '../guards';

@Controller({
  path: 'auth'
})
export class AuthController {
  constructor(
    private authService: AuthService
  ){}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Request() req){
    return this.authService.login(req.user)
  }
}