import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";

@Entity()
export class TicketEntity {
	@ObjectIdColumn({
		name: "_id",
	})
	public id: string;

	@Column()
	public code: string;

	@Column()
	public name: string;

	@Column()
	public description: string;

	@Column()
	public type: TicketTypeEnum;

	@Column()
	public discountValue: number;

	@Column()
	public expirationDate: Date;

	@Column({
		default: true,
	})
	public isValid: boolean;
}
