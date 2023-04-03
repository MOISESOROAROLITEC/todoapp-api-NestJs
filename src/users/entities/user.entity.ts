import { Timestemp } from "src/timestemps/timestemp";
import { Todo } from "src/todos/entities/todos.interface";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User extends Timestemp {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	lastname: string;

	@Column({
		unique: true
	})

	email?: string;

	@Column()
	phonenumber: string;

	@Column()
	password: string;

	@OneToMany(() => Todo, todo => todo.user)
	todos: Todo[];
}