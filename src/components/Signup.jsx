import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";


const Signup = () =>{
    //initialize the hooks
    const [username, setUsername] = useState("");
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("")

    //define the three states of our app
    const[loading, setLoading] = useState("");
    const[success, setSuccess] = useState("");
    const[error, setError] = useState("");

    //below is the function that will handle the submit action 
    const handlesubmit = async(e) =>{
        //below we prevent our site from reloading
        e.preventDefault()
        //update our loading hook with amessage that will be displayed to the users trying to log in/register
        setLoading("Please wait as registration is in progress...")

        try{
            //create a form data object that will enable you to capture the four details entered in the form
            const formdata = new FormData();
            //insert the four details interms of the key value pairs
            formdata.append("username",username);
            formdata.append("email",email);
            formdata.append("password",password);
            formdata.append("phone",phone);

            // by use of axios we can access the method post
            const response = await axios.post("https://vanessawambui.alwaysdata.net/api/signup",formdata)

            //setback the loading to default
            setLoading("");
            // just in case everything goes on well ,update the success hook with a message
            setSuccess("user registered successfully")
            //clear your hooks
            setUsername("");
            setEmail("");
            setPassword("");
            setPhone("");

                setTimeout(() => {
            setSuccess("");
               
            }, 5000);

        }
        catch(error){
            //set the loading back to defaut
            setLoading("");

            //update the error hook with the message given back from th response
            setError(error.message)

        }

    }

    return(
        <div className="row justify-content-center mt-4">
            <div className="card col-md-6 shadow p-4">
                <h1 className="text-align title">Sign up</h1>

                <h5 className="text-warning">{loading}</h5>
                <h3 className="text-success">{success}</h3>
                <h4 className="text-danger">{error}</h4>

                <form onSubmit={handlesubmit} className="form">
                    <input type="text"
                    placeholder="Enter the Username"
                    className="input2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required /> <br />


            

                    <input type="email"
                    placeholder="Enter the email address"
                    className="input2 "
                    value={email}
                    onChange={(e) => setEmail (e.target.value)}
                    required /> <br />

                    {/* {email} */}
                    
                    <input type="password"
                    placeholder="Enter the password"
                    className="input2 "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required /> <br />

                    {/* {password} */}


                    <input type="number" 
                    placeholder="Enter your Mobile Number"
                    className="input2 "
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required/> <br />

                    {/* {phone} */}

                    <input type="submit" value="Signup" className="form-btn" /> <br /> <br />

                    Already have an account?<Link className="sign-in"to={'/signin'}>Signin</Link>




                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default Signup;
// research on axios module in react.js