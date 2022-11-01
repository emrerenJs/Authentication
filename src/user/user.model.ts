import { getModelForClass, modelOptions, prop, Severity, pre, DocumentType } from "@typegoose/typegoose";
import { nanoid } from "nanoid";
import argon2 from 'argon2';
import {log} from '../utils/logger';

@pre<User>("save", async function () {  //  Hash password before creating an user.
    if(!this.isModified('password')) return;    // if password doesn't exist.

    const hash = await argon2.hash(this.password);
    this.password = hash;   //  give hashed pasword as new password
    return;
})
@modelOptions({
    schemaOptions: {
        timestamps: true // Auto create for Created At & Updated At columns
    },
    options: {
        allowMixed: Severity.ALLOW
    }
})
export class User {
    @prop({lowercase: true, required: true, unique: true})
    email: string;

    @prop({required: true})
    firstName: string;

    @prop({required: true})
    lastName: string;

    @prop({required: true})
    password: string;

    @prop({required: true, default: () => nanoid()})
    verificationCode: string;

    @prop({required: true})
    passwordResetCode: string | null;

    @prop()
    verified: boolean;

    async validatePassword(this: DocumentType<User>, candidatePassword: string) {
        try {
            return await argon2.verify(this.password, candidatePassword);
        } catch(err) {
            log.error(err, `Could not validate password`);
            return false;
        }
    }
}

const UserModel = getModelForClass(User);
export default UserModel;