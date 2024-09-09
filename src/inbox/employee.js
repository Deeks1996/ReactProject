import { useState, useEffect } from 'react';
import swal from 'sweetalert';

const ManageEmp = () => {
    let [ename, pickName] = useState("");
    let [emailid, pickMail] = useState("");
    let [epassword, pickPassword] = useState("");
    let [mobileno, pickMobile] = useState("");
    let [designation, pickDesignation] = useState("");
    let [employeelist, setEmp] = useState([]);

    const getEmpdetails = () => {
        fetch("http://localhost:1234/employee")
            .then(response => response.json())
            .then(empArray => {
                setEmp(empArray);
            })
    }

    useEffect(() => {
        getEmpdetails();
    }, []);

    const save = () => {
        let url = "http://localhost:1234/employee";
        let empdata = { 
            "name": ename, 
            "email": emailid, 
            "password": epassword, 
            "mobile": mobileno, 
            "designation": designation,
            "companyid" : localStorage.getItem("id")
        };

        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "post",
            body: JSON.stringify(empdata)
        }

        fetch(url, postData)
            .then(response => response.json())
            .then(info => {
                swal("Done", " Employee " + info.name + " Added", "success");
                setTimeout(pageReload, 2000);
            })
    }

    const pageReload = () => {
        window.location.reload();
    }

    const deleteEmp = (empid) => {
        let url = "http://localhost:1234/employee/" + empid;
        let postData = { method: "delete" };
        fetch(url, postData)
            .then(response => response.json())
            .then(info => {
                swal("Done", " Employee " + info.name + " Profile Deleted!", "success");
                getEmpdetails();
            })
    }

    return (
        <div className="container mt-4">
            <div className="row shadow">
                <h1 className="text-center text-primary p-2"> Manage Employee </h1>
                <div className="col-lg-3">
                    <div className="row shadow m-3 p-2">
                        <h2 className="text-center text-info"> Add Employee </h2>
                        <div className="col-lg-12 mb-2">
                            <label> Employee Name </label>
                            <input type="text" className="form-control" onChange={obj => pickName(obj.target.value)} />
                        </div>
                        <div className="col-lg-12 mb-2">
                            <label> Email Id </label>
                            <input type="email" className="form-control" onChange={obj => pickMail(obj.target.value)} />
                        </div>
                        <div className="col-lg-12 mb-2">
                            <label> Password </label>
                            <input type="password" className="form-control" onChange={obj => pickPassword(obj.target.value)} />
                        </div>
                        <div className="col-lg-12 mb-2">
                            <label> Mobile No </label>
                            <input type="number" className="form-control" onChange={obj => pickMobile(obj.target.value)} />
                        </div>
                        <div className="col-lg-12 mb-2">
                            <label> Designation </label>
                            <select className="form-select" onChange={obj => pickDesignation(obj.target.value)}>
                                <option> Select </option>
                                <option> HR </option>
                                <option> MANAGER </option>
                            </select>
                        </div>
                        <div className="col-lg-12 text-center">
                            <button className="btn btn-primary" onClick={save}> Save </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9 mt-3">
                    <table className="table shadow rounded">
                        <thead>
                            <tr>
                                <th> Employee Name </th>
                                <th> Email Id </th>
                                <th> Password </th>
                                <th> Mobile No </th>
                                <th> Designation </th>
                                <th> Delete </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employeelist.map((emp, index) => {
                                    if(emp.companyid == localStorage.getItem("id"))
                                    return (
                                        <tr key={index}>
                                            <td>{emp.name}</td>
                                            <td>{emp.email}</td>
                                            <td>{emp.password}</td>
                                            <td>{emp.mobile}</td>
                                            <td>{emp.designation}</td>
                                            <td><button className="btn btn-danger btn-sm" onClick={obj => deleteEmp(emp.id)} > Delete </button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default ManageEmp;

