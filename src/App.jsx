import { useEffect, useState } from "react";
import "./App.css";
import "./accordion.css";

function App() {
  const [lojas, setLojas] = useState([]);
  const [lojasSelecionadas, setLojasSelecionadas] = useState([]);

	const pegarPorCodigo = (codigo, lista) => {
		return lista.filter(item => item.codigo === codigo)[0];
	}

  useEffect(()=>{
	fetch("../data/lojas.json")
	.then(res => res.json())
	.then(data => setLojas(data))
	.catch(err => console.log(err))
  }, []);



  const CheckBoxItem = ({codigo, item}) => {

	const [marcado, setMarcado] = useState(false);

	// useEffect(()=>{
	// 	if(marcado){
	// 		setLojasSelecionadas([...lojasSelecionadas, pegarPorCodigo(codigo, lojas)]);
	// 	}
	// }, [marcado])

	return (
		<div className="checkbox-item">
			<span>Código: {codigo}</span>
			{"  "}
			<span>{item}</span>
			<input checked={marcado} type="checkbox" name="checkbox" id="checkbox" onChange={()=> setMarcado(!marcado)} />
		</div>
	)
  }

  const Accordion = ({ title, content, children }) => {
	const [active, setActive] = useState(false);
    return (
        <div className="accordion-container">
          <div className="accordion-title-box">
            <h2>{title}</h2> <button  onClick={()=> setActive(!active)} className="btn-activate">{active? "Fechar": "Abrir"}</button>
          </div>
          {active ? <div>{children}</div> : null}
        </div>
    );
  };
  return (
      <div className="main">
        <Accordion
          title={"Lojas"}
		 >
				{lojas.map((loja, idx) => {
					return <CheckBoxItem codigo={loja.codigo} item={loja.nomeFilial} key={idx}/>
				})}
			</Accordion>
			<Accordion
          title={"Produtos"}
		 >
				{lojas.map((loja, idx) => {
					return <CheckBoxItem codigo={loja.codigo} item={loja.nomeFilial} key={idx}/>
				})}
			</Accordion> 

			<Accordion
          title={"Resumo da Pesquisa"}
		 >
				{lojas.map((loja, idx) => {
					return <CheckBoxItem codigo={loja.codigo} item={loja.nomeFilial} key={idx}/>
				})}
			</Accordion>  
      </div>
  );
}

export default App;
