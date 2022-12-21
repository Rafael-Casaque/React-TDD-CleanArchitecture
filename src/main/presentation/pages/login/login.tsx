import React, { useState,useEffect } from "react";
import Styles from "./login-styles.scss";
import { Header, Footer, Input, FormStatus } from "../../components"
import Context from "@/main/presentation/components/contexts/form/form-context"
import { Validation } from "../../protocols/validation";

type Props = {
    validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {

    const [state, setState] = useState({
        isLoading: false,    
        email: '',
        password: '',
        emailError: 'Campo obrigatório',
        passwordError: 'Campo obrigatório',
        mainError: '',        
    })    

    useEffect(() => {
        validation.validate({email: state.email})
    },[state.email]) //coloca o stateEmail como dependente, toda vez que ele é alterado é disparado a função validattion

    useEffect(() => {
        validation.validate({password: state.password})
    },[state.password]) //coloca o statepassword como dependente, toda vez que ele é alterado é disparado a função validattion

    return (
        <div className={Styles.login}>
            <Header />
            <Context.Provider value={{ state, setState }}>
                <form className={Styles.form}>
                    <h2>Login</h2>
                    <Input type="email" name="email" placeholder="Digite seu e-mail" />
                    <Input type="password" name="password" placeholder="Digite sua senha" />
                    <button data-testid="submit" disabled className={Styles.submit}>Entrar</button>
                    <span className={Styles.link}>Criar conta</span>
                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    )
}

export default Login