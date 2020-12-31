export class Sender{
    startDate:string; 
    endDate:string;
    note:string;
    approved:boolean
    id:number;
    
    constructor(startDate: string, endDate:string, note:string, approved:boolean, id:number){
        this.startDate=startDate;
        this.endDate=endDate;
        this.note=note;
        this.approved=approved;
        this.id=id;
    }
}