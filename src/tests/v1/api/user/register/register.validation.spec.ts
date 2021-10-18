import { RegisterParams } from "v1/api/user/register/register.service";
import { validation } from "v1/api/user/register/register.validation";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";

describe("register validation", () => {
	const validEmail = "test@new.com";
	const validPassword = "a87da98s6";

	describe("Successful", () => {
		it("should return validated params", async () => {
			let result: any;

			try {
				result = await validation({
					email: validEmail,
					password: validPassword,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				email: validEmail,
				password: validPassword,
			});
		});
	});

	describe("Invalid params", () => {
		it("should return a CustomError with a Invalid email message", async () => {
			let result: any;

			try {
				result = await validation({
					email: "a8r7a8r0ah",
					password: validPassword,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("email must be a valid email");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	describe("Undefined params", () => {
		it("should throw a CustomError with a undefined email param message", async () => {
			let result: any;

			try {
				result = await validation({
					password: validPassword,
				} as RegisterParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("email is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a undefined password param message", async () => {
			let result: any;

			try {
				result = await validation({
					email: validEmail,
				} as RegisterParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("password is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	describe("Invalid type", () => {
		it("should return a CustomError with a Invalid email type message", async () => {
			let result: any;

			try {
				result = await validation({
					email: 14914 as any,
					password: validPassword,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"email must be a `string` type, but the final value was: `14914`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a Invalid password type message", async () => {
			let result: any;

			try {
				result = await validation({
					email: validEmail,
					password: 110381 as any,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"password must be a `string` type, but the final value was: `110381`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});
});
