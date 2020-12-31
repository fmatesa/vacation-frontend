import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const higherThanValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null =>{
    const startDate = control.get('startDate')
    const endDate = control.get('endDate')

    return startDate && endDate && startDate.value > endDate.value ? {isHigher: true} : null; 
}
    
export const passIsEqualValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null =>{
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');

    return password && repeatPassword && password.value != repeatPassword.value ? {isNotEqual: true} : null; 
}