import { FieldValidationSpy } from "../test/mock-field-validation";
import { ValidationComposite } from "./validation-composite";

type SutTypes = {
    sut: ValidationComposite,
    fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
    const fieldValidationsSpy = [
        new FieldValidationSpy('any_field'),
        new FieldValidationSpy('any_field')
    ]        
    const sut = new ValidationComposite(fieldValidationsSpy)
    return{
        sut,
        fieldValidationsSpy
    }
}

describe('ValidationComposite', () => {
    test('should return error if any validation fails ', () => {
        const { sut, fieldValidationsSpy } = makeSut()
        fieldValidationsSpy[0].error = new Error('first_error_message')
        fieldValidationsSpy[1].error = new Error('second_error_message')
        const error = sut.validate('any_field', '1')
        expect(error).toBe('first_error_message')
    });
});