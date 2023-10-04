import {Navigate} from "react-router-dom";
import store from "../store/index.js";


const Protected = (props) => {
    const token = store.getState().token

    return token ? props.children : <Navigate to={'/login'} replace/>
}

export default Protected