import { Validation } from "@/presentation/protocols/validation";
import { FieldValidation } from "@/validation/protocols/field-validation";
import { FieldValidationSpy } from "../test/mock-field-validation";
import { ValidationComposite } from "./validation-composite";

describe('ValidationComposite', () => {
    test('should return error if any validation fails ', () => {
        const fieldValidationSpy = new FieldValidationSpy('any_field')
        fieldValidationSpy.error = new Error('first_error_message')
        const fieldValidationSpy2 = new FieldValidationSpy('any_field')
        fieldValidationSpy2.error = new Error('second_error_message')
        const sut = new ValidationComposite([
            fieldValidationSpy,
            fieldValidationSpy2
        ])
        const error = sut.validate('any_field','1')
        expect(error).toBe('first_error_message')
    });
});