import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SignupUserDto } from './dto/signup.dto';
import { LoginUserDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Todo } from 'src/todos/entities/todos.interface';
import { CreateTodoDto } from 'src/todos/dto/create-todo.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private readonly userRepo: Repository<User>,
		@InjectRepository(Todo) private readonly todoRepo: Repository<Todo>,
	) { }

	createAcount(signupInfo: SignupUserDto) {
		const user = this.userRepo.create(signupInfo);
		return this.userRepo.save(user);
	}

	async connection({ email, password }: LoginUserDto): Promise<User> {
		const user = await this.userRepo.findOneBy({ email, password });
		if (!user) {
			throw new NotFoundException(`user with email : ${email} not found`);
		}
		return user;
	}
	async createTodo(userId: string, createTodoDto: CreateTodoDto) {
		if (!+userId || +userId < 0) {
			throw new BadRequestException(`user id must be a positive number`);
		}
		const user = await this.userRepo.findOneBy({ id: +userId });
		if (!user) {
			throw new NotFoundException(`user with id : ${userId} is not found`);
		}
		const todo = this.todoRepo.create({ ...createTodoDto, user });
		return await this.todoRepo.save(todo);
	}
	getUsers() {
		return this.userRepo.find();
	}
}
