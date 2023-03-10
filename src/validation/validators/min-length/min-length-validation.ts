import { ValidationStub } from "@/presentation/test";
import { FieldValidation } from "@/validation/protocols/field-validation";
import { InvalidFieldError } from "../email/email-validation";

export class MinLengthValidation implements FieldValidation {
    constructor(readonly field: string, private readonly minLength: number){}    
    validate(value: string): Error {        
        return (value.length > this.minLength || !value) ? null : new InvalidFieldError()
    }
}