import { AuthGuard } from '@app/core';
import { Controller, Post, Body, Get, Param, Delete, HttpCode, HttpStatus, UseGuards, Put, Version } from '@nestjs/common';
import { CreateCORSAllowedDomainDto } from '../dtos';
import { CorsAllowedDomainService } from '../services';

@Controller({
  path: 'cors-allowed-domain'
})
export class CorsAllowedDomainController {
  constructor(private corsAllowedDomainService: CorsAllowedDomainService) {}
  
  @Version('1')
  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateCORSAllowedDomainDto) {
    return this.corsAllowedDomainService.create(body)
  }
  
  @Version('1')
  @UseGuards(AuthGuard)
  @Get()
  list() {
    return this.corsAllowedDomainService.list()
  }
  
  @Version('1')
  @UseGuards(AuthGuard)
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.corsAllowedDomainService.findById(id)
  }
  
  @Version('1')
  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() body: CreateCORSAllowedDomainDto) {
    return this.corsAllowedDomainService.update(id,body)
  }
  
  @Version('1')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.corsAllowedDomainService.remove(id)
  }
}
