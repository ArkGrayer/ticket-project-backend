import { hash } from "bcrypt";

const SALT_ROUNDS = 10;

export const encrypt = (value: string) => hash(value, SALT_ROUNDS);
