import { ObjectId } from "mongodb";
import { RepositoryKeys } from "tests/mocks/repository";
import { Column, Entity, ObjectIdColumn, Repository } from "typeorm";

@Entity()
export class UserEntity {
	@ObjectIdColumn({
		name: "_id",
	})
	public id: ObjectId;

	@Column()
	public email: string;

	@Column()
	public password: string;
}

export type UserRepository = Pick<Repository<UserEntity>, RepositoryKeys>;
