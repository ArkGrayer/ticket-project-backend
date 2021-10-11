import { Column, Entity, ObjectIdColumn, Repository } from "typeorm";
import { ObjectId } from "mongodb";
import { TicketTypeEnum } from "v1/enum/ticket-type";
import { RepositoryKeys } from "tests/mocks/repository";

@Entity()
export class TicketEntity {
	@ObjectIdColumn({
		name: "_id",
	})
	public id: ObjectId;

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

export type TicketRepository = Pick<Repository<TicketEntity>, RepositoryKeys>;
