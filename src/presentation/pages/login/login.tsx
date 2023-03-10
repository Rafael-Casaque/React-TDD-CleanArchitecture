import React, { useState, useEffect } from "react";
import Styles from "./login-styles.scss";
import { Header, Footer, Input, FormStatus } from "../../components"
import Context from "@/presentation/components/contexts/form/form-context"
import { Validation } from "../../protocols/validation";
import { Authentication } from "@/domain/usecases";
import { Link } from "react-router-dom";

type Props = {
    validation: Validation
    authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {

    const [state, setState] = useState({
        isLoading: false,
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        mainError: '',
    })

    useEffect(() => {
        if (validation != undefined) {
            setState({
                ...state,
                emailError: validation.validate('email', state.email),
                passwordError: validation.validate('password', state.password)
            })
        }
    }, [state.email, state.password])

    const handleSubmit = async (evnt: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            if (state.isLoading || state.emailError || state.passwordError) {
                return
            }
            setState({
                ...state,
                isLoading: true
            })
            const account = await authentication.auth({
                email: state.email,
                password: state.password
            })
            localStorage.setItem('accessToken',account.accessToken)
        }
        catch (error) {
            setState({
                ...state,
                isLoading: false,
                mainError: error.message
            })
        }
    }

    return (
        <div className={Styles.login}>
            <Header />
            <Context.Provider value={{ state, setState }}>
                <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <Input type="email" name="email" placeholder="Digite seu e-mail" />
                    <Input type="password" name="password" placeholder="Digite sua senha" />
                    <button data-testid="submit" disabled={!!state.emailError || !!state.passwordError} className={Styles.submit}>Entrar</button>
                    <Link to="/signup" className={Styles.link}>Criar conta</Link>
                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    )
}

export default Login