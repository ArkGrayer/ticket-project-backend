import { userDataMock } from "tests/mocks/user";
import { register } from "v1/api/user/register/register.service";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import { sign } from "v1/utils/jwt/sign";

describe("register service", () => {
	const validEmail = "test@new.com";
	const validPassword = "fa98s7fa6";

	describe("Successful", () => {
		it("should return a authCode", async () => {
			let result: any;

			const user = await userDataMock.doc({
				email: validEmail,
				password: validPassword,
			});

			userDataMock.repository.save.mockResolvedValue(user);

			try {
				result = await register(
					{
						userRepository: userDataMock.repository,
					},
					{
						email: validEmail,
						password: validPassword,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				authCode: sign(user),
			});
		});
	});

	describe("Failure", () => {
		it("should throw a CustomError with a generic error message as a result of duplicated email", async () => {
			let result: any;

			const user = await userDataMock.doc({
				email: validEmail,
				password: validPassword,
			});

			userDataMock.repository.findOne.mockResolvedValue(user);

			try {
				result = await register(
					{
						userRepository: userDataMock.repository,
					},
					{
						email: validEmail,
						password: validPassword,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("Forbidden");
			expect(result.statusCode).toBe(StatusCodeEnum.FORBIDDEN);
		});
	});
});
