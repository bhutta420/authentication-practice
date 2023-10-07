import { 
  IsNotEmpty,
} from 'class-validator';
import { CreateCORSAllowedDomainDto } from 'src/cors-allowed-domain/dtos';

export class SyncErrorCaptureDto {
  @IsNotEmpty()
  errors: Array<CreateCORSAllowedDomainDto>
}