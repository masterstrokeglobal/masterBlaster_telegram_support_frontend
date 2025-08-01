
export enum AdminRole {
    SUPER_ADMIN = "admin",
    Merchant = "merchant",
    AGENT = "agent",
    EMPLOYEE = "employee",
}

interface AdminParams {
    id?: number;
    name?: string;
    email?: string;
    referenceCode?: string;
    password?: string;
    role?: AdminRole;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    firstname?: string;
    lastname?: string;
}

class Admin {
    id?: number;
    name?: string;
    email?: string;
    referenceCode?: string;
    password?: string;
    role?: AdminRole;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;

    constructor(params: AdminParams = {}) {
        this.id = params.id;
        this.name = params.name;
        this.email = params.email;
        this.password = params.password;
        this.role = params.role;
        this.referenceCode = params.referenceCode;
        this.createdAt = params.createdAt ? new Date(params.createdAt) : undefined;
        this.updatedAt = params.updatedAt ? new Date(params.updatedAt) : undefined;
        this.deletedAt = params.deletedAt ? new Date(params.deletedAt) : undefined;

        // Handle name composition from firstname and lastname
        if (params.firstname || params.lastname) {
            this.name = `${params.firstname || ''} ${params.lastname || ''}`.trim();
        }
    }

    get isSuperAdmin(): boolean {
        return this.role === AdminRole.SUPER_ADMIN;
    }

    get isMerchant(): boolean {
        return this.role === AdminRole.Merchant;
    }

    get isAgent(): boolean {
        return this.role === AdminRole.AGENT;
    }
}

export default Admin;