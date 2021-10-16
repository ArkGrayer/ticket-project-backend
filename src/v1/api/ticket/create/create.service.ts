import { StatusCodeEnum } from "v1/enum/status-code";
import { TicketTypeEnum } from "v1/enum/ticket-type";
import { CustomError } from "v1/utils/error";
import { FindByCodeType } from "../find-by-code/find-by-code.service";
import { TicketRepository } from "../ticket.entity";
import { generateCode } from "./helpers/generate-code";
import { hasTicketWithSameCode } from "./helpers/has-ticket-with-same-code";

interface Injectables {
	ticketRepository: TicketRepository;
	findByCodeService: FindByCodeType;
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
	{ ticketRepository, findByCodeService }: Injectables,
	params: CreateParams,
) => {
	params.code = generateCode(params.code);

	if (
		await hasTicketWithSameCode({
			ticketRepository,
			findByCodeService,
			code: params.code as string,
		})
	) {
		throw new CustomError(
			"Ticket with same code already exist",
			StatusCodeEnum.CONFLICT,
		);
	}

	const ticket = await ticketRepository.save(params);

	return ticket;
};
