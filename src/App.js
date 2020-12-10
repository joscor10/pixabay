
import React,{useState,useEffect} from 'react';

import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [busqueda,setBusqueda]= useState('');
  const [imagenes,setImagenes]= useState([]);
  const [paginaActual,setPaginaActual]= useState(1);
  const [totalPaginas,setTotalPaginas]= useState(1);

  useEffect(()=>{
    const consultarAPI = async ()=>{
      if(busqueda==='') return;
      const imagenesPorPagina=30;
      const key='19050386-4734989ec4ad34920a2df0280';
      const url=`https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      const respuesta= await fetch(url);
      const resultado= await respuesta.json();

      setImagenes(resultado.hits);


      // calcular totald e paginas

      const total = Math.ceil(resultado.totalHits/imagenesPorPagina);
      setTotalPaginas(total);

      // mover la pantalla hacia arriba

      const jumbotrin = document.querySelector('.jumbotron');
      jumbotrin.scrollIntoView({ behavior: 'smooth'});

    }

    consultarAPI();


  },[busqueda,paginaActual])

    // definir funcion de pagina anterior

    const paginaAnterior =()=>{
        const nuevaPagina= paginaActual-1;

        if(nuevaPagina===0) return;

        setPaginaActual(nuevaPagina);
    }

    const paginaSiguiente=()=>{
      const nuevaPagina= paginaActual+1;

      if(nuevaPagina>totalPaginas) return;

      setPaginaActual(nuevaPagina);
    }
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>

        <Formulario 
            setBusqueda={setBusqueda}
        />
      </div>
      <div className="row justify-content-center">
          <ListadoImagenes imagenes={imagenes}/>

          {paginaActual===1?null:(
              <button
              type="button"
              className="btn btn-info mr-1  mb-3"
              onClick={paginaAnterior}
            > &laquo; Anterior</button>
          )}
          
            {paginaActual===totalPaginas? null:(
                 <button
                 type="button"
                 className="btn btn-info mb-3"
                 onClick={paginaSiguiente}
               >Siguiente &raquo;</button>
            )}
          
      </div>

    </div>
  );
}

export default App;
