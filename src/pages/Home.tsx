import Input, { type Field } from '../components/Input'

const fields: Field[] = [
    { name: "firstName", label: "FirstName", type: "text" },
    { name: "lastName", label: "LastName", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "address.city", label: "City", type: "text" },
    { name: "address", label: "Municipality", type: "text" },
    {name: "address.street", label: "Street", type: "text"}
]

const Home = () => {
    const handleSubmit = async (data: Record<string, string>) => {
        console.log(data)
    }
  return (
    <div>
      <Input fields={fields} handleSubmit={handleSubmit} initialData={{}} submitText="Submit" loadingText="Loading..." error={null}/>
    </div>
  )
}

export default Home
