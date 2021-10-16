import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import * as yup from "yup";
import { ListTicketsByPageParams } from "./list-tickets-by-page.service";

const schema = yup.object().shape({
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	page: yup.number().notRequired().min(1),
});

export const validation = (params: ListTicketsByPageParams) =>
	schema.validate(params).catch(err => {
		throw new CustomError(err.errors.join("\n"), StatusCodeEnum.BAD_REQUEST);
	}) as Promise<ListTicketsByPageParams>;
