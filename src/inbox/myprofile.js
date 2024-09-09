import { useState, useEffect } from "react";
import swal from "sweetalert";

const ManageProfile = () =>{
    let[fname, pickName] = useState("");
    let[mobile, pickMobile] = useState("");
    let[email, pickEmail] = useState("");
    let[password, pickPassword] = useState("");
    let[about, pickAbout] = useState("");
    let[city, pickCity] = useState("");
    let[address, pickAddress] = useState("");
    let[myservice, pickService] = useState( [] );

    const getUserDetails = () =>{
        let url = "http://localhost:1234/account/"+localStorage.getItem("id");
        fetch(url)
        .then(response=>response.json())
        .then(info=>{
            pickName( info.fullname );
            pickMobile( info.mobile );
            pickEmail( info.email );
            pickPassword( info.password );
            
            if(info.city) { pickCity( info.city ); } 
            if(info.about) { pickAbout( info.about ); } 
            if(info.address) { pickAddress( info.address ); }
            if(info.services) { pickService( info.services ); }
        })
    }

    useEffect(()=>{
        getUserDetails();
    }, []);

    const updateinfo = () =>{
        let url = "http://localhost:1234/account/"+localStorage.getItem("id");
        let userdata = {
            fullname:fname, 
            email:email, 
            password:password, 
            mobile:mobile,
            about:about,
            services:myservice,
            city:city,
            address:address
        };
        let postData = {
            headers:{'Content-Type':'application/json'},
            method:"put",
            body:JSON.stringify(userdata)
        }
        fetch(url, postData)
        .then(response=>response.json())
        .then(info=>{
            swal("Record Updated", "Page will reload in 3 seconds...", "success");
            localStorage.setItem("fullname", fname);
            setTimeout(pageReload, 3000);
        })
    }

    const pageReload = () =>{
        window.location.reload();
    }

    let[newservice, pickValue] = useState("");
    const addService = () =>{
        pickService(myservice=>[...myservice, newservice]);
        pickValue("");
    }

    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-6">
                    <div className="p-3 shadow rounded">
                    <h3 className="text-center mb-3 text-primary"> Edit Profile </h3>
                    <div className="row mb-4">
                        <div className="col-lg-6 mb-4">
                            <p> Full Name </p>
                            <input type="text" className="form-control" value={fname} onChange={obj=>pickName(obj.target.value)}/>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <p> Mobile No </p>
                            <input type="number" className="form-control" value={mobile} onChange={obj=>pickMobile(obj.target.value)}/>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <p> e-Mail Id </p>
                            <input type="email" className="form-control" value={email} onChange={obj=>pickEmail(obj.target.value)}/>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <p> Password </p>
                            <input type="text" className="form-control" value={password} onChange={obj=>pickPassword(obj.target.value)}/>
                        </div>
                        
                        <div className="col-lg-12 mb-3">
                            <p> Add Services </p>
                            
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Enter service name"
                                onChange={obj=>pickValue(obj.target.value)} value={newservice}/>

                                <button className="btn btn-warning" onClick={addService}>Add</button>
                            </div>

                            <div className="text-info"> { myservice.toString() } </div>
                            <small className="text-danger" onClick={pickService.bind(this, [])}> Clear All </small>
                        </div>

                        <div className="col-lg-12 mb-4">
                            <p> About Us</p>
                            <textarea className="form-control" value={about} onChange={obj=>pickAbout(obj.target.value)}></textarea>
                        </div>
                        <div className="col-lg-5 mb-4">
                            <p> City Name </p>
                            <input type="text" className="form-control" value={city} onChange={obj=>pickCity(obj.target.value)}/>
                        </div>
                        <div className="col-lg-7 mb-4">
                            <p> Address </p>
                            <textarea className="form-control" value={address} onChange={obj=>pickAddress(obj.target.value)}></textarea>
                        </div>
                        <div className="col-lg-12 text-center">
                            <button className="btn btn-primary" onClick={ updateinfo }> Update Profile </button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="p-3 shadow rounded">
                    <h3 className="text-center mb-3 text-primary"> View Profile </h3>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td> Full Name </td>
                                <td> { fname } </td>
                            </tr>
                            <tr>
                                <td> Mobile No </td>
                                <td> { mobile } </td>
                            </tr>
                            <tr>
                                <td> e-Mail Id </td>
                                <td> { email } </td>
                            </tr>
                            <tr>
                                <td> Password </td>
                                <td> { password } </td>
                            </tr>
                            <tr>
                                <td> About Us </td>
                                <td> { about } </td>
                            </tr>
                            <tr>
                                <td> Our Services </td>
                                <td> { myservice.toString() } </td>
                            </tr>
                            <tr>
                                <td> City </td>
                                <td> { city } </td>
                            </tr>
                            <tr>
                                <td> Full Address </td>
                                <td> { address } </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ManageProfile;



/*
    npm install bootstrap 
    npm install react-router-dom
    npm install sweetalert
    npm install react-toastify
*/