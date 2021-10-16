import { sign as signJwt } from "jsonwebtoken";
import { UserEntity } from "v1/api/user/user.entity";

export const sign = (userData: UserEntity) =>
	signJwt(
		{
			userId: userData.id.toString(),
		},
		process.env.JWT_PRIVATE_KEY as string,
	);
