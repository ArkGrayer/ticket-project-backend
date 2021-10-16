const DEFAULT = 1;
const ticketsPerPage = 10;

export const paginateTickets = (page?: number) => {
	// Remove 1 from the index of the page to start at 0.
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const pageWithRightIndex = (page || DEFAULT) - 1;

	const ticketsToSkip = pageWithRightIndex * ticketsPerPage;

	return ticketsToSkip;
};
