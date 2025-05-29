import { Link } from "react-router-dom"
import type { Field } from "../../components/Input"
import Input from "../../components/Input"
import { UseUserStore } from "../../store/userStore/UserStore"
import { useEffect } from "react"

const fields: Field[] = [
    { name: "firstName", label: "Prénom", type: "text" },
    { name: "name", label: "Nom", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Mot de passe", type: "password" },
    { name: "address.city", label: "Ville", type: "text" },
    { name: "address.municipality", label: "Commune", type: "text" },
    { name: "address.street", label: "Rue", type: "text" }
]

const Signup = () => {
    const {signup, error, isSignUp, resetError} = UseUserStore()

  useEffect(() => {
    return () => resetError();
  },[])
    const handleSubmit = async (data: Record<string, string>) => {
        const address = {
            city: data['address.city'],
            municipality: data['address.municipality'],
            street: data['address.street']
        }
        await signup(
            data.name,
            data.firstName,
            data.email,
            data.password,
            address
        )
    }
    
    return (
        <div>
            <button className="btn btn-link m-2 border-accent"><Link to='/'>Home</Link></button>
            <Input 
                fields={fields}
                handleSubmit={handleSubmit}
                initialData={{}}
                submitText="Sign Up"
               error={error} // Passez l'erreur au composant
  loadingText={isSignUp ? "Création en cours..." : "Loading..."}
            />
        </div>
    )
}

export default Signup
