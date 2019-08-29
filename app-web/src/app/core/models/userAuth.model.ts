export interface UserAuth {
 uid: string;
 email: string;
 displayName: string;
 photoURL: string;
 emailVerified: boolean;
 role: string;
 password?: string;
 active?: boolean;
 createdAt?: Date;
 assignedTests?: any[];
}
