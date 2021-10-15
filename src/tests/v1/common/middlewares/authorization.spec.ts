import {
	authorizationMiddleware,
	setAuthorizationMiddleware,
} from "v1/common/middlewares/authorization";
import { CustomError } from "v1/utils/error";
import { StatusCodeEnum } from "v1/enum/status-code";
import { ObjectId } from "mongodb";
import { userDataMock } from "tests/mocks/user";
import { sign } from "v1/utils/jwt/sign";

describe("Authorization middleware", () => {
	const done = jest.fn();

	describe("setAuthorization middleware", () => {
		it("should define onRequest hook", () => {
			let result: any;

			const fastify = {
				addHook: jest.fn(),
			};

			try {
				result = setAuthorizationMiddleware(fastify as any, {}, done);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(fastify.addHook).toHaveBeenCalledWith(
				"onRequest",
				authorizationMiddleware,
			);
			expect(done).toHaveBeenCalled();
		});
	});

	describe("Successful", () => {
		it("shouldn't return any error", async () => {
			let result: any;
			const userDataMockDoc = await userDataMock.doc({
				id: "sadas76d758a",
				email: "test@test.com",
				password: "5656",
			});
			const token = sign(userDataMockDoc);
			const request = {
				headers: { authorization: `Bearer ${token}` },
			};

			try {
				const authorizationMiddlewareWithContext = authorizationMiddleware.bind(
					{} as any,
				);

				result = authorizationMiddlewareWithContext(
					request as any,
					{} as any,
					done,
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(done).toHaveBeenCalled();
			expect(done).toHaveBeenCalledWith();
		});
	});

	describe("Failure", () => {
		it("should throw a CustomError with a authorization required message", () => {
			let result: any;

			const request = {
				headers: { authorization: undefined },
			};

			try {
				const authorizationMiddlewareWithContext = authorizationMiddleware.bind(
					{} as any,
				);

				result = authorizationMiddlewareWithContext(
					request as any,
					{} as any,
					done,
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(done).toHaveBeenCalled();
			expect(done).toHaveBeenCalledWith(
				new CustomError(
					"authorization is a required header",
					StatusCodeEnum.FORBIDDEN,
				),
			);
		});

		it("should throw a CustomError with a invalid token pattern message", () => {
			let result: any;

			const request = {
				headers: { authorization: "af7saf58a7s5f" },
			};

			try {
				const authorizationMiddlewareWithContext = authorizationMiddleware.bind(
					{} as any,
				);

				result = authorizationMiddlewareWithContext(
					request as any,
					{} as any,
					done,
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(done).toHaveBeenCalled();
			expect(done).toHaveBeenCalledWith(
				new CustomError("Invalid token pattern", StatusCodeEnum.FORBIDDEN),
			);
		});

		it("should throw a CustomError with a invalid token message", () => {
			let result: any;

			const token = "ds8gf6ds9s";
			const request = {
				headers: { authorization: `Bearer ${token}` },
			};

			try {
				const authorizationMiddlewareWithContext = authorizationMiddleware.bind(
					{} as any,
				);

				result = authorizationMiddlewareWithContext(
					request as any,
					{} as any,
					done,
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(done).toHaveBeenCalled();
			expect(done).toHaveBeenCalledWith(
				new CustomError("Invalid token", StatusCodeEnum.FORBIDDEN),
			);
		});
	});
});
