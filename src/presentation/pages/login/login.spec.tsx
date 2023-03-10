import React from 'react'
import 'jest-localstorage-mock'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'
import Login from './login';
import { ValidationStub, AuthenticationSpy } from '@/presentation/test';
import { faker } from '@faker-js/faker';
import { InvalidCredentialsError } from '@/domain/errors';
import { BrowserRouter as Router } from 'react-router-dom';

type SutTypes = {
    sut: RenderResult
    authenticationSpy: AuthenticationSpy
}

type SutParams = {
    validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    const authenticationSpy = new AuthenticationSpy()
    validationStub.errorMessage = params?.validationError
    const sut = render(
        <Router>
            <Login validation={validationStub} authentication={authenticationSpy} />
        </Router>
    )
    return {
        sut,
        authenticationSpy
    }
}

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
    populateEmailField(sut, email)
    populatePasswordField(sut, password)
    const form = sut.getByTestId("form")
    fireEvent.submit(form)
    await waitFor(() => form)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
    const emailInput = sut.getByTestId("email")
    fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
    const passwordInput = sut.getByTestId("password")
    fireEvent.input(passwordInput, { target: { value: password } })
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const emailStatus = sut.getByTestId(`${fieldName}-status`)
    expect(emailStatus.title).toBe(validationError || 'Tudo certo!')
    expect(emailStatus.textContent).toBe(validationError ? "🔴" : "🟢")
}

const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(count)
}

const testElementExists = (sut: RenderResult, fieldName: string): void => {
    const element = sut.getByTestId(fieldName)
    expect(element).toBeTruthy()
}

const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
    const element = sut.getByTestId(fieldName)
    expect(element.textContent).toBe(text)
}

const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
    const button = sut.getByTestId(fieldName) as HTMLButtonElement
    expect(button.disabled).toBe(isDisabled)
}

describe('Login component', () => {
    afterEach(cleanup)
    beforeEach(() => {
        localStorage.clear()
    })
    test('Should start with initial state', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        testErrorWrapChildCount(sut, 0)
        testButtonIsDisabled(sut,'submit',true)
        testStatusForField(sut, 'email', validationError)
        testStatusForField(sut, 'password', validationError)
    });

    test('Should show email error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        populateEmailField(sut)
        testStatusForField(sut, 'email', validationError)
    })

    test('Should show password error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        populatePasswordField(sut)
        testStatusForField(sut, 'password', validationError)
    })

    test('Should show valid email state if validation succeeds', () => {
        const { sut } = makeSut()
        populateEmailField(sut)
        testStatusForField(sut, 'email')
    })

    test('Should show valid password state if validation succeeds', () => {
        const { sut } = makeSut()
        populatePasswordField(sut)
        testStatusForField(sut, 'password')
    })

    test('Should enable submit button if form is valid', () => {
        const { sut } = makeSut()
        populateEmailField(sut)
        populatePasswordField(sut)
        testButtonIsDisabled(sut, 'submit',false)        
    })

    test('Should show spinner on submit', () => {
        const { sut } = makeSut()
        simulateValidSubmit(sut)
        testElementExists(sut, "spinner")
    })

    test('Should call authentication with correct values', () => {
        const { sut, authenticationSpy } = makeSut()
        const email = faker.internet.email()
        const password = faker.internet.password()
        simulateValidSubmit(sut, email, password)
        expect(authenticationSpy.params).toEqual({
            email: email,
            password: password
        })
    })

    test('Should call authentication only once', () => {
        const { sut, authenticationSpy } = makeSut()
        simulateValidSubmit(sut)
        simulateValidSubmit(sut)
        expect(authenticationSpy.callsCount).toBe(1)
    })

    test('Should not call authentication if form is invalid', () => {
        const validationError = faker.random.words()
        const { sut, authenticationSpy } = makeSut({ validationError })
        populateEmailField(sut)
        fireEvent.submit(sut.getByTestId('form'))
        expect(authenticationSpy.callsCount).toBe(0)
    })

    test('Should present error if authentication fails', async () => {
        const { sut, authenticationSpy } = makeSut()
        const error = new InvalidCredentialsError
        jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
        await simulateValidSubmit(sut)
        await waitFor(() => {
            expect(sut.getByTestId('main-error')).toBeDefined();
        });
        testElementText(sut, 'main-error', error.message)
        testErrorWrapChildCount(sut, 1)
    })

    test('Should add accessToken to localtorage on success', async () => {
        const { sut, authenticationSpy } = makeSut()
        simulateValidSubmit(sut)
        await waitFor(() => {
            expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
        });
    })
})