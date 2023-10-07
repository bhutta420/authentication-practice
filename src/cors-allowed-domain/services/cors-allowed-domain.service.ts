import { CorsAllowDomainEntity } from '@app/database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlAlreadyExitsException } from '../exceptions';

@Injectable()
export class CorsAllowedDomainService {
  constructor(
    @InjectRepository(CorsAllowDomainEntity) 
    private corsAllowDomainRepository: Repository<CorsAllowDomainEntity>
  ) {
    
  }
  async create(data: any){
    const record = await this.corsAllowDomainRepository.findOneBy({
      url: data.url
    })
    if(record) throw new UrlAlreadyExitsException()
    await this.corsAllowDomainRepository.save({
      url: data.url
    })
  }
  async list(){
    return this.corsAllowDomainRepository.find()
  }
  async findById(id){
    return this.corsAllowDomainRepository.findOneBy({
      id: id
    })
  }
  async update(id: number,data: any){
    return this.corsAllowDomainRepository.update({
      id: id
    },{
      url: data.url
    })
  }
  async remove(id: number){
    return this.corsAllowDomainRepository.delete({
      id: id,
    })
  }
}
