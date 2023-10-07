import { Controller, HttpCode, HttpStatus, Logger, Post, Request } from '@nestjs/common';
import { Body, UseGuards, Version } from '@nestjs/common/decorators';
import { ThrottlerGuard } from '@nestjs/throttler';
import { LoginDto, LogoutDto } from '../dtos';
import { AuthService } from '../services';

@Controller({
  path: 'auth'
})
export class AuthController {
  private readonly logger = new Logger(AuthController.name)
  constructor(
    private authService: AuthService,
  ){}

  @Version('1')
  @UseGuards(ThrottlerGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(
    @Body() body: LoginDto,
    @Request() req
    ){
    return this.authService.login(req)
  }
  
  @Version('1')
  @UseGuards(ThrottlerGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(
    @Body() body: LogoutDto,
    @Request() req,
  ){
    return this.authService.logout(req)
  }
}