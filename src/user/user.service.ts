import UserModel, { User } from "./user.model";

export const createUser = (user: Partial<User>) => {
    return UserModel.create(user);
}