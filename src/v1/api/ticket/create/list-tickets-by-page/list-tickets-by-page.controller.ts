import { getRepository } from "typeorm";
import { StatusCodeEnum } from "v1/enum/status-code";
import { Route } from "v1/types/route";
import { TicketEntity } from "../../ticket.entity";
import { listTicketByPage } from "./list-tickets-by-page.service";
import { validation } from "./list-tickets-by-page.validation";

export const listTicketByPageController: Route = async (request, reply) => {
	let result;

	try {
		const validatedParams = await validation(request.query as any);

		const ticketRepository = getRepository(TicketEntity);

		result = await listTicketByPage(
			{
				ticketRepository,
			},
			validatedParams,
		);
	} catch (err: any) {
		// eslint-disable-next-line no-console
		console.error(err);

		return reply.status(err.statusCode || StatusCodeEnum.INTERNAL).send({
			error: err.message,
		});
	}

	reply.send(result);
};
