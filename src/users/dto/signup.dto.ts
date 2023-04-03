import { IsEmail, IsOptional, IsString } from "class-validator";

export class SignupUserDto {
	@IsString()
	name: string;

	@IsString()
	lastname: string;

	@IsString()
	@IsEmail()
	email: string;

	@IsOptional()
	@IsString()
	phonenumber: string;

	@IsString()
	password: string;
}