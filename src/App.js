import './App.css';
import {FormLogin} from "./components/form/Form";
import {useState} from "react";
import {Form} from "react-router-dom";
import {Welcome} from "./pages/welcome/welcome";
import {PosWelcome} from "./pages/posWelcome/PosWelcome";
import {Game} from "./pages/game/Game";

function App() {

    const [step, setStep] = useState(1)

    let component;

    switch (step){
        case 1:
            component = <FormLogin setStep={setStep}/>
            break;
        case 2:
            component = <Welcome setStep={setStep}/>
            break;
        case 3:
            component = <PosWelcome setStep={setStep}/>
            break;
        case 4:
            component = <Game setStep={setStep}/>
            break;
        case 5:
            component = <Game setStep={setStep}/>
            break;
    }

  return (
      <main>
          {component}
      </main>
  );
}

export default App;
