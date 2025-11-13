import {useEffect, useRef, useState} from "react";
import {apple} from "../../utils/imageBase";
import {Button} from "../../components/button/Button";

export const Game = ({setStep}) => {

    // user ref para o canvas ser referenciado
    const canvasRef = useRef();

    const points = useRef({
        good: 0
    });
    // os pontos do usuário
    const [score, setScore] = useState({
        unit: 0, points: 0, good: 0, bad: 0, level: 1, medals: 0, trophy: 0,
    })


    // para o modo escuro ou não
    const [darkMode, setDarkMode] = useState(false)

    const darkColors = {
        primary: '#6e3100', secondary: '#9a4f14',background:'#411e03'
    }
    const lightColors = {
        primary: '#185402', secondary: '#217a02',background:'#4e8a3a'
    }

    // criando constantes que não mudarão
    // valor da unidade do píxel
    const unitValue = 30;
    // os tamanhos da área do jogo, são 17 pixeis horizontais e 15 pixeis verticais
    const gameWidth = unitValue * 17;
    const gameHeight = unitValue * 15;
    // as cores do background de acordo com o modo escuro ou modo claro
    const backgroundColor = darkMode ? darkColors : lightColors
    // as cores da cobrinha
    const colors = [{
        primary: '#0d77c5', secondary: '#0d99ff',
    }, {
        primary: '#ffa629', secondary: '#ffcd29',
    }, {
        primary: '#3cb2bd', secondary: '#4ce2f0',
    }, {
        primary: '#9546bd', secondary: '#d8a2f2',
    }, {
        primary: '#EEB7B7', secondary: '#F4E5E5',
    },]

    // iniciando as variáveis que mudarão de valor sempre
    let canvas;
    let context;
    let running;
    let snake;
    let xVelocity;
    let yVelocity;
    let snakeColor;
    let snakeFattiness;
    let speedGame;
    let goodFood;
    let badFood;

    // função para atribular as variáveis com os componentes desejados
    function initiateCanvas() {
        canvas = canvasRef.current;
        context = canvas.getContext('2d')
    }
    // retornando todos os valores no seu estado inicial quando começar o jogo
    function gameStart() {
        // reiniciando states
        setScore({
            unit: 0, points: 0, good: 0, bad: 0, level: 1, medals: 0, trophy: 0,
        })

        running = true;
        snake = [{
            xPosition: unitValue * 4, yPosition: unitValue
        }, {
            xPosition: unitValue * 3, yPosition: unitValue
        }, {
            xPosition: unitValue * 2, yPosition: unitValue
        }, {
            xPosition: unitValue, yPosition: unitValue
        },]
        xVelocity = unitValue;
        yVelocity = 0;
        snakeColor = colors[score.level -1];
        snakeFattiness = 50;
        speedGame = 150;
        goodFood = [];
        badFood = [];

        clearBoard();
        createGoodFood()
        createBadFood()
        drawFood()
        drawSnake()
        nextTick();
    }

    // função de repetição, que faz o efeito de animação
    function nextTick() {
        if (checkGameOver()) {
            setTimeout(() => {
                clearBoard();
                drawFood();
                moveSnake();
                drawSnake()
                nextTick()
            }, speedGame)
        } else {
            gameOver();
        }
    }

    // limpando o tabuleiro e quadriculando-o
    function clearBoard() {
        let primary = true;
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 17; j++) {
                primary ? context.fillStyle = backgroundColor.primary : context.fillStyle = backgroundColor.secondary;
                primary = !primary;
                context.fillRect(j * unitValue, i * unitValue, unitValue, unitValue)
            }
        }
    }

    // movendo a cobra
    // aqui faço a verificação se a cobra bateu em uma comida
    function moveSnake() {
        snake.unshift({
            xPosition: snake[0].xPosition + xVelocity, yPosition: snake[0].yPosition + yVelocity
        })
        let hasEaten = false;
        // se a cobra bateu em uma comida boa resertar as comidas ruins e criar novas
        goodFood.forEach((food, index) => {
            if (food.xPosition === snake[0].xPosition && food.yPosition === snake[0].yPosition) {
                hasEaten = true;
                goodFood = [];
                createGoodFood();
                increasePoints(true)
            }
        })
        // se a cobra bateu em uma comida ruim resertar as comidas ruins e criar novas
        badFood.forEach((food, index) => {
            if (food.xPosition === snake[0].xPosition && food.yPosition === snake[0].yPosition) {
                hasEaten = true;
                badFood = [];
                createBadFood()
                increasePoints(false)
            }
        })

        // se a cobra NÃO comeu, reduzi-la
        if (!hasEaten) {
            snake.pop();
        }
    }

    // desenhando a cobra com posições x e y
    function drawSnake() {
        snake.forEach((item, index) => {
            context.beginPath();
            index % 2 === 0 ? context.fillStyle = snakeColor.primary : context.fillStyle = snakeColor.secondary;
            context.roundRect(item.xPosition, item.yPosition, unitValue, unitValue, snakeFattiness);
            context.fill();
            context.closePath();
        })
    }

    // função para criar uma comida saudável
    function createGoodFood() {
        for (let i = 0; i < score.level; i++) {
            let isOccupied = false;
            do {
                isOccupied = false;
                let xFoodPosition = Math.floor(Math.random() * gameWidth / unitValue) * unitValue;
                let yFoodPosition = Math.floor(Math.random() * gameHeight / unitValue) * unitValue;

                // para não criar em um espaço onde existe a cobra
                snake.forEach(item => {
                    if (item.xPosition === xFoodPosition && item.yPosition === yFoodPosition) {
                        isOccupied = true;
                    }
                })
                // para não criar em um espaço onde existe uma comida não saudável
                badFood.forEach(item => {
                    if (item.xPosition === xFoodPosition && item.yPosition === yFoodPosition) {
                        isOccupied = true;
                    }
                })

                goodFood.push({
                    xPosition: xFoodPosition, yPosition: yFoodPosition
                })
            } while (isOccupied)
        }
    }

    // função para criar uma comida não saudável
    function createBadFood() {
        for (let i = 0; i < score.level; i++) {
            let isOccupied = false;
            do {
                isOccupied = false;
                let xFoodPosition = Math.floor(Math.random() * gameWidth / unitValue) * unitValue;
                let yFoodPosition = Math.floor(Math.random() * gameHeight / unitValue) * unitValue;
                // para não criar em um espaço onde existe a cobra
                snake.forEach(item => {
                    if (item.xPosition === xFoodPosition && item.yPosition === yFoodPosition) {
                        isOccupied = true;
                    }
                })
                // para não criar no mesmo espaço da comida boa
                goodFood.forEach(item => {
                    if (item.xPosition === xFoodPosition && item.yPosition === yFoodPosition) {
                        isOccupied = true;
                    }
                })
                badFood.push({
                    xPosition: xFoodPosition, yPosition: yFoodPosition
                })
            } while (isOccupied)
        }
    }

    // deseando as comidas no canvas
    function drawFood() {
        goodFood.forEach((item, index) => {
            let image = new Image();
            image.src = apple;
            context.drawImage(image, item.xPosition, item.yPosition, unitValue, unitValue)
        })
        badFood.forEach((item, index) => {
            let image = new Image();

            image.src = 'http://localhost/BR/images/hamburguer.353cdcfd6f090ddbb7c5.png';
            context.drawImage(image, item.xPosition, item.yPosition, unitValue, unitValue)
        })
    }

    // verificação se perdeu
    function checkGameOver() {
        // aqui para verificar se bateu nas bordas
        if (snake[0].xPosition < 0 || snake[0].yPosition < 0 || snake[0].xPosition >= gameWidth || snake[0].yPosition >= gameHeight) {
            return false
        }
        // aqui para verificar se bateu em si mesma
        for (let i = 1; i < snake.length; i++) {
            let snakePart = snake[i];
            if (snake[0].xPosition === snakePart.xPosition && snake[0].yPosition === snakePart.yPosition) {
                return false;
            }
        }
        return true;
    }

    // função para acabar o jogo
    function gameOver() {
        running = false;
        context.font = '50px Comic Sans MS';
        context.fillText('Você perdeu!',gameWidth/4, gameHeight/2)
        setTimeout(()=>{
        setStep(5)

        },2000)
    }

    // função seguindo a lógica como o aumento de pontos se comportará
    // o valor booleano é se ela comeu uma comida boa ou ruim
    function increasePoints(goodFood) {

        setScore(prevScore=>{
            const newUnit = prevScore.unit +1;
            const newPoints = Math.floor(newUnit /3) * 50

            return{
                ...prevScore,
                good: goodFood? prevScore.good +1 : prevScore.good,
                bad: !goodFood? prevScore.bad + 1: prevScore.bad,
                unit: newUnit,
                points: newPoints
            }
        })
    }

    // quando o usuário pressionsar uma tecla mudar a velocidade da cobra
    function whenUserPress(event) {
        const keyPress = event.key;

        const up = xVelocity === 0 && yVelocity < 0;
        const down = xVelocity === 0 && yVelocity > 0;
        const left = xVelocity < 0 && yVelocity === 0;
        const right = xVelocity > 0 && yVelocity === 0;

        if (keyPress === 'ArrowUp' && !down) {
            xVelocity = 0;
            yVelocity = -unitValue;
        }
        if (keyPress === 'ArrowDown' && !up) {
            xVelocity = 0;
            yVelocity = unitValue;
        }
        if (keyPress === 'ArrowLeft' && !right) {
            xVelocity = -unitValue;
            yVelocity = 0;
        }
        if (keyPress === 'ArrowRight' && !left) {
            xVelocity = unitValue;
            yVelocity = 0;
        }
    }
    // quando o componente ser recarrgado realizar estas funções
    useEffect(() => {
        initiateCanvas();
        gameStart()
        window.addEventListener('keydown', whenUserPress);
        console.log('')
        return () => {
            window.removeEventListener('keydown', whenUserPress);
        }
    }, [darkMode]);

    return (<div className={'container-game'}>
        <div className="col">
            <p>Pontuação:</p>
            <p>{score.points}</p>
            <p>Comidas saudáveis:</p>
            <p>{score.good}</p>
            <p>Comidas não saudáveis:</p>
            <p>{score.bad}</p>
            <p>Nível:</p>
            <p>{score.level}</p>
            <Button handleClick={()=>{
                setDarkMode(!darkMode)
                let root = document.querySelector(':root');
                root.style.setProperty('--background', !darkMode ? darkColors.background: lightColors.background)
            }}>Dark color</Button>
        </div>
        <div className="col">
            <canvas ref={canvasRef} width={gameWidth} height={gameHeight}></canvas>
        </div>
    </div>)
}