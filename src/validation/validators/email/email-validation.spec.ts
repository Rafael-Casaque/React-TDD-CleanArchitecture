import { EmailValidation } from "./email-validation";
import { InvalidEmailError } from "@/validation/errors"

describe('EmailValidation', () => {
    test('should return error if email is invalid', () => {
        const sut = new EmailValidation('email')    
        const error = sut.validate('email')
        expect(error).toEqual(new InvalidEmailError())
    });
});