import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Version } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";
import { ErrorCaptureService } from "../services";
import { AuthGuard, IpAddress } from "@app/core";
import { CreateErrorCaptureDto, SyncErrorCaptureDto } from "../dtos";
@Controller({
  path: 'error-capture'
})
export class ErrorCaptureController {
  constructor(private errorCaptureService: ErrorCaptureService) {}
  
  @Version('1')
  @UseGuards(ThrottlerGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createErrorCaptur(@IpAddress() ip, @Body() body: CreateErrorCaptureDto){
    return this.errorCaptureService.createErrorCapture(body,ip)
  }
  
  @Version('1')
  @UseGuards(ThrottlerGuard)
  @Post('sync')
  @HttpCode(HttpStatus.CREATED)
  syncErrors(@IpAddress() ip, @Body() body: SyncErrorCaptureDto){
    return this.errorCaptureService.syncErrors(body.errors,ip)
  }
  
  @Version('1')
  @UseGuards(AuthGuard)
  @Get()
  listErrorCapture(){
    return this.errorCaptureService.listErrorCapture()
  }
  
  @Version('1')
  @UseGuards(AuthGuard)
  @Get('count')
  countByStatusCode(){
    return this.errorCaptureService.countByStatusCode()
  }
}