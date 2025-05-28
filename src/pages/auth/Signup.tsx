import { Link } from "react-router-dom"
import type { Field } from "../../components/Input"
import Input from "../../components/Input"

const fields: Field[] = [
    { name: "firstName", label: "FirstName", type: "text" },
    { name: "lastName", label: "LastName", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "address.city", label: "City", type: "text" },
    { name: "address", label: "Municipality", type: "text" },
    {name: "address.street", label: "Street", type: "text"}
]

const Signup = () => {
     const handleSubmit = async (data: Record<string, string>) => {
        console.log(data)
    }
  return (
      <div>
          <button className="btn btn-link m-2 border-accent"><Link to='/'>Home</Link></button>
       <Input fields={fields} handleSubmit={handleSubmit} initialData={{}} submitText="Sign Up" loadingText="Loading..." error={null}/>
    </div>
  )
}

export default Signup
