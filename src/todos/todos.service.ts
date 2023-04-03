import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todos.interface';
import { title } from 'process';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { log } from 'console';

@Injectable()
export class TodosService {
	constructor(
		@InjectRepository(Todo)
		private readonly todoRepository: Repository<Todo>,
	) { }

	// createNewIdForNewTodo(): number {
	// 	let id: number = 0;
	// 	this.todos.forEach(todo => {
	// 		if (todo.id >= id)
	// 			id = todo.id + 1;
	// 	});
	// 	return id;
	// }
	// catchBadRequest(todo: UpdateTodoDto) {
	// 	const availableKeys: string[] = ["title", "description", "done"];
	// 	Object.keys(todo).forEach(key => {
	// 		if (!availableKeys.includes(key))
	// 			throw new BadRequestException(`A todo have't '${key}' key. Available keys are : ${[...availableKeys]}`);
	// 	});
	// }

	getAll()/* : Todo[] | NotFoundException */ {
		return this.todoRepository.find()
	}
	async findOne(id: string) {
		const todo = await this.todoRepository.findOneBy({ id: +id });
		if (!todo) {
			throw new NotFoundException(`Todo #${id} is not found`);
		}
		return todo;
	}
	createTodo(createTodo: CreateTodoDto): Promise<Todo> {
		const todo = this.todoRepository.create(createTodo);
		return this.todoRepository.save(todo);
	}
	async update(id: string, updateTodo: UpdateTodoDto): Promise<Todo> {
		const todo = await this.todoRepository.preload({
			id: +id,
			...updateTodo,
		})
		if (!todo) {
			throw new NotFoundException(`Todo #${id} is not found`);
		}
		return this.todoRepository.save(todo);
	}
	async delete(id: string): Promise<Todo> {
		const todo = await this.todoRepository.findOneBy({ id: +id })
		if (!todo) {
			throw new NotFoundException("")
		}
		return this.todoRepository.remove(todo);
	}
}
