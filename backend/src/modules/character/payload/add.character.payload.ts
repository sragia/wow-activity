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
  @IsNotEmpty()
  name: string;

  /**
   * Character Realm
   */
  @ApiProperty({
    required: true,
  })
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
