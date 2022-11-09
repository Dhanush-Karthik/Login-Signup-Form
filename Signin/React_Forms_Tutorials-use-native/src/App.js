import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const initialValues = { userName: "", email: "", password: "" , confirmPassword:"" };
  const auth = {}
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    var flag = true;
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.userName) {
      errors.userName = "Username is required!";
      flag = false;
    }
    if (!values.email) {
      errors.email = "Email is required!";
      flag = false;
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
      flag = false;
    }
    if (!values.password) {
      errors.password = "Password is required";
      flag = false;
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
      flag = false;
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";      
      flag = false;
    }
    if(!(values.password === values.confirmPassword)){
      errors.confirmPassword = "Password should be same as previous password";
      flag = false;
    }

    if(flag){
      auth.userName = formValues.userName;
    }

    if(Object.keys(auth).length > 0){
      signinUser(auth).then((jwtTokenData)=>{
        setMessage(jwtTokenData.response);
        console.log("Message: "+message);
      })
    }
    if(message==="true"){
      errors.userName = "Username already exists"
    }
    if(flag && message==="false"){
      fetch("http://localhost:8080/save",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formValues)
      }).then(()=>{
        console.log("added");
      })
    }
    
    return errors;
  };
  const signinUser = (auth) =>{
    
    return axios.post("http://localhost:8080/auth",auth).then((response) => response.data)
  }
  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in successfully</div>
      ) : (
        <pre></pre>
      )}

      <form onSubmit={handleSubmit}>
        <h1>Signup Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <p>{formErrors.userName}</p>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formValues.userName}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <p>{formErrors.email}</p>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <p>{formErrors.password}</p>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Confirm Password</label>
            <p>{formErrors.confirmPassword}</p>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formValues.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
