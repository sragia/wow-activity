import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileService, IGenericMessageBody } from './profile.service';
import { PatchProfilePayload } from './payload/patch.profile.payload';
import { Profile } from './profile.entity';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

/**
 * Profile Controller
 */
@ApiBearerAuth()
@ApiTags('profile')
@Controller('api/profile')
export class ProfileController {
  /**
   * Constructor
   * @param profileService
   */
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Fetch Profile Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch Profile Request Failed' })
  async getSelfProfile(@Req() request: Request): Promise<Profile> {
    const username = request.cookies?.username;
    if (!username) {
      throw new BadRequestException(
        'The profile with that username could not be found.',
      );
    }
    const profile = await this.profileService.getByUsername(username);
    delete profile.password;
    return profile;
  }

  /**
   * Retrieves a particular profile
   * @param username the profile given username to fetch
   * @returns {Promise<Profile>} queried profile data
   */
  @Get(':username')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Fetch Profile Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch Profile Request Failed' })
  async getProfile(@Param('username') username: string): Promise<Profile> {
    const profile = await this.profileService.getByUsername(username);
    if (!profile) {
      throw new BadRequestException(
        'The profile with that username could not be found.',
      );
    }
    delete profile.password;
    return profile;
  }

  /**
   * Edit a profile
   * @param {RegisterPayload} payload
   * @returns {Promise<Profile>} mutated profile data
   */
  @Patch()
  @UseGuards(AuthGuard('jwt'))
  @UseRoles({
    resource: 'profiles',
    action: 'update',
    possession: 'any',
  })
  @ApiResponse({ status: 200, description: 'Patch Profile Request Received' })
  @ApiResponse({ status: 400, description: 'Patch Profile Request Failed' })
  async patchProfile(@Body() payload: PatchProfilePayload): Promise<Profile> {
    return await this.profileService.edit(payload);
  }

  /**
   * Removes a profile from the database
   * @param {string} username the username to remove
   * @returns {Promise<IGenericMessageBody>} whether or not the profile has been deleted
   */
  @Delete(':username')
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    resource: 'profiles',
    action: 'delete',
    possession: 'any',
  })
  @ApiResponse({ status: 200, description: 'Delete Profile Request Received' })
  @ApiResponse({ status: 400, description: 'Delete Profile Request Failed' })
  async delete(
    @Param('username') username: string,
  ): Promise<IGenericMessageBody> {
    return await this.profileService.delete(username);
  }
}
