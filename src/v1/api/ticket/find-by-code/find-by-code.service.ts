import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import { TicketRepository } from "../ticket.entity";

interface Injectables {
	ticketRepository: TicketRepository;
}

export interface FindByCodeParams {
	code: string;
}

export const findByCode = async (
	{ ticketRepository }: Injectables,
	{ code }: FindByCodeParams,
) => {
	const ticket = await ticketRepository.findOne({
		where: {
			code,
		},
	});

	if (!ticket) {
		throw new CustomError("Ticket not found", StatusCodeEnum.NOT_FOUND);
	}

	return ticket;
};

export type FindByCodeType = typeof findByCode;
