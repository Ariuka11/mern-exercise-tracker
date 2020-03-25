import React, {useState, useEffect } from 'react'
import axios from 'axios'

 const CreateExercise = () => {
     
     const [ exercise, setExercise] = useState({
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
     })

     const [users, setUsers] = useState([])
    
     useEffect(() => {
         axios.get('http://localhost:5000/users')
            .then(res => {
                setUsers(
                    res.data
                )
                
            })
            .catch(err => {
                console.log(err)
            })
     }, [users])

     const handleChange = (e) => {
         setExercise({
             ...exercise,
             [e.target.name] : e.target.value
         })
     }

     const handleSubmit = e => {
         e.preventDefault()
         axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => {
                console.log(res.data)
                setExercise({
                    username: '',
                    description: '',
                    duration: 0,
                    date: new Date(),
                })
            })
            .catch(err => {
                console.log(err)
            })
     }
    return (
        <div>
          <h3>Create New Exercise Log</h3>
            <form onSubmit = {handleSubmit}>
              <div className="form-group">
                <label>Username: </label> 
                <select className="form-control"
                 type = 'text'
                 name = "username"
                 placeholder = "Username"
                 value = {exercise.username}
                 onChange = {handleChange}
                > 
                 {
                     users.map(user => {
                         return <option
                         key = {user._id}
                         value = {user.username}
                         >
                            {user.username}
                         </option>
                     })
                 }
                </select>
              </div>
            <div className="form-group"> 
            <label>Description: </label>
            <input className="form-control"
                 type = 'text'
                 name = "description"
                 placeholder = "Description"
                 value = {exercise.description}
                 onChange = {handleChange}
                />
            </div>
            <div className="form-group">
                <label>Duration (in minutes): </label>
                <input className="form-control"
                 type = 'number'
                 name = "duration"
                 placeholder = "Duration"
                 value = {exercise.duration}
                 onChange = {handleChange}
                />
            </div>
            <div className="form-group">
            <label>Date: </label>
                <div>
                <input className="form-control"
                        type = 'date'
                        name = "date"
                        placeholder = "Date"
                        value = {exercise.date}
                        onChange = {handleChange}
                        />
                </div>  
            </div>  
                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default CreateExercise;