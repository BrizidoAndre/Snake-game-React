import {Modal} from "../modal/modal";
import {InputLabel} from "../inputLabel/InputLabel";
import {Button} from "../button/Button";
import {useState} from "react";
import {ErrorMessage} from "../errorMessage/ErrorMessage";
import {setSelectionRange} from "@testing-library/user-event/dist/utils";

export const FormLogin = ({setStep})=>{

    const [username, setUsername] = useState('Teste');
    const [password, setPassword] = useState('asldkfjaçsldfkjaçs');
    const [errorMessage, setErrorMessage] = useState('')

    // quando o usuário realiza o login
    async function handleLogin(ev){
        ev.preventDefault();

        setStep(2);
        localStorage.setItem('username',username);
    }

    function clearValues(){
        setUsername('');
        setPassword('')
    }

    return(
        <Modal>
            <form onSubmit={handleLogin}>
                <InputLabel
                    value={username}
                    setValue={(ev)=>setUsername(ev.target.value)}
                >Nickname</InputLabel>
                <InputLabel
                    value={password}
                    setValue={(ev)=>setPassword(ev.target.value)}
                    type={'password'}
                >Senha</InputLabel>
                <ErrorMessage>{errorMessage}</ErrorMessage>
                <Button>Login</Button>
            </form>
        </Modal>
    )
}
