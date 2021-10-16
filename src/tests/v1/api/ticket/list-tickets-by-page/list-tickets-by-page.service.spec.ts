import { ticketMock } from "tests/mocks/ticket";
import { paginateTickets } from "v1/api/ticket/list-tickets-by-page/helpers/paginate-tickets";
import { listTicketsByPage } from "v1/api/ticket/list-tickets-by-page/list-tickets-by-page.service";
import { StatusCodeEnum } from "v1/enum/status-code";
import { TicketTypeEnum } from "v1/enum/ticket-type";
import { CustomError } from "v1/utils/error";

describe("listTicketsByPage service", () => {
	const validPage = 1;

	let ticketMockDoc: any;

	beforeAll(() => {
		ticketMockDoc = ticketMock.doc({
			code: "897aada",
			name: "generic",
			description: "bla bla bla",
			type: TicketTypeEnum.PERCENTAGE,
			discountValue: 50,
			expirationDate: new Date(),
		});
	});

	describe("Successful", () => {
		it("should return an array of tickets", async () => {
			let result: any;

			ticketMock.repository.find.mockResolvedValue([ticketMockDoc]);

			try {
				result = await listTicketsByPage(
					{
						ticketRepository: ticketMock.repository,
					},
					{
						page: validPage,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual([ticketMockDoc]);
		});

		it("should return the array of tickets from the first page", async () => {
			let result: any;

			ticketMock.repository.find.mockResolvedValue([ticketMockDoc]);

			try {
				result = await listTicketsByPage(
					{
						ticketRepository: ticketMock.repository,
					},
					{},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual([ticketMockDoc]);
		});
	});

	describe("Failure", () => {
		it("should throw a CustomError with a No ticket found for this page message", async () => {
			let result: any;

			ticketMock.repository.find.mockResolvedValue([]);

			try {
				result = await listTicketsByPage(
					{
						ticketRepository: ticketMock.repository,
					},
					{
						page: 2,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("No ticket found for this page.");
			expect(result.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
		});
	});
});
