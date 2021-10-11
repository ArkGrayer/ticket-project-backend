export enum TicketTypeEnum {
	RAW = "RAW",
	PERCENTAGE = "PERCENTAGE",
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TicketTypeValues = () =>
	[...new Set(Object.values(TicketTypeEnum))] as Array<TicketTypeEnum>;
