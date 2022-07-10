export interface IRegistrationRequest{
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    active: boolean;
}


export interface ILoginRequest{
    username: string;
    password: string;
}