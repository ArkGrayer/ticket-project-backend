import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import { isEmptyArray } from "v1/utils/is-empty-array";
import { TicketRepository } from "../ticket.entity";
import { paginateTickets } from "./helpers/paginate-tickets";

interface Injectables {
	ticketRepository: TicketRepository;
}

export interface ListTicketsByPageParams {
	page?: number;
}

export const listTicketsByPage = async (
	{ ticketRepository }: Injectables,
	{ page }: ListTicketsByPageParams,
) => {
	const listOfTickets = await ticketRepository.find({
		skip: paginateTickets(page),
		take: 10,
	});

	if (isEmptyArray(listOfTickets)) {
		throw new CustomError(
			"No ticket found for this page.",
			StatusCodeEnum.NOT_FOUND,
		);
	}

	return listOfTickets;
};
