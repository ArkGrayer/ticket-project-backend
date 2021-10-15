import { ticketMock } from "tests/mocks/ticket";
import { findByCode } from "v1/api/ticket/find-by-code/find-by-code.service";
import { StatusCodeEnum } from "v1/enum/status-code";
import { TicketTypeEnum } from "v1/enum/ticket-type";
import { CustomError } from "v1/utils/error";

describe("findByCode service", () => {
	const validCode = "aa0d8a";

	let ticketMockDoc: any;

	beforeAll(() => {
		ticketMockDoc = ticketMock.doc({
			code: validCode,
			name: "generic",
			description: "bla bla bla",
			type: TicketTypeEnum.PERCENTAGE,
			discountValue: 50,
			expirationDate: new Date(),
		});
	});

	describe("Successful", () => {
		it("should return a ticket", async () => {
			let result: any;

			ticketMock.repository.findOne.mockResolvedValue(ticketMockDoc);

			try {
				result = await findByCode(
					{
						ticketRepository: ticketMock.repository,
					},
					{
						code: validCode,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual(ticketMockDoc);
		});
	});

	describe("Failure", () => {
		it("should throw a CustomError with a Ticket not found message", async () => {
			let result: any;

			ticketMock.repository.findOne.mockResolvedValue(undefined);

			try {
				result = await findByCode(
					{
						ticketRepository: ticketMock.repository,
					},
					{
						code: validCode,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("Ticket not found");
			expect(result.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
		});
	});
});
