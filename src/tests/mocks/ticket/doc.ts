import { TicketTypeEnum } from "v1/enum/ticket-type";

export interface CreateDoc {
	code?: string;

	name: string;

	description: string;

	type: TicketTypeEnum;

	discountValue: number;

	expirationDate: Date;
}

export const doc = ({
	code,
	name,
	description,
	type,
	discountValue,
	expirationDate,
}: CreateDoc) => ({
	id: "A chiquinha, o quico, DIABO1",
	isValid: true,
	code: code || "JOÃO NINGUÉM",
	name,
	description,
	type,
	discountValue,
	expirationDate,
});
