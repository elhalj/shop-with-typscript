

const Input = ({ field, handleSubmit, submitText, loadingText, }) => {
    
    const [formData, setFormData] = useState({firstName:'', lastName:'', email:'', password:'', address:{city:'', municipality:'', street:''}})
  return (
    <div>
          <div>
              <label htmlFor="firstName">
                  FirstName
                  <input type="text" value={formData.firstName} name='firstName' onChange={(e) => e.target.formData} />
              </label>
              <label htmlFor="lastName">
                  lastName
                  <input type="text" value={formData.lastName} name='lastName' onChange={(e) => e.target.formData} />
              </label>
              <label htmlFor="email">
                  email
                  <input type="email" value={formData.email} name='email' onChange={(e) => e.target.formData} />
              </label>
              <label htmlFor="password">
                  password
                  <input type="password" value={formData.password} name='password' onChange={(e) => e.target.formData} />
              </label>
              <label htmlFor="address.city">
                  City
                  <input type="text" value={formData.address.city} name='address.city' onChange={(e) => e.target.formData} />
              </label>
              <label htmlFor="address.municipality">
                  Municipality
                  <input type="text" value={formData.address.municipality} name='address.municipality' onChange={(e) => e.target.formData} />
              </label>
              <label htmlFor="address.street">
                  Street
                  <input type="text" value={formData.address.street} name='address.street' onChange={(e) => e.target.formData} />
              </label>
      </div>
    </div>
  )
}

export default Input
