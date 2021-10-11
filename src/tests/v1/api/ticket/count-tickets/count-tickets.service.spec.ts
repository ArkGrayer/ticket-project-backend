import { ticketMock } from "tests/mocks/ticket";
import { countTickets } from "v1/api/ticket/count-tickets/count-tickets.service";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";

describe("TicketCounts service", () => {
	describe("Successful", () => {
		it("should return a number", async () => {
			let result: any;

			ticketMock.repository.count.mockResolvedValue(1);

			try {
				result = await countTickets({
					ticketRepository: ticketMock.repository,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual(1);
		});
	});
});
