import {ButtonGreen, ButtonGreenBig} from "../../components/button/Button";
import {Modal} from "../../components/modal/modal";

export const PosWelcome = ({setStep}) => {

    return(
        <Modal>
            <div className="my-10"></div>
                <ButtonGreenBig handleClick={()=>{setStep(4)}} >Iniciar partida</ButtonGreenBig>
            <div className="my-10"></div>
            <div className="my-10"></div>
                <ButtonGreenBig >Ver ranking</ButtonGreenBig>
            <div className="my-10"></div>
        </Modal>
    )
}