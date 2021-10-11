import { StatusCodeEnum } from "v1/enum/status-code";
import { TicketTypeValues } from "v1/enum/ticket-type";
import { CustomError } from "v1/utils/error";
import * as yup from "yup";
import { CreateParams } from "./create.service";

const schema = yup.object().shape({
	code: yup.string().strict().notRequired(),
	name: yup.string().strict().required(),
	description: yup.string().strict().required(),
	type: yup.string().strict().required().oneOf(TicketTypeValues()),
	discountValue: yup.number().strict().required(),
	expirationDate: yup.date().required(),
});

export const validation = (params: CreateParams) =>
	schema.validate(params).catch(err => {
		throw new CustomError(err.errors.join("\n"), StatusCodeEnum.BAD_REQUEST);
	}) as Promise<CreateParams>;
