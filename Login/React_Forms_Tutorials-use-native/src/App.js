import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const initialValues = { userName: "", password: "" };
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
    if (!values.userName) {
      errors.userName = "Username is required!";
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
    if(flag){
      loginUser(formValues).then((jwtTokenData)=>{
        setMessage(jwtTokenData.response);
        console.log(message);
      })
    }
    return errors;
  };
  const loginUser = (formValues) =>{
    return axios.post("http://localhost:8080/check",formValues).then((response) => response.data)
  }
  return (
    <div className="container">
      {console.log(message.response)}
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">{message}</div>
      ) : (
        <pre></pre>
      )}

      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formValues.userName}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.userName}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
    
  );
}

export default App;
