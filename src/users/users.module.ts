import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Todo } from 'src/todos/entities/todos.interface';

@Module({
	imports: [TypeOrmModule.forFeature([User, Todo])],
	controllers: [UsersController],
	providers: [UsersService]
})
export class UsersModule { }

