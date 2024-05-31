import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const firstnameHandler = (event) => {
    setFirstName(event.target.value);
  };

  const lastnameHandler = (event) => {
    setLastName(event.target.value);
  };

  const birthdateHandler = (event) => {
     setBirthdate(event.target.value);
  };

  const phoneHandler = (event) => {
    setPhone(event.target.value);
  };

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const registerRequest = async () => {
    try {
      const response = await fetch('http://localhost:8000/Real-project-git/Internet_ProgrammingII_Project/php-project/PHP/api.php/register', {
        method: 'POST',
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          birthdate: birthdate,
          phone: phone,
          username: username,
          email: email,
          password: password,
         
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Registration data:', data);

          
        if (data.status) {
          localStorage.setItem('token', data.status);
          console.log('Redirecting to confirmation page...');
        navigate('/confirm');
        } else {
          // Handle error here
          console.log("Registration failed:", data.error,data.status);
        }
      } else {
        // Handle non-200 response here
        console.log("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitHandler = ( event) => {
    event.preventDefault();
    registerRequest();
  };

  return (
    <form className="register-formm"   onSubmit={submitHandler}>
      <h2 className='font-bold text-2xl '>Register</h2>
      <label>First Name</label>
      <input type="text" value={firstname} onChange={firstnameHandler} required/>
      <label>Last Name</label>
      <input type="text" value={lastname} onChange={lastnameHandler} required/>
      <label>Birthdate</label>
      <input type="date" value={birthdate} onChange={birthdateHandler} required/>
      <label>Phone Number</label>
      <input type="text" value={phone} onChange={phoneHandler} required/>
      <label>Username</label>
      <input type="text" value={username} onChange={usernameHandler} required/>
      <label>Email</label>
      <input type="text" value={email} onChange={emailHandler} required/>
      <label>Password</label>
      <input type="password" value={password} onChange={passwordHandler} required/>
      {error && <p className="text-red-500">{error}</p>}
     
      <button className='bg-cyan-500 mr-5'>Register</button>
      <Link to="/login">Login</Link>
      
    </form>
  );
};

export default Register;
