import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todos.interface';

@Module({
	imports: [TypeOrmModule.forFeature([Todo])],
	providers: [TodosService],
	controllers: [TodosController]
})
export class TodosModule { }
