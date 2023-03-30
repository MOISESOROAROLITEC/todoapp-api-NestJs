import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './interfaces/todos.interface';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
	constructor(private readonly todoService: TodosService) { }

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.todoService.findOne(id);
	}
	@Get()
	findAll(): Todo[] | NotFoundException {
		return this.todoService.getAll();
	}
	@Post()
	createOne(@Body() newTodo: CreateTodoDto): Todo {
		return this.todoService.createTodo(newTodo);
	}
	@Patch(":id")
	update(@Param("id") id: string, @Body() todo: CreateTodoDto): Todo | NotFoundException {
		return this.todoService.update(id, todo)
	}
	@Delete(":id")
	delet(@Param("id") id: string): { message: string, todo: Todo } | NotFoundException {
		return this.todoService.delete(id);
	}
}
