import { ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';

export class FileLogger extends ConsoleLogger {
  private readonly logFile = 'app.log';
  constructor(context?: string) {
    super(context);
  }

  log(message: any, context?: string) {
    if(super.isLevelEnabled('log')){
      super.log(message, context);
      this.appendOnFile(message, context)
    }
  }

  error(message: any, trace?: string, context?: string) {
    if(super.isLevelEnabled('error')){
      super.error(message, trace, context);
      this.appendOnFile(message, context)
    }
  }

  warn(message: any, context?: string) {
    if(super.isLevelEnabled('warn')){
      super.warn(message, context);
      this.appendOnFile(message, context)
    }
  }

  debug(message: any, context?: string) {
    if(super.isLevelEnabled('debug')){
      super.debug(message, context);
      this.appendOnFile(message, context)
    }
  }

  verbose(message: any, context?: string) {
    if(super.isLevelEnabled('verbose')){
      super.verbose(message, context);
      this.appendOnFile(message, context)
    }
  }
  appendOnFile(message: any, context?: string){
    const stat = fs.statSync(this.logFile)
    if(stat.size>=200){
      fs.writeFileSync(this.logFile,'')
    }
    fs.appendFileSync(this.logFile, `[${new Date().toLocaleString()}] [${context}] ${message}\n`);
  }
}