import { Controller, Post, Body } from '@nestjs/common';
import { AuthCredentialDto } from './auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
    await this.authService.signUp(authCredentialDto);
  }
}
