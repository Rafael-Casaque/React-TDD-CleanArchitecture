import { InvalidFieldError } from "../email/email-validation";
import { MinLengthValidation } from "./min-length-validation";
import { faker } from "@faker-js/faker";

const makeSut = (): MinLengthValidation => new MinLengthValidation(faker.database.column(),5);

describe('MinLengthValidation', () => {
    test('should return error if value is invalid', () => {
        const sut = makeSut();
        const error = sut.validate(faker.random.alphaNumeric(5))
        expect(error).toEqual(new InvalidFieldError())
    });

    test('should return falsy if value is valid', () => {
        const sut = makeSut();
        const error = sut.validate(faker.random.alphaNumeric(7))
        expect(error).toBeFalsy()
    });
});