import { Timestemp } from "src/timestemps/timestemp";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Todo extends Timestemp {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description?: string;

	@Column("boolean", { default: false })
	done?: boolean;

	@ManyToOne(() => User, user => user.todos)
	user: User;
}
