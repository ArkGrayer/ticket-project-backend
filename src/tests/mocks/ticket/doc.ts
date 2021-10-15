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
	id: "af7asf87",
	isValid: true,
	code: code || "a90f8as09fa78",
	name,
	description,
	type,
	discountValue,
	expirationDate,
});
