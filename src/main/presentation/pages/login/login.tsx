import React from "react";
import Styles from "./login-styles.scss";
import Header from "../../components/login-header/login-header";
import Footer from "../../components/footer/footer"
import Input from "../../components/input/input";
import FormStatus from "../../components/form-status/form-status";
const Login: React.FC = () => {
    return (
        <div className={Styles.login}>
            <Header/>
            <form className={Styles.form}>
                <h2>Login</h2>                
                <Input type="password" name="password" placeholder="Digite sua senha"/>
                <Input type="email" name="email" placeholder="Digite seu e-mail"/>                
                <button className={Styles.submit}>Entrar</button>
                <span className={Styles.link}>Criar conta</span>
                <FormStatus/>
            </form>
            <Footer/>
        </div>
    )
}

export default Login