import React, { useState } from "react";
import axios from "axios"
import * as yup from 'yup';





export default function Forms() {
  // initial state declaration for form and error validation
  const initialFormState = {
    name: "",
    email: "",
    adress: "", 
    destination: "",
    conditions: "",
  };

  // setting up the state
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState(initialFormState)
  const [ticket, setTicket] = useState({})

  const handleChange = (event) => {
    event.persist()
    const inputData = {...formState, 
      
      [event.target.name]: event.target.type === "checkbox" ? event.target.isChecked : event.target.value}

    handleValidationChange(event)
    setFormState(inputData)
  }


  const handleSubmit = (event) => {
    event.preventDefault()

    axios.post("https://reqres.in/api/users", formState)
      .then((res) => {
        setTicket(res.data)

        setFormState(initialFormState)
      })
      .catch((err) => {
        console.log(err)
      })


  }


  // Yup schema/template

  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Must be a valid email").required("email is required"),
    adress: yup.string().required("Adress required"),
    destination: yup.string().required("you must enter adress"),
    conditions: yup.boolean("Please agree on terms").required()
  })

  const handleValidationChange = (event) => {
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then((valid) => {
        setErrors({...errors, [event.target.name]: ""})
      })
      .catch((err) => {
        setErrors({...errors, [event.target.name]: err.errors[0]})
      })

  }
 
  return (
    <div className="container">
    <form onSubmit={handleSubmit}>
     
      <label className="field"  htmlFor="name">
        Name
        <br/>
        <br/>
        <input
          id="name"
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />
       {errors.name.length > 0  ? <p className="error">{errors.name}</p> : null}
      </label>

      <label className="field" htmlFor="email">
        Email
        <br/>
        <br/>
        <input
          
          type="text"
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
       {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
      </label>

      <label className="field"  htmlFor="adress">
        Physical Adress 
        <br/>
        <br/>
        <input
        type="text"
          name="adress"
          value={formState.adress}
          onChange={handleChange}
        />
      {errors.adress.length > 0 ? <p className="error">{errors.adress}</p> : null}
      </label>

      <label className="field" >
        Destination
        <br/>
        <br/>

        <select className="field"  className="ui dropdown"  name="destination" value={formState.destination} onChange={handleChange}>
          <option className="option1">--Please choose destination--</option>
          <option value="Garissa">Garissa</option>
          <option value="Wajir">Wajir</option>
          <option value="Mandera">Mandera</option>
          <option value="Nairobi">Nairobi</option>

        </select>
        {errors.destination.length > 0 ? <p className="error">{errors.destination}</p> : null}
        
      </label>

      <label htmlFor="conditions" className="conditions" >
        <input 
          type="checkbox"
          name="conditions"
          isChecked={formState.conditions}
          onChange={handleChange}
        />
        Terms and conditions
      </label>
     
     
      <button className='Secondary' >
        Submit
      </button>
    </form>
    <div>
    <h1>{ticket.name}</h1>
    <p>{ticket.email}</p>
    <p>{ticket.destination}</p>
    <p>{ticket.conditions}</p>
    </div>
    
    </div>
    

  );
}