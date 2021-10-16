import { CreateParams } from "v1/api/ticket/create/create.service";
import { validation } from "v1/api/ticket/create/create.validation";
import { StatusCodeEnum } from "v1/enum/status-code";
import { TicketTypeEnum, TicketTypeValues } from "v1/enum/ticket-type";
import { CustomError } from "v1/utils/error";

describe("create validation", () => {
	const validCode = "aa0d8a";
	const validName = "generic";
	const validDescription = "bla bla bla";
	const validType = TicketTypeEnum.PERCENTAGE;
	const validDiscountValue = 50;
	const validExpirationDate = new Date();

	describe("Successful", () => {
		it("should return validated params", async () => {
			let result: any;

			try {
				result = await validation({
					code: validCode,
					name: validName,
					description: validDescription,
					type: validType,
					discountValue: validDiscountValue,
					expirationDate: validExpirationDate,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				code: validCode,
				name: validName,
				description: validDescription,
				type: validType,
				discountValue: validDiscountValue,
				expirationDate: validExpirationDate,
			});
		});

		it("should return validated params without code", async () => {
			let result: any;

			try {
				result = await validation({
					name: validName,
					description: validDescription,
					type: validType,
					discountValue: validDiscountValue,
					expirationDate: validExpirationDate,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				name: validName,
				description: validDescription,
				type: validType,
				discountValue: validDiscountValue,
				expirationDate: validExpirationDate,
			});
		});
	});

	describe("Invalid params", () => {
		it("should throw a CustomError with invalid type param message", async () => {
			let result: any;

			try {
				result = await validation({
					code: validCode,
					name: validName,
					description: validDescription,
					type: "test" as any,
					discountValue: validDiscountValue,
					expirationDate: validExpirationDate,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				`type must be one of the following values: ${TicketTypeValues().join(
					", ",
				)}`,
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a invalid expirationDate param message", async () => {
			let result: any;

			try {
				result = await validation({
					code: validCode,
					name: validName,
					description: validDescription,
					type: validType,
					discountValue: validDiscountValue,
					expirationDate: "fa8s97f" as any,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				'expirationDate must be a `date` type, but the final value was: `Invalid Date` (cast from the value `"fa8s97f"`).',
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	describe("Undefined params", () => {
		it("should throw a CustomError with a undefined name param message", async () => {
			let result: any;

			try {
				result = await validation({
					code: validCode,
					description: validDescription,
					type: validType,
					discountValue: validDiscountValue,
					expirationDate: validExpirationDate,
				} as CreateParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("name is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a undefined description param message", async () => {
			let result: any;

			try {
				result = await validation({
					code: validCode,
					name: validName,
					type: validType,
					discountValue: validDiscountValue,
					expirationDate: validExpirationDate,
				} as CreateParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("description is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a undefined type param message", async () => {
			let result: any;

			try {
				result = await validation({
					code: validCode,
					name: validName,
					description: validDescription,
					discountValue: validDiscountValue,
					expirationDate: validExpirationDate,
				} as CreateParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("type is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a undefined discountValue param message", async () => {
			let result: any;

			try {
				result = await validation({
					code: validCode,
					name: validName,
					description: validDescription,
					type: validType,
					expirationDate: validExpirationDate,
				} as CreateParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("discountValue is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a undefined expirationDate param message", async () => {
			let result: any;

			try {
				result = await validation({
					code: validCode,
					name: validName,
					description: validDescription,
					type: validType,
					discountValue: validDiscountValue,
				} as CreateParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("expirationDate is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	describe("Invalid type", () => {
		it("should return a CustomError with a invalid code type message", async () => {
			let result: any;

			try {
				result = await validation({
					code: 42 as any,
					name: validName,
					description: validDescription,
					type: validType,
					discountValue: validDiscountValue,
					expirationDate: validExpirationDate,
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

		it("should return a CustomError with a invalid name type message", async () => {
			let result: any;

			try {
				result = await validation({
					code: validCode,
					name: 42 as any,
					description: validDescription,
					type: validType,
					discountValue: validDiscountValue,
					expirationDate: validExpirationDate,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"name must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a invalid description type message", async () => {
			let result: any;

			try {
				result = await validation({
					code: validCode,
					name: validName,
					description: 42 as any,
					type: validType,
					discountValue: validDiscountValue,
					expirationDate: validExpirationDate,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"description must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a invalid type message", async () => {
			let result: any;

			try {
				result = await validation({
					code: validCode,
					name: validName,
					description: validDescription,
					type: 42 as any,
					discountValue: validDiscountValue,
					expirationDate: validExpirationDate,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"type must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a invalid discountValue type message", async () => {
			let result: any;

			try {
				result = await validation({
					code: validCode,
					name: validName,
					description: validDescription,
					type: validType,
					discountValue: "test" as any,
					expirationDate: validExpirationDate,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				'discountValue must be a `number` type, but the final value was: `"test"`.',
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a invalid expirationDate type message", async () => {
			let result: any;

			try {
				result = await validation({
					code: validCode,
					name: validName,
					description: validDescription,
					type: validType,
					discountValue: validDiscountValue,
					expirationDate: {} as any,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"expirationDate must be a `date` type, but the final value was: `Invalid Date` (cast from the value `{}`).",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});
});
