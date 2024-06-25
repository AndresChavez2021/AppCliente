import axios from "../Util/ConfigAxios.jsx";
import { Platform } from "react-native";
import { setItemAsync, deleteItemAsync } from "expo-secure-store";
import { USER_TOKEN_KEY, USER_KEY } from "../Providers/AuthProviders.jsx";

import errorHandler from "../Util/AxiosErrorHandler.jsx";
import { showToast } from "../Components/funciones.jsx";
import { getItemAsync } from "expo-secure-store";


export async function obtenerBarrios(){
    try {
        let resp =await axios.get("cliente/barrios");
        console.log("resp Barrios ",resp.data.data.barrios)
        return resp.data.data.barrios;
    } catch (error) {
        console.log("desde login", error.message);
        throw errorHandler(error);
    }
}

export async function calculoReciclaje(data) {
    try {
      let id_user=await getItemAsync(USER_KEY);
      data.id_usuario=JSON.parse(id_user).id

    console.log("DAT id_user ",JSON.parse(id_user).id);
      const resp = await axios.post("/cliente/calculoReciclaje",data);
      console.log("resp BACK REC",resp.data);
      return resp.data;
  } catch (error) {
    console.log("error reciclaje", error.message);
      throw errorHandler(error);
  }
}


export async function categoriasUsadasPorUsuarios(){
  try {
      let resp =await axios.get("cliente/categorias-usuarios-mas-usados");
      console.log("resp Barrios ",resp.data)
      return resp.data;
  } catch (error) {
      console.log("desde login", error.message);
      throw errorHandler(error);
  }
}

export async function ResiduosDeUsuario(){
  try {
    let id_user=await getItemAsync(USER_KEY);
    let usuarioID=JSON.parse(id_user).id
    console.log("resp PIE usuarioID ",usuarioID)
      let resp =await axios.get("cliente/recoleccionesPorCategoria?id_usuario="+usuarioID);
      console.log("resp PIE BACK ",resp.data)
      return resp.data;
  } catch (error) {
      console.log("desde login", error.message);
      throw errorHandler(error);
  }
}