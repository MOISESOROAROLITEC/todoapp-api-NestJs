import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todos.interface';
import { TodosService } from './todos.service';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
	constructor(private readonly todoService: TodosService) { }

	@Get(":id")
	findOne(@Param("id") id: number) {
		return this.todoService.findOne("" + id);
	}
	@Get()
	findAll(): Promise<Todo[]> | NotFoundException {
		return this.todoService.getAll();
	}
	@Post()
	createOne(@Body() newTodo: CreateTodoDto) {
		return this.todoService.createTodo(newTodo);
	}
	@Patch(":id")
	update(@Param("id") id: string, @Body() todo: UpdateTodoDto): Promise<Todo> {
		return this.todoService.update(id, todo)
	}
	@Delete(":id")
	delet(@Param("id") id: string): Promise<Todo> {
		return this.todoService.delete(id);
	}
}
