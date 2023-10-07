import { 
  IsNotEmpty,
  IsUrl,
} from 'class-validator';

export class CreateCORSAllowedDomainDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;
}