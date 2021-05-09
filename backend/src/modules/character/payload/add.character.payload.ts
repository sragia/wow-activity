import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsAlphanumeric,
  Matches,
} from 'class-validator';

/**
 * Patch Profile Payload Class
 */
export class AddCharacterPayload {
  /**
   * Character Name
   */
  @ApiProperty()
  @IsAlphanumeric()
  @IsNotEmpty()
  name: string;

  /**
   * Character Realm
   */
  @ApiProperty({
    required: true,
  })
  @IsAlphanumeric()
  @IsNotEmpty()
  realm: string;


  /**
   * Character Realm
   */
  @ApiProperty({
    required: false,
  })
  region: 'eu' | 'us';
}
