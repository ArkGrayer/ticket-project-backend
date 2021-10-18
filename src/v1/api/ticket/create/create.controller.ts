import { getRepository } from "typeorm";
import { StatusCodeEnum } from "v1/enum/status-code";
import { Route } from "v1/types/route";
import { findByCode } from "../find-by-code/find-by-code.service";
import { TicketEntity } from "../ticket.entity";
import { create } from "./create.service";
import { validation } from "./create.validation";

export const createController: Route = async (request, reply) => {
	let result;

	try {
		const validatedParams = await validation(request.body as any);

		const ticketRepository = getRepository(TicketEntity);

		result = await create(
			{
				ticketRepository,
				findByCodeService: findByCode,
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
