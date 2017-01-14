export class LoginData {
    login: string;
    password: string;
    version: string;

    constructor(version: string, login?: string, password?: string){
        this.version = version;
        this.login = login;
        this.password = password;
    }
}