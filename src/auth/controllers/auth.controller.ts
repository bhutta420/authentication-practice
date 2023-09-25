import { Controller, HttpCode, HttpStatus, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services';
import { LocalAuthGuard } from '../guards';

@Controller({
  path: 'auth'
})
export class AuthController {
  private readonly logger = new Logger(AuthController.name)
  constructor(
    private authService: AuthService,
  ){}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Request() req){
    this.logger.log(req)
    return this.authService.login(req.user)
  }
}