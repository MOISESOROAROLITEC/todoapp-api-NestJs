import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
	imports: [TodosModule, TypeOrmModule.forRoot({
		type: 'postgres',
		host: 'localhost',
		port: 5432,
		username: "soro",
		password: "pass123",
		database: 'todo',
		autoLoadEntities: true,
		synchronize: true
	}), UsersModule,],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }