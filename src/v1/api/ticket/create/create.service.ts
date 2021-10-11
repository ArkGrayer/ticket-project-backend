import { TicketTypeEnum } from "v1/enum/ticket-type";
import { TicketRepository } from "../ticket.entity";
import { generateCode } from "./helpers/generate-code";

interface Injectables {
	ticketRepository: TicketRepository;
}

export interface CreateParams {
	code?: string;
	name: string;
	description: string;
	type: TicketTypeEnum;
	discountValue: number;
	expirationDate: Date;
}

export const create = async (
	{ ticketRepository }: Injectables,
	params: CreateParams,
) => {
	params.code = generateCode(params.code);

	const ticket = await ticketRepository.save(params);

	return ticket;
};
