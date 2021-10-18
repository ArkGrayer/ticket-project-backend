import { encrypt } from "v1/utils/encrypt/encrypt";
import { ObjectId } from "mongodb";

export interface CreateDoc {
	id?: string;
	email: string;
	password: string;
}

export const doc = async ({ id, email, password }: CreateDoc) => ({
	id: new ObjectId(id),
	email,
	password: await encrypt(password),
});
