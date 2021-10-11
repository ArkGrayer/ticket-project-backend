import { getRepository } from "typeorm";
import { validation } from "v1/api/ticket/create/find-by-code/find-by-code.validation";
import { StatusCodeEnum } from "v1/enum/status-code";
import { Route } from "v1/types/route";
import { TicketEntity } from "../../ticket.entity";
import { findByCode } from "./find-by-code.service";

export const findByCodeController: Route = async (request, reply) => {
	let result;

	try {
		const validatedParams = await validation(request.query as any);

		const ticketRepository = getRepository(TicketEntity);

		result = await findByCode(
			{
				ticketRepository,
			},
			validatedParams,
		);
	} catch (err: any) {
		return reply.status(err.statusCode || StatusCodeEnum.INTERNAL).send({
			error: err.message,
		});
	}

	reply.send(result);
};
