import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schema/User.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,private jwtService: JwtService
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { name, email, password, address } = signUpDto;
   const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      address,
    });
    const payload = { username: user.name, sub: user.email };
    return ({ accessToken: this.jwtService.sign(payload) });

    return { user };
  }

  async login(loginDto: LoginDto) {
    const { email, password, address } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = { username: user.name, sub: user.email };
    return ({ accessToken: this.jwtService.sign(payload) });
    
  }


  async findAll() {
    return this.userModel.find()
      .exec();
  }
}