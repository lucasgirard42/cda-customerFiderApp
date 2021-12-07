import React, { useEffect, useState} from 'react';
import Field from '../components/forms/Field';
import UsersAPI from '../services/UsersAPI';
import { Link } from 'react-router-dom';



const SettingUserPage = (props) => {
   
   const {id} = props.match.params

   const [user, setUser] = useState({
       email:"",
       company:"",
       mail:"",
       reduction:""
   })

//    console.log('ppl',props);

   const fetchUser = async (id) =>{
       try {
           const {email, company, mail, reduction } = await UsersAPI.find(id);
           setUser({email, company, mail, reduction })
       } catch (error) {
           console.log(error.response);
       }
   }

   useEffect(() => {
       fetchUser(id);
   }, [id]);

   // Gestion des changement des imputs dans le formulaire
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      
        await UsersAPI.update(id, user);
        // props.history.replace("/customers"); 
        // TODO notification de success
      
        // TODO notification de success
        // props.history.replace("/customers"); // <------- revenir a la liste des clients
      

      setErrors({});
      // console.log(response.data);
    } catch (error) {
      if (error.response.data.violations) {
        const apiErrors = {};
        error.response.data.violations.map((violation) => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        setErrors(apiErrors);
        // console.log(apiErrors);

        // TODO notification des erreurs
      }
    }
  };



   console.log(user);

   return (
     <>
       <h1 className="text-center">{user.email}</h1>
       <div>
         <p>mail : {user.mail}</p>
         <p>reduction : {user.reduction}</p>
       </div>
       <form onSubmit={handleSubmit}>
         <Field
           onChange={handleChange}
           value={user.company}
           name="company"
           label="entrerise"
           placeholder="votre nom d'\entreprise"
         />
         <label>rédaction de mail</label>
         <textarea
           rows="3"
           style={{'width':'100%'}}
           onChange={handleChange}
           value={user.mail}
           name="mail"
           label="redaction de mail"
           placeholder="envoyer un email de réduction"
         />
         <Field
           onChange={handleChange}
           value={user.reduction}
           name="reduction"
           label="code réduction"
           type="number"
           placeholder="votre reduction"
         />
         <div className="form-group mt-2">
           <button type="submit" className="btn btn-success">
             Enregister
           </button>
           <Link to="/Customers" className="btn btn-link">
             retour a la liste des clients
           </Link>
         </div>
       </form>
     </>
   );
}
 
export default SettingUserPage;