export interface User {
    id: number;
    key: string;
    displayName: string,
    planAssigned: number;
    planDateExpiration: string;
    email: string;
    emailVerified: boolean;
    createdAt: string;
}