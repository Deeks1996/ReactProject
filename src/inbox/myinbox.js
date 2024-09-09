import { HashRouter,Link,Route,Routes } from "react-router-dom";

import ManageProfile from "./myprofile";
import ManageEmp from "./employee";

const InboxModule = ()=>{
    return(
        <HashRouter>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand"><i className="fa fa-building fa-lg text-warning"></i> Manage Company </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/"><i className="fa fa-user"></i> Manage Profile </Link>
                            </li>
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/employee"><i className="fa fa-user-tie"></i> My Employee </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-warning" onClick={logout}> 
                                Welcome - { localStorage.getItem("fullname")} - Logout <i className="fa fa-power-off"></i></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Routes>
                <Route exact path = "/" element = {<ManageProfile/>} />
                <Route exact path = "/employee" element = {<ManageEmp/>} />
            </Routes>
        </HashRouter>
    )
}
export default InboxModule;

const logout = ()=>{
    localStorage.clear();
    window.location.reload();
}