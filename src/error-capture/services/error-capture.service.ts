import { ErrorCaptureEntity } from '@app/database';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class ErrorCaptureService {
  private readonly logger = new Logger(ErrorCaptureService.name)
  constructor(
    @InjectRepository(ErrorCaptureEntity) 
    private errorCaptureRepository: Repository<ErrorCaptureEntity>,
    private configService: ConfigService
  ) {
    
  }
  async checkRecordCount(delete_records: number=1){
    const count = await this.errorCaptureRepository.count()
    this.logger.log(count)
    if(count>=this.configService.get('error_capture.limit')) {
      const records = await this.errorCaptureRepository.find({
        take: delete_records,
      }) 
      const ids = await records.map(i=>i.id)
      await this.errorCaptureRepository.delete({
        id: In(ids)
      })
    }
  }
  async createErrorCapture(data: any,ip){
    await this.checkRecordCount()
    await this.errorCaptureRepository.save({
      domain: data.domain,
      method: data.method,
      status: data.status,
      url: data.url,
      ip: ip,
      accountcode: data.accountcode
    })
  }
  async syncErrors(data: Array<any>,ip){
    await this.checkRecordCount(data.length)
    const new_records = data.map(i=>({
      domain: i.domain,
      method: i.method,
      status: i.status,
      url: i.url,
      ip: ip,
      accountcode: i.accountcode
    }))
    const entities = await this.errorCaptureRepository.create(new_records);
    await this.errorCaptureRepository.save(entities)
  }
  async listErrorCapture(){
    return this.errorCaptureRepository.find()
  }
  async countByStatusCode(){
    const count_500 = await this.errorCaptureRepository.countBy({
      status: '500'
    })
    const count_502 = await this.errorCaptureRepository.countBy({
      status: '502'
    })
    const count_total = await this.errorCaptureRepository.count()
    return {
      '500': count_500,
      '502': count_502,
      'total': count_total,
    }
  }
}
