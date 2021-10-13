import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import { TicketRepository } from "../../ticket.entity";
import { paginateTickets } from "./helpers/paginate-tickets";

interface Injectables {
	ticketRepository: TicketRepository;
}

export interface ListTicketByPageParams {
	page?: number;
}

export const listTicketByPage = async (
	{ ticketRepository }: Injectables,
	{ page }: ListTicketByPageParams,
) => {
	const listOfTickets = await ticketRepository.find({
		skip: paginateTickets(page),
		take: 10,
	});

	if (!listOfTickets.length) {
		throw new CustomError(
			"No tickets found for this page",
			StatusCodeEnum.NOT_FOUND,
		);
	}

	return listOfTickets;
};
