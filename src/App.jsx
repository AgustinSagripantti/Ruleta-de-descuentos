import { useState, useRef } from "react";

function App(){
    const [ancho, setAncho] = useState(0);
    const [premio, setPremio] = useState("");
    const [rotacion, setRotacion] = useState(0);
    const [situacion, setSituacion] = useState(0);
    const barraRef = useRef(null);

    const lanzar = () =>{
        if (barraRef.current){
            barraRef.current.classList.toggle('barraPausada');
            const width2 = barraRef.current.getBoundingClientRect().width;
            setAncho(width2);
            girar();
            setSituacion(1);
        }
    }

    const girar = () =>{
        const rotacionRandom = Math.floor(Math.random()*2000) + 1000;
        setPremio("¡Mucha suerte!")
        setRotacion(rotacion + ancho + rotacionRandom);
    }

    const final = () =>{
        setSituacion(0);
        const grados = (rotacion % 360 +360) % 360;
        if (grados < 60 || grados >= 180 && grados < 240){
            setPremio("¡Mala suerte! No has ganado el descuento")
        }
        if (grados >= 60 && grados <120 || grados >= 240 && grados < 300){
            setPremio("¡Felicidades! Has ganado un 30% de descuento")
        }
        if (grados >= 120 && grados <180 || grados >= 300){
            setPremio("¡Felicidades! Has ganado un 10% de descuento")
        }
    }

    return(
        <>
            <div className="contenedor">
                <div className="ruleta"
                    style = {{
                        backgroundImage: `url('./assets/ruleta.png')`,
                        transform: `rotate(${rotacion}deg)`,
                        transition: "transform 10s cubic-bezier(0.2, 0.8, 0.7, 0.99)",
                    }}
                    onTransitionEnd={final}
                    >
                </div>
                <div className="premio">{premio}</div>
                {situacion === 0 && 
                <div className="barraContenedora">
                    <div className="barra" ref={barraRef}></div>
                </div>
                }
                {situacion === 0 &&
                <button className="boton" onClick={lanzar}>GIRAR</button>
                }
                <div className="centroRuleta">
                    <img src="./assets/centro.png"/>
                </div>
            </div>
        </>
    )
}

export default App;