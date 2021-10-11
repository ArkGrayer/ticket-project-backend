export interface MockRepository {
	find: jest.Mock;
	findOne: jest.Mock;
	findAndCount: jest.Mock;
	findByIds: jest.Mock;
	save: jest.Mock;
	insert: jest.Mock;
	update: jest.Mock;
	query: jest.Mock;
	delete: jest.Mock;
	count: jest.Mock;
	increment: jest.Mock;
}

export type RepositoryKeys = keyof MockRepository;

export const makeMockRepository = (): MockRepository => ({
	find: jest.fn(),
	findOne: jest.fn(),
	findAndCount: jest.fn(),
	findByIds: jest.fn(),
	save: jest.fn(),
	insert: jest.fn(),
	update: jest.fn(),
	query: jest.fn(),
	delete: jest.fn(),
	count: jest.fn(),
	increment: jest.fn(),
});
