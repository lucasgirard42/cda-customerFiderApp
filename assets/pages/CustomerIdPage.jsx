import React, {useState, useEffect} from 'react';
import CustomersAPI from '../services/customersAPI';
import GoogleMapReact from 'google-map-react';
import axios from "axios";

const CustomerIdPage = (props) => {

    const {id } = props.match.params;
    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        phone: "",
        address: "",
        zipcode: "",
        city: "",
        society: "",
        // image: "",
        service: "",
        fidelityPoints: [
          {
              id:"",
            pointFidelityCustomer: "",
          }
        ]
      });

    

    

    const fetchCustomer = async (id) => {
        try {
            const {firstName, lastName, email, phone, address, zipcode, city, society, service, fidelityPoints} = await CustomersAPI.find(id);
            setCustomer({firstName, lastName, email, phone, address, zipcode, city, society, service, fidelityPoints })
        } catch (error) {
            console.log(error.response);
        }
    }


    useEffect(() => {
      fetchCustomer(id);
    }, [id]);

    console.log(customer);

    const fetchGeoCode = async () => {
        try {
            const data = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway&key=AIzaSyA-4g_KnJ74Mp0CROM02GuvoJJ4vqwd9EU')
            console.log(data);
            
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        fetchGeoCode();
    }, [])


    const AnyReactComponent = ({ text }) => <div>{text}</div>;

    const  defaultProps = {
        center: {
          lat: 45.439695,
          lng: 	4.3871779
        },
        zoom: 15
      };

    
    return ( <>
        <h1 className="text-center">{customer.firstName} {customer.lastName} </h1>
        <div>
            <p>{customer.service} </p>
            {customer.fidelityPoints.map((points) => (
                <p key={points.id} className="text-center">
                  {points.pointFidelityCustomer} point
                </p>
              ))}
              <p>phone : {customer.phone}</p>
              <p>email: {customer.email}</p>
              <p>{customer.address}</p>
              <p>{customer.zipcode}</p>
              <p>{customer.city}</p>
              
            
        </div>
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC6wewbwA4OTyKuDe0J6l7GgQSFM1NeQ4U'}}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={45.439695}
            lng={	4.3871779}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
        
      
    </> );
}
 
export default CustomerIdPage;