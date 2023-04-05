import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { APP_PIPE } from '@nestjs/core';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: () => ({
				type: 'postgres',
				host: process.env.DB_HOST,
				port: +process.env.DB_PORT,
				username: process.env.DB_USERNAME,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_NAME,
				autoLoadEntities: true,
				synchronize: true,
			})
		}),
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				DB_HOST: Joi.required(),
				DB_PORT: Joi.number().default(5432)
			})
		}),
		TodosModule,
		UsersModule,
	],
	controllers: [AppController],
	providers: [AppService,
		{
			provide: APP_PIPE,
			useClass: ValidationPipe
		}
	],
})
export class AppModule { }
