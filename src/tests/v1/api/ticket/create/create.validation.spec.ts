import { CreateParams } from "v1/api/ticket/create/create.service";
import { validation } from "v1/api/ticket/create/create.validation";
import { StatusCodeEnum } from "v1/enum/status-code";
import { TicketTypeEnum, TicketTypeValues } from "v1/enum/ticket-type";
import { CustomError } from "v1/utils/error";

describe("Create validation", () => {
	const validCode = "f1w3f";
	const validName = "generic";
	const validDescription = "tenso";
	const validType = TicketTypeEnum.PERCENTAGE;
	const validDiscountValue = 50;
	const validExpirationDate = new Date();

	describe("Successful validation", () => {
		it("should return a validated params", async () => {
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

	describe("Invalid Params", () => {
		it("should throw a CustomError with invalid type params message", async () => {
			let result: any;

			try {
				result = await validation({
					code: validCode,
					name: validName,
					description: validDescription,
					type: "type" as any,
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

		it("should throw a CustomError with a invalid ExpirationDate", async () => {
			let result: any;

			try {
				result = await validation({
					code: validCode,
					name: validName,
					description: validDescription,
					type: validType,
					discountValue: validDiscountValue,
					expirationDate: "asfasd" as any,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				'expirationDate must be a `date` type, but the final value was: `Invalid Date` (cast from the value `"asfasd"`).',
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	describe("Undefined params", () => {
		it("should throw a CustomError with a undefined name parameter", async () => {
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

		it("should throw a CustomError with a undefined description parameter", async () => {
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

		it("should throw a CustomError with a undefined type parameter", async () => {
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

		it("should throw a CustomError with a undefined discountValue parameter", async () => {
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

		it("should throw a CustomError with a undefined expirationDate parameter", async () => {
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

	describe("Invalid Type", () => {
		it("should throw a CustomError with a Invalid code type message", async () => {
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

		it("should throw a CustomError with a invalid name type message", async () => {
			let result: any;

			try {
				result = await validation({
					code: validCode,
					name: 425 as any,
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
				"name must be a `string` type, but the final value was: `425`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a invalid description type message", async () => {
			let result: any;

			try {
				result = await validation({
					code: validCode,
					name: validName,
					description: 4565 as any,
					type: validType,
					discountValue: validDiscountValue,
					expirationDate: validExpirationDate,
				});
			} catch (err) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"description must be a `string` type, but the final value was: `4565`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a Invalid type message", async () => {
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
			} catch (err) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"type must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a Invalid DiscountValue message", async () => {
			let result: any;

			try {
				result = await validation({
					code: validCode,
					name: validName,
					description: validDescription,
					type: validType,
					discountValue: "asfsad4" as any,
					expirationDate: validExpirationDate,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				'discountValue must be a `number` type, but the final value was: `"asfsad4"`.',
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a Invalid ExpirationDate message", async () => {
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
			} catch (err) {
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
