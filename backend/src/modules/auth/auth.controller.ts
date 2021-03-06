import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService, ITokenReturnBody } from './auth.service';
import { LoginPayload } from './payload/login.payload';
import { RegisterPayload } from './payload/register.payload';
import { ProfileService } from '../profile/profile.service';
import { Response } from 'express';

/**
 * Authentication Controller
 */
@ApiTags('authentication')
@Controller('api/auth')
export class AuthController {
  /**
   * Constructor
   * @param {AuthService} authService authentication service
   * @param {ProfileService} profileService profile service
   */
  constructor(
    private readonly authService: AuthService,
    private readonly profileService: ProfileService,
  ) {}

  /**
   * Login route to validate and create tokens for users
   * @param {LoginPayload} payload the login dto
   */
  @Post('login')
  @ApiResponse({ status: 201, description: 'Login Completed' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(
    @Body() payload: LoginPayload,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ITokenReturnBody> {
    const profile = await this.authService.validateUser(payload);
    const token = await this.authService.createToken(profile);
    response.cookie('token', token.token, { httpOnly: true });
    response.cookie('username', profile.username, { httpOnly: true });
    return token;
  }

  @Post('logout')
  @ApiResponse({ status: 201, description: 'Logout Completed' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async logout(@Res({ passthrough: true }) response: Response): Promise<void> {
    response.cookie('token', undefined, { httpOnly: true });
    response.cookie('username', undefined, { httpOnly: true });
  }

  /**
   * Authentication route to register
   * @param {RegisterPayload} payload the registration dto
   */
  @Post('register')
  @ApiResponse({ status: 201, description: 'Registration Completed' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(@Body() payload: RegisterPayload) {
    const profile = await this.profileService.create(payload);
    return await this.authService.createToken(profile);
  }
}
