import { Timestemp } from "src/timestemps/timestemp";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

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

	user_id: number;
}
