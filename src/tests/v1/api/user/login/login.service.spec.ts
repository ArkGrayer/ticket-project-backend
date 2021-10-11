import { login } from "v1/api/user/login/login.service";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";

describe("login service", () => {
	const validEmail = "test@test.com";
	const validPassword = "123";

	describe("Successful", () => {
		it("should return an authCode if the params are correct", () => {
			let result: any;

			try {
				result = login(undefined, {
					email: validEmail,
					password: validPassword,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				authCode: "foo",
			});
			expect(typeof result.authCode).toBe("string");
			expect(result.authCode).toHaveLength(3);
		});
	});

	describe("Invalid params", () => {
		it("should throw a CustomError with a Invalid Email message", () => {
			let result: any;

			try {
				result = login(undefined, {
					email: "testtest.com",
					password: validPassword,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("Invalid email");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a Invalid Password message", () => {
			let result: any;

			try {
				result = login(undefined, {
					email: validEmail,
					password: "5252",
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("Invalid password");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});
});
