import { EmailValidation } from "./email-validation";
import { InvalidEmailError } from "@/validation/errors"
import { faker } from "@faker-js/faker";

describe('EmailValidation', () => {
    test('should return error if email is invalid', () => {
        const sut = new EmailValidation(faker.internet.email())    
        const error = sut.validate(faker.random.word())
        expect(error).toEqual(new InvalidEmailError())
    });

    test('should return falsy if email is invalid', () => {
        const sut = new EmailValidation(faker.internet.email())    
        const error = sut.validate(faker.internet.email())
        expect(error).toBeFalsy();
    });
});