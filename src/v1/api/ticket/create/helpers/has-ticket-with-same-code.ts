import { StatusCodeEnum } from "v1/enum/status-code";
import { FindByCodeType } from "../../find-by-code/find-by-code.service";
import { TicketRepository } from "../../ticket.entity";

interface HasTicketWithSameCodeParams {
	findByCodeService: FindByCodeType;
	ticketRepository: TicketRepository;
	code: string;
}

export const hasTicketWithSameCode = async ({
	ticketRepository,
	findByCodeService,
	code,
}: HasTicketWithSameCodeParams) => {
	try {
		await findByCodeService({ ticketRepository }, { code });

		return true;
	} catch (err: any) {
		if (err.statusCode === StatusCodeEnum.NOT_FOUND) {
			return false;
		}
		throw err;
	}
};
