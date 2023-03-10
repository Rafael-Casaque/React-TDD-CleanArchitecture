import { EmailValidation } from "./email-validation";
import { InvalidFieldError } from "@/validation/errors"
import { faker } from "@faker-js/faker";

const makeSut = (): EmailValidation => new EmailValidation(faker.database.column())

describe('EmailValidation', () => {
    test('should return error if email is invalid', () => {
        const sut = makeSut()
        const error = sut.validate(faker.random.word())
        expect(error).toEqual(new InvalidFieldError())
    });

    test('should return falsy if email is invalid', () => {
        const sut = makeSut()
        const error = sut.validate(faker.internet.email())
        expect(error).toBeFalsy();
    });
});