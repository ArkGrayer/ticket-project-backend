import { StatusCodeEnum } from "v1/enum/status-code";

export class CustomError extends Error {
	public statusCode: StatusCodeEnum;

	public constructor(message: string, statusCode: StatusCodeEnum) {
		super(message);
		this.statusCode = statusCode;
	}
}
