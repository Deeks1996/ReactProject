import {HashRouter,Routes,Route,Link} from 'react-router-dom';

import CreateAccount from "./register";
import Login from "./login";

const UserModule = ()=>{
    return(
        <HashRouter>
                <Routes>
                    <Route exact path = "/" element = {<Login/>} />
                    <Route exact path = "/signup" element = {<CreateAccount/>} />
                </Routes>
        </HashRouter>
    )
}
export default UserModule;