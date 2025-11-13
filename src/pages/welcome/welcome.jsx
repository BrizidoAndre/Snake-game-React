import {Modal} from "../../components/modal/modal";
import {ButtonGreen} from "../../components/button/Button";

export const Welcome = ({setStep}) => {
    const username = localStorage.getItem('username')

    function nextPage(){
        setStep(3);
    }
    return(
        <Modal>
            <p>{username}</p>
            <div className={'light-background'}>
            <h2 className={'black'}>Logo</h2>
            <p className={'black my-10'}>Bem vindo ao Snake Nutrition! Um jogo destinado ao ensino de hábitos nutricionais saudáveis. Preparado para embarcar nessa jornada</p>
            <ButtonGreen handleClick={nextPage}>Vamos lá</ButtonGreen>
            </div>
        </Modal>
    )
}