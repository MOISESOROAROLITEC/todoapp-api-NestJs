import { IS_PHONE_NUMBER, IsEmail, IsOptional, isPhoneNumber, IsString } from "class-validator";

export class LoginUserDto {

	@IsString()
	@IsEmail()
	email: string;

	@IsString()
	password: string;
}