import { UserRepository } from "../user.entity";

interface HasUserWithTheSameEmail {
	userRepository: UserRepository;
	email: string;
}

export const hasUserWithTheSameEmail = async ({
	userRepository,
	email,
}: HasUserWithTheSameEmail) => {
	if (
		await userRepository.findOne({
			where: { email },
		})
	) {
		return true;
	}

	return false;
};
