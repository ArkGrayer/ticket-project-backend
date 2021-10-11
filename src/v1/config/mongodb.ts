import { createConnection } from "typeorm";
import { TicketEntity } from "v1/api/ticket/ticket.entity";

const { NODE_ENV } = process.env;

// eslint-disable-next-line @typescript-eslint/naming-convention
const notIsPrd = NODE_ENV !== "production";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const connect = () =>
	createConnection({
		type: "mongodb",
		url: process.env.MONGODB_URL,
		synchronize: false,
		logging: notIsPrd,
		entities: [TicketEntity],
	});
