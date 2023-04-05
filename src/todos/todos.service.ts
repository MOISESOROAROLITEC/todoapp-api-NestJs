import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todos.interface';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async getAll() {
    return await this.todoRepository.find({
      relations: ['user'],
    });
  }
  async findOne(id: string) {
    const todo = await this.todoRepository.findOneBy({ id: +id });
    if (!todo) {
      throw new NotFoundException(`Todo #${id} is not found`);
    }
    return todo;
  }
  createTodo(createTodo: CreateTodoDto) {
    const todo = this.todoRepository.create(createTodo);
    return this.todoRepository.save(todo, {});
  }
  async update(id: string, updateTodo: UpdateTodoDto): Promise<Todo> {
    const todo = await this.todoRepository.preload({
      id: +id,
      ...updateTodo,
    });
    if (!todo) {
      throw new NotFoundException(`Todo #${id} is not found`);
    }
    return this.todoRepository.save(todo);
  }
  async delete(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id: +id });
    if (!todo) {
      throw new NotFoundException('');
    }
    return this.todoRepository.remove(todo);
  }
}
