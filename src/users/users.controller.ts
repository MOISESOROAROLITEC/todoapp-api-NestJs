import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupUserDto } from './dto/signup.dto';
import { LoginUserDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) { }

	@Post("/signup")
	signup(@Body() signupInfo: SignupUserDto) {
		return this.userService.createAcount(signupInfo)
	}
	@Post("/login")
	login(@Body() loginInfo: LoginUserDto) {
		console.log(loginInfo);
		return this.userService.connection(loginInfo)
	}
}
