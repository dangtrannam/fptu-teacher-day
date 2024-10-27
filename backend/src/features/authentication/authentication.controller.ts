import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('register')
  register(@Body('username') username: string, @Body('password') password: string) {
    return this.authService.register(username, password);
  }

  @Post('login')
  login(@Body('username') username: string, @Body('password') password: string) {
    return this.authService.login(username, password);
  }

  @Post()
  create(@Body() createAuthenticationDto: CreateAuthenticationDto) {
    return this.authService.create(createAuthenticationDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthenticationDto: UpdateAuthenticationDto) {
    return this.authService.update(+id, updateAuthenticationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
