import { Link } from "react-router-dom";
import { useState } from "react";
import swal from "sweetalert";

const Login = () =>{
    let[emailid,setemail] = useState("");
    let[password,setpass] = useState("");
    let[msg,setmsg] = useState("Enter Login Details");
    
    const userCheck = (obj)=>{
        obj.preventDefault(); //this will avoid page reload
        let url = "http://localhost:1234/account?email="+emailid+"&password="+password;
        fetch(url)
        .then(response=>response.json())
        .then(userinfo =>{
            if(userinfo.length > 0 && (userinfo[0].email == emailid) && userinfo[0].password == password)
            {
                setmsg("Success: Please wait Redirecting...");
                localStorage.setItem("id",userinfo[0].id);  //to store item , use setitem
                localStorage.setItem("fullname",userinfo[0].fullname);
                setTimeout(pageReload, 3000);
                //window.location.reload(); //reloads current page
            }
            else
            {
                swal("Invalid","Invalid or Not Exists", "error");
            }
        })

    }

    const pageReload = ()=>{
        window.location.reload();
    }

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4 shadow-lg rounded p-4">
                    <h3 className="text-center"> <i className="fa fa-lock text-info"></i> Login </h3>
                    <p className="text-center text-success"> {msg} </p>
                    
                    <form onSubmit={userCheck}>
                        <div className="mb-3">
                            <label> e-Mail Id </label>
                            <input type="text" className="form-control" onChange={obj=>setemail(obj.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label> Password </label>
                            <input type="password" className="form-control" onChange={obj=>setpass(obj.target.value)}/>
                        </div>

                        <div className="text-center mb-3">
                            <button className="btn btn-danger"> Login </button>
                        </div>
                    </form>

                    <p className="text-center">
                        <Link to="/signup"> 
                            New ? Create Account
                        </Link>
                    </p>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}

export default Login;