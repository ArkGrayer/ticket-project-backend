import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import { TicketRepository } from "../ticket.entity";

interface Injectables {
	ticketRepository: TicketRepository;
}

export const countTickets = async ({ ticketRepository }: Injectables) => {
	const ticketsCount = await ticketRepository.count();

	return ticketsCount;
};
