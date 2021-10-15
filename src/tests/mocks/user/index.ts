import { makeMockRepository } from "../repository";
import { doc } from "./doc";

const repository = makeMockRepository();

export const userDataMock = {
	doc,
	repository,
};
