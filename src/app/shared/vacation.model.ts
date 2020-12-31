export class Vacation{
    id: number;
    startDate: Date;
    endDate: Date;
    note: string;
    approved: boolean;

    constructor(startDate: Date, endDate: Date, note: string, aApproved:boolean, id?:number){
        this.id = id ? id : 0;
        this.startDate=startDate;
        this.endDate=endDate;
        this.note= note;
        this.approved=aApproved;
    }
}