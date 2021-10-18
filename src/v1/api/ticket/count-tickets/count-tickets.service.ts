import { TicketRepository } from "../ticket.entity";

interface Injectables {
	ticketRepository: TicketRepository;
}

export const countTickets = async ({ ticketRepository }: Injectables) => {
	const numberOfTickets = await ticketRepository.count();

	return numberOfTickets;
};
