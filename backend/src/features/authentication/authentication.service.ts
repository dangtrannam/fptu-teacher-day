import { Injectable } from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/authentication.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({ username, password: hashedPassword });
    await createdUser.save();
    return { message: 'User registered successfully' };
  }

  async login(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username }).exec();
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username: user.username, sub: user._id };
      return { access_token: this.jwtService.sign(payload) };
    }
    return { message: 'Invalid credentials' };
  }

  create(createAuthenticationDto: CreateAuthenticationDto) {
    return 'This action adds a new authentication';
  }

  findAll() {
    return `This action returns all authentication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }

  update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    return `This action updates a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}
