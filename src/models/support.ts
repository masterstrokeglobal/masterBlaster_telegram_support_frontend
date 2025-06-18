 export enum SupportStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed",
  }
  
  export type Merchant = {
    id: number;
    name: string;
    email: string;
    role: string;
    companyName: string;
    companyAddress: string;
    companyGSTNumber: string | null;
    platformFeePercentage: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  };
  
  export class SupportQuery {
    id!: number;
    accountId?: string;
    accountInfo?: string;
    status!: SupportStatus;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;
    merchant!: Merchant;
    payerName!: string;
    image?: { type: "Buffer"; data: number[] };
    comment?: string;
  
    constructor(data: Partial<SupportQuery>) {
      Object.assign(this, data);
    }
  }
  