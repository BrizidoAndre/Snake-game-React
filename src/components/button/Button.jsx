export const Button = ({handleClick, styles, children}) => {
    return(
        <button onClick={handleClick} className={`btn ${styles}`}>{children}</button>
    )
}

export const ButtonGreen = ({handleClick, styles, children}) => {
    return(
        <button onClick={handleClick} className={`btn btn-green ${styles}`}>{children}</button>
    )
}

export const ButtonGreenBig = ({handleClick, styles, children}) => {
    return(
        <button onClick={handleClick} className={`btn btn-green btn-big ${styles}`}>{children}</button>
    )
}

