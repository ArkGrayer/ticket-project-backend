import { FindByCodeParams } from "v1/api/ticket/create/find-by-code/find-by-code.service";
import { validation } from "v1/api/ticket/create/find-by-code/find-by-code.validation";
import { StatusCodeEnum } from "v1/enum/status-code";
import { TicketTypeValues } from "v1/enum/ticket-type";
import { CustomError } from "v1/utils/error";

describe("findByCode validation", () => {
	const validCode = "fADFSW#$%5454654w3f";

	describe("Successful validation", () => {
		it("should return a validated params", async () => {
			let result: any;

			try {
				result = await validation({
					code: validCode,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				code: validCode,
			});
		});
	});

	describe("Undefined params", () => {
		it("should throw a CustomError with a undefined code parameter", async () => {
			let result: any;

			try {
				result = await validation({} as FindByCodeParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("code is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	describe("Invalid Type", () => {
		it("should throw a CustomError with a Invalid code type message", async () => {
			let result: any;

			try {
				result = await validation({
					code: 42 as any,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"code must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});
});
