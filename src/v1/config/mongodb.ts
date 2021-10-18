import { createConnection } from "typeorm";
import { TicketEntity } from "v1/api/ticket/ticket.entity";
import { UserEntity } from "v1/api/user/user.entity";

// eslint-disable-next-line @typescript-eslint/naming-convention
const notIsPrd = process.env.NODE_ENV !== "production";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const connect = () =>
	createConnection({
		type: "mongodb",
		url: process.env.MONGODB_URL,
		synchronize: false,
		logging: notIsPrd,
		entities: [TicketEntity, UserEntity],
	});
