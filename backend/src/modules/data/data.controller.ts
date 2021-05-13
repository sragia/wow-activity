import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ProfileService } from '../profile/profile.service';
import { IActivityResult } from './data.interface';
import { DataService } from './data.service';

@ApiBearerAuth()
@ApiTags('data')
@Controller('api/data')
export class DataController {
  constructor(
    private readonly dataService: DataService,
    private readonly profileService: ProfileService,
  ) {}

  @Get('activities')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Get Activities Request Received' })
  @ApiResponse({ status: 400, description: 'Get Activities Request Failed' })
  async getActivities(@Req() request: Request): Promise<IActivityResult[]> {
    const username = request.cookies.username;
    const profile = await this.profileService.getByUsername(username);

    return this.dataService.getProfileActivities(profile);
  }
}
