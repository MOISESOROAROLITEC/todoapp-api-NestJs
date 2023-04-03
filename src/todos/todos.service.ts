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

	getAll() {
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
