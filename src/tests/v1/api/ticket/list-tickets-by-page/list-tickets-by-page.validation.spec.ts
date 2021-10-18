import { validation } from "v1/api/ticket/list-tickets-by-page/list-tickets-by-page.validation";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";

describe("listTicketsByPage validation", () => {
	const validPage = 1;

	describe("Successful", () => {
		it("should return validated params (with page number)", async () => {
			let result: any;

			try {
				result = await validation({
					page: validPage,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				page: validPage,
			});
		});

		it("should return validated params (without page)", async () => {
			let result: any;

			try {
				result = await validation({});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({});
		});

		it("should return validated params (with page string)", async () => {
			let result: any;

			try {
				result = await validation({
					page: String(validPage) as any,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				page: validPage,
			});
		});
	});

	describe("Invalid param", () => {
		it("should return a CustomError with a invalid param message", async () => {
			let result: any;

			try {
				result = await validation({
					page: -2,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("page must be greater than or equal to 1");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	describe("Invalid type", () => {
		it("should return a CustomError with a invalid page type message", async () => {
			let result: any;

			try {
				result = await validation({
					page: {} as any,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"page must be a `number` type, but the final value was: `NaN` (cast from the value `{}`).",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});
});
