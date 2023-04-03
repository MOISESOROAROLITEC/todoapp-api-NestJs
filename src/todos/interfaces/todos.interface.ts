import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("todos")
export class Todo {
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	title: string;
	@Column()
	description?: string;
	@Column("json", { nullable: true })
	done?: boolean;
}