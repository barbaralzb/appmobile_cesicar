// Para obtener los datos de nuestro contexto Auth desde cualquier parte de nuestra aplicacion tengo que hacer este Hook
// ya que en la function AuthProvider del context no puedo pasar el estado
// const [auth, setAuth] = useState(undefined); (y no se puede)
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

//Aqui lo que hacemos es extraer la informacion y retornar qlo que haya en AuthContext
//Extrae el value y lo retorna

export default () => useContext(AuthContext);