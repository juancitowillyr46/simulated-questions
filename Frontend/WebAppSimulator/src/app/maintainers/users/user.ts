export interface User {
    id: number;
    key: string;
    displayName: string,
    planAssigned: string;
    planDateExpiration: string;
    email: string;
    emailVerified: boolean;
    createdAt: string;
    role: string;
    categories: {key: string}[];
    settingLanguage: string;
}