export class Usuario {
    
    public id: string;
    public names: string;
    public lastNames: string;
    public email: string;
    public userName: string;
    public status: number;

    constructor(id: string, names: string, lastNames: string, email: string, userName: string, status: number) {
        this.id = id;
        this.names = names;
        this.lastNames = lastNames;
        this.email = email;
        this.userName = userName;
        this.status = status;
    }
}
