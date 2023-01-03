import { InvalidFieldError } from "../email/email-validation";
import { MinLengthValidation } from "./min-length-validation";

describe('MinLengthValidation', () => {
    test('should return error if value is invalid', () => {
        const sut = new MinLengthValidation('field',5);
        const error = sut.validate('123')
        expect(error).toEqual(new InvalidFieldError())
    });

    test('should return falsy if value is valid', () => {
        const sut = new MinLengthValidation('field',5);
        const error = sut.validate('123456')
        expect(error).toBeFalsy()
    });
});