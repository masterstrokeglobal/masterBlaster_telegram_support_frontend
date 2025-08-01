import { AdminRole } from "./admin";


class User {
    id?: number;
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    phone?: string;
    role?:AdminRole;
    password?: string;
    googleId?: string;
    profileImage?: string;
    otpSecret?: string;
    isVerified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;

    constructor(params: Partial<User> = {}) {
        this.id = params.id;
        this.firstname = params.firstname;
        this.lastname = params.lastname;
        this.username = params.username;
        this.email = params.email;
        this.role = params.role;
        this.phone = params.phone;
        this.password = params.password;
        this.googleId = params.googleId;
        this.otpSecret = params.otpSecret;
        this.isVerified = params.isVerified;
        this.profileImage = params.profileImage;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
        this.deletedAt = params.deletedAt;
    }

    get name() {
        return `${this.firstname} ${this.lastname}`;
    }

}

export default User;
