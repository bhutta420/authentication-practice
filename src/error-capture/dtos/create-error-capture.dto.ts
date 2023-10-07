import { 
  IsNotEmpty,
} from 'class-validator';

export class CreateErrorCaptureDto {
  @IsNotEmpty()
  domain: string;
  @IsNotEmpty()
  method: string;
  @IsNotEmpty()
  status: string;
  @IsNotEmpty()
  url: string;
  accountcode?: string;
}