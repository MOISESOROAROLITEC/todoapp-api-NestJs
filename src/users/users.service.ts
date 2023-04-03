import { Injectable } from '@nestjs/common';
import { SignupUserDto } from './dto/signup.dto';
import { LoginUserDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) { }

	createAcount(signupInfo: SignupUserDto) {
		const user = this.userRepo.create(signupInfo)
		return this.userRepo.save(user)
	}

	connection(loginInfo: LoginUserDto) {

	}
}
