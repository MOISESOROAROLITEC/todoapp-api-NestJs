import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './interfaces/todos.interface';
import { title } from 'process';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
	todos: Todo[] = [
		{
			id: 0,
			title: "eat at home today",
			description: "I would eat at home",
			done: false
		},
		{
			id: 1,
			title: "play avatar game",
			description: "I would play avatar game",
			done: false
		},
		{
			id: 2,
			title: "Libation",
			description: "give water to the ancestor",
			done: true
		},
		{
			id: 3,
			title: "Whatch tutorial",
			description: "I would whatch tutorial",
			done: false
		},
		{
			id: 4,
			title: "go swim",
			description: "got to swim at beatch",
			done: false
		},
		{
			id: 5,
			title: 'create todo',
			description: 'wana create todo',
			done: false
		}
	];
	createNewIdForNewTodo(): number {
		let id: number = 0;
		this.todos.forEach(todo => {
			if (todo.id >= id)
				id = todo.id + 1;
		});
		return id;
	}
	catchBadRequest(todo: UpdateTodoDto) {
		const availableKeys: string[] = ["title", "description", "done"];
		Object.keys(todo).forEach(key => {
			if (!availableKeys.includes(key))
				throw new BadRequestException(`A todo have't '${key}' key. Available keys are : ${[...availableKeys]}`);
		});
	}
	getAll(): Todo[] | NotFoundException {
		if (this.todos.length == 0 || !this.todos) {
			throw new NotFoundException("Not find, todos list is empty");
		}
		return this.todos;
	}
	findOne(id: string): Todo | NotFoundException {
		const todo: Todo = this.todos.find(todo => todo.id.toString() == id);
		if (!todo) {
			throw new NotFoundException(`todo with id = ${id} can not find`);
		}
		return todo;
	}
	createTodo(todo: CreateTodoDto): Todo {
		this.catchBadRequest(todo);
		// todo.id = this.createNewIdForNewTodo()
		if (!todo.done) {
			todo.done = false;
		}

		const id = this.createNewIdForNewTodo()
		this.todos.push({ ...todo, id })
		return this.todos.find(el => el.id === id);
	}
	update(id: string, todo: UpdateTodoDto): Todo | NotFoundException {
		this.catchBadRequest(todo)
		const todoToUpdate: Todo = this.todos.find(todo => todo.id == +id);
		if (!todoToUpdate) {
			throw new NotFoundException(`todo with id = ${id} can not find`);
		}
		Object.keys(todo).forEach(key => {
			todoToUpdate[key] = todo[key];
		});

		const updatedTodo = this.todos.map(el => el.id === +id ? todoToUpdate : el);
		this.todos = [...updatedTodo];
		return todoToUpdate;
	}
	delete(id: string): { message: string, todo: Todo } | NotFoundException {
		let wantDelete: Todo;
		this.todos = this.todos.filter(todo => {
			if (todo.id === +id) {
				wantDelete = todo;
				return false
			} else {
				return true;
			}
		})
		if (!wantDelete)
			throw new NotFoundException(`todo with id = ${id} can't find`);
		return { message: "todo is deleted", todo: wantDelete };
	}
}
