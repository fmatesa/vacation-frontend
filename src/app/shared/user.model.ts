import { Vacation } from './vacation.model';

export class User{
    accountId: number;
    firstName: string;
    lastName: string;
    email: string;
    vacations: Vacation[];

    constructor(accountId: number, firstName: string, lastName: string, email: string, vacations: Vacation[]){
        this.accountId = accountId;
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.vacations=vacations;
    }
    
    
}