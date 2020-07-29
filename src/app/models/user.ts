export class User {
    public id: string;
    public name: string;
    public firstName?: string;
    public lastName?: string;
    public role: string;
}
export class UserLogin {
    public isLoggedIn: boolean;
    public loggedInTime: Date;
    public user: User;
}
