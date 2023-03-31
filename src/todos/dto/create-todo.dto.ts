import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTodoDto {
	@IsOptional()
	@IsNumber()
	id?: number;

	@IsString()
	title: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsOptional()
	@IsBoolean()
	done?: boolean;
}
