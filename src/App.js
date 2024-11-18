import { useState } from 'react';
import './App.css';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'

function App() {


  const [nombre, setNombre] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [raza, setRaza] = useState("");
  const [foto, setFoto] = useState("");
  const [genero, setGenero] = useState("");
  const [peso, setPeso] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [madre, setMadre] = useState("");
  const [padre, setPadre] = useState("");
  const [id, setId] = useState();


  const [listabovinos, setListabovinos] =useState([]);

  const [editar, setEditar] = useState(false);


  const registros =() =>{
    Axios.post("http://localhost:8081/registrar", {
      nombre:nombre,
      nacimiento:nacimiento,
      raza:raza,
      foto:foto,
      genero:genero,
      peso:peso,
      descripcion:descripcion,
      madre:madre,
      padre:padre
    }).then(() =>{
     
      cancelar();
      Swal.fire({
        title: '<strong>Registro exitoso</strong>',
        html: '<i>El bovino <strong>'+  nombre +' </strong> se ha registrado exitosamente</i>',
        icon: ' success'
      })
    })
  }

  const getBovinos =() =>{
    Axios.get("http://localhost:8081/bovinos").then((response) =>{
      setListabovinos(response.data);
      
    })
  }

  const editarbovino =(val) =>{
    alert("Holaa")
    console.log("Buenas")
    setEditar(true);

    setNombre(val.nombre);
    setNacimiento(val.nacimiento);
    setRaza(val.raza);
    //setFoto(val.foto);
    setGenero(val.genero);
    setPeso(val.peso);
    setDescripcion(val.descripcion);
    setMadre(val.madre);
    setPadre(val.padre);
    
    setId(val.id);
    
}

const update =() =>{
  Axios.put("http://localhost:8081/actualizar", {
    id:id,
    nombre:nombre,
      nacimiento:nacimiento,
      raza:raza,
  //    foto:foto,
      genero:genero,
      peso:peso,
      descripcion:descripcion,
      madre:madre,
      padre:padre
  }).then(() =>{
    alert("Holaa")
    getBovinos();
    cancelar();
    Swal.fire({
      title: '<strong>Bovino actualizado</strong>',
      html: '<i>El bovino <strong>'+  nombre +' </strong> se ha actualizado exitosamente</i>',
      icon: ' success'
    })
  })
}

  const cancelar = ()=>{
    setNombre("");
    setDescripcion("");
    setFoto("");
    setGenero("");
    setMadre("");
    setNacimiento("");
    setPadre("");
    setPeso("");
    setRaza("");
    setEditar(false);
  }



  
  const eliminar =(id) =>{
    Swal.fire({
      title: '<strong>Confirmar eliminado</strong>',
      html: '<i>Esta seguro que desea eliminar el bovino </i>',
      icon: ' warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Esta seguro'
    }).then((result)=>{
      if(result.isConfirmed){
        Axios.delete(`http://localhost:8081/eliminar/${id}`).then(() =>{
          getBovinos();
          cancelar();
          Swal.fire(
            'Eliminado',
            'El bovino ha sido eliminado',
            'success'
          );
        }).catch(function(error){
            Swal.fire({
              icon: 'error',
              title: 'Ooops..',
              html: 'No se logro eliminar',
             
            })
        })
          
      }
    });
    
  }
  return (
    <div className="App">
      <div className='card text-center'>
        <div className='card-header'>
          Registro de bovinos
        </div>
        <div className='card-body '>

        <div className='input-group mb-3'>
        <span className='input-group-text' id ='basic-addon1'>Nombre:</span>
          <input 
        onChange={(event)=>{
          setNombre(event.target.value);
        }} className='form-control' placeholder='Nombre'
        type ="text" value={nombre}></input>
        </div>

        <div className='input-group mb-3'>
        <span className='input-group-text' id ='basic-addon1'>Fecha nacimiento:</span>
          <input 
        onChange={(event)=>{
          setNacimiento(event.target.value);
        }} className='form-control' placeholder='Fecha de nacimiento'
        type ="date" value={nacimiento}></input>
        </div>

        <div className='input-group mb-3'>
        <span className='input-group-text' id ='basic-addon1'>Raza:</span>
          <input 
        onChange={(event)=>{
          setRaza(event.target.value);
        }} className='form-control' placeholder='Raza'
        type ="text" value={raza}></input>
        </div>

        <div className='input-group mb-3'>
        <span className='input-group-text' id ='basic-addon1'>Foto:</span>
          <input 
        onChange={(event)=>{
          setFoto(event.target.value);
        }} className='form-control' placeholder='Foto del bovino'
        type ="file" value={foto}></input>
        </div>

        <div className='input-group mb-3'>
        <span className='input-group-text' id ='basic-addon1'>Genero:</span>
          <input 
        onChange={(event)=>{
          setGenero(event.target.value);
        }} className='form-control' placeholder='Genero'
        type ="text" value={genero}></input>
        </div>

        <div className='input-group mb-3'>
        <span className='input-group-text' id ='basic-addon1'>Peso:</span>
          <input 
        onChange={(event)=>{
          setPeso(event.target.value);
        }} className='form-control' placeholder='Peso'
        type ="number" value={peso}></input>
        </div>

        <div className='input-group mb-3'>
        <span className='input-group-text' id ='basic-addon1'>Descripción:</span>
          <input 
        onChange={(event)=>{
          setDescripcion(event.target.value);
        }} className='form-control' placeholder='Descripción'
        type ="text" value={descripcion}></input>
        </div>

        <div className='input-group mb-3'>
        <span className='input-group-text' id ='basic-addon1'>Nombre madre:</span>
          <input 
        onChange={(event)=>{
          setMadre(event.target.value);
        }} className='form-control' placeholder='Nombre Madre'
        type ="text" value={madre}></input>
        </div>

        <div className='input-group mb-3'>
        <span className='input-group-text' id ='basic-addon1'>Nombre padre:</span>
          <input 
        onChange={(event)=>{
          setPadre(event.target.value);
        }} className='form-control' placeholder='Nombre Padre'
        type ="text" value={padre}></input>
        </div>

        {
          editar?
          <div>
          <button className='btn btn-warning m-2' onClick={update}> Actualizar</button>
          <button className='btn btn-danger m-2' onClick={cancelar}> Cancelar</button>
          </div>
          :
          <button className='btn btn-primary' onClick={registros}> Registrar</button>

        }
        </div>
      </div>

      <div className='lista'>
        <button className='btn btn-success' onClick={getBovinos}> Consultar</button>

        <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Fecha de nacimiento</th>
            <th scope='col'>Raza</th>
            <th scope='col'>Genero</th>
            <th scope='col'>Descripción</th>
            <th scope='col'>Peso</th>
            <th scope='col'>Madre</th>
            <th scope='col'>Padre</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>

        {listabovinos.map((val,key) => {
          return  <tr key={val.id}>
              <th scope='row'>{val.id}</th>
              <td>{val.nombre}</td>
              <td>{val.nacimiento}</td>
              <td>{val.raza}</td>
              <td>{val.genero}</td>
              <td>{val.descripcion}</td>
              <td>{val.peso}</td>
              <td>{val.madre}</td>
              <td>{val.padre}</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                <button type="button"
                  onClick={()=>{ 
                  editarbovino(val)
                  }}
                className="btn btn-info">Editar</button>
                <button type="button" className="btn btn-danger" onClick={()=>{
                  eliminar(val.id);
                }}
                >Eliminar</button>
                </div>
              </td>
            </tr> 
          
        })
        }
            
        </tbody>

        </table>
        


      </div>
    </div>
  );
}

export default App;
