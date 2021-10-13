const DEFAULT = 1;
const ticketPerPage = 10;

export const paginateTickets = (page?: number) => {
	// Remove 1 from page index to start at 0
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const pageWithRightIndex = (page || DEFAULT) - 1;

	const ticketsToSkip = pageWithRightIndex * ticketPerPage;

	return ticketsToSkip;
};
