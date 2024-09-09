import { Link } from "react-router-dom";
import {useState} from 'react';
import { toast,ToastContainer } from "react-toastify";
import swal from "sweetalert";

const CreateAccount = () =>{
    let[fname,setName] = useState("");
    let[email,setMail] = useState("");
    let[password,setPass] = useState("");
    let[mobile,setMobile] = useState("");
    
    const save = async()=>{
        try{
            let newuser = {fullname:fname,email:email,password:password,mobile:mobile};
            let url = "http://localhost:1234/account";
            
            let postData = {
                headers:{'Content-Type':'application/json'},
                method:"post",  
                body:JSON.stringify(newuser)
            }

            await fetch(url,postData)
            .then(response => response.json())
            .then(info =>{
                swal("Created","Account created successfully!","success");  //to print sweetalert, use 'swal'
            })
        }catch(error){
            toast("Failed to Create account");
        }

    }

    return(
        <div className="container mt-5">
            <ToastContainer/>
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4 shadow-lg rounded p-4">
                    <h3 className="text-center"> <i className="fa fa-user-plus text-info"></i> Create Account </h3>
                    <div className="mb-3">
                        <label> Full Name </label>
                        <input type="text" className="form-control"  onChange={obj=>setName(obj.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label> e-Mail Id </label>
                        <input type="email" className="form-control" onChange={obj=>setMail(obj.target.value)}/>
                    </div>

                    <div className="mb-3">
                        <label> Password </label>
                        <input type="password" className="form-control" onChange={obj=>setPass(obj.target.value)}/>
                    </div>

                    <div className="mb-3">
                        <label> Mobile No </label>
                        <input type="number" className="form-control" onChange={obj=>setMobile(obj.target.value)}/>
                    </div>

                    <div className="text-center mb-3">
                        <button className="btn btn-danger" onClick={save}> Submit </button>
                    </div>

                    <p className="text-center">
                        <Link to="/"> Registered ? Login </Link>
                    </p>

                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}

export default CreateAccount;