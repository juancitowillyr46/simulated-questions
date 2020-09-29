export interface StorageInFirebase {
 uid: string;
 email: string;
 displayName: string;
 firstName: string;
 lastName: string;
 photoURL: string;
 emailVerified: boolean;
 role: string;
 active?: boolean;
 createdAt?: Date;
}

export interface CreateUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}