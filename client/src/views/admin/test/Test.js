import React, { Component ,useState} from 'react'

function Test(){
       const [inputFields,setInputFields] = useState([
           {firstName:"",lastName:""},
       ])
       const handleChangeInput = (index,event) => {
         //console.log(index,event.target.name)
         const values = [...inputFields]
         values[index][event.target.name] = event.target.value
         setInputFields(values)
         //console.log(values)
       }
       const handleSubmit = (e)=>{
         e.preventDefault()
         console.log(inputFields)
       }
       const handleAddFields = () => {
           setInputFields([...inputFields,{firstName: '',lastName: ''}])
       }
       const handleRemoveFields = (index) => {
           
        const values = [...inputFields];
        if(index != 0){
            values.splice(index,1)
            setInputFields(values)
        }
        
    }
        return (
            <div>
                <h1>Add new</h1>
                <form onSubmit={handleSubmit}>
                    {inputFields.map((inputField,index)=>(
                        <div key={index}>
                           <input name="firstName"  onChange={event=>handleChangeInput(index,event)} placeholder="enter first name" type="text" value={inputField.firstName}/>
                           <input name="lastName" onChange={event=>handleChangeInput(index,event)} placeholder="enter last name"  type="text" value={inputField.lastName}/>
                           <button onClick={()=>handleRemoveFields(index)}>remove</button>
                           <button onClick={()=>handleAddFields()}>add</button>
                        </div>
                    ))}
                    <button onClick={handleSubmit} className="btn btn-primary">Send</button>
                </form>
            </div>
        )
  
}

export default Test
