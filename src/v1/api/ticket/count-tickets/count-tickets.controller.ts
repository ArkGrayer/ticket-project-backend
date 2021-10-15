import { getRepository } from "typeorm";
import { StatusCodeEnum } from "v1/enum/status-code";
import { Route } from "v1/types/route";
import { TicketEntity } from "../ticket.entity";
import { countTickets } from "./count-tickets.service";

export const countTicketsController: Route = async (_request, reply) => {
	let result;

	try {
		const ticketRepository = getRepository(TicketEntity);

		result = await countTickets({
			ticketRepository,
		});
	} catch (err: any) {
		// eslint-disable-next-line no-console
		console.error(err);

		return reply.status(err.statusCode || StatusCodeEnum.INTERNAL).send({
			err: err.message,
		});
	}

	reply.send(result);
};
