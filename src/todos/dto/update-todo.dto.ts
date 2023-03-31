import { IsBoolean, IsNumber, IsString } from "class-validator";

export class UpdateTodoDto {
	@IsString()
	readonly title?: string;
	@IsString()
	readonly description?: string;
	@IsBoolean()
	readonly done?: boolean;
}