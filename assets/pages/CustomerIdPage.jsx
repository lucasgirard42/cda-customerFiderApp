import React, {useState, useEffect} from 'react';
import CustomersAPI from '../services/customersAPI';
import GoogleMapReact from 'google-map-react';
import axios from "axios";
import Marker from '../components/beachflag.png';
import Geocode from "react-geocode"; 
import '../styles/custom.css';
import {FaUserAlt,FaPhone, FaAt} from 'react-icons/fa';


const CustomerIdPage = (props) => {


  Geocode.setApiKey("AIzaSyA-4g_KnJ74Mp0CROM02GuvoJJ4vqwd9EU");
  Geocode.setLanguage("fr");
  Geocode.setRegion("fr");
  // set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

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

      const [geocode, setGeocode] = useState({
        lat:"",
        lng:"",
      })

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

    // console.log(customer);

     // Get latitude & longitude from address.
    const geoCodeWithGoogleMap = async () => {
      Geocode.fromAddress(customer.address + customer.city).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          // console.log("ppl ", test);
          setGeocode({ lat, lng });
        },
        (error) => {
          console.error(error);
        }
      );
    };
     
    
        useEffect(() => {
          geoCodeWithGoogleMap(customer.address + customer.city);
        }, [customer.address, customer.city]); 

    

    const AnyReactComponent = ({MarkerMap}) => <img src={Marker}/>;

    
    return ( <>
   
        <h1 className="text-center title-customer">{customer.firstName} {customer.lastName} </h1>
        <FaUserAlt className='iconCustomer mx-auto d-block mt-5' />
    <div className='bg-light mt-5 p-3'>
        <div className="row d-block ">
          <p className='text-center mt-5 col-12 mx-auto '>{customer.service}  
            {customer.fidelityPoints.map((points) => (
              <p key={points.id} className="col-12 mt-3 mx-auto ">
                   {points.pointFidelityCustomer} point
              </p>
              ))}
          </p>
        </div>
        <div className='row m-5 text-center'>
          <p className='col-6 '><FaPhone/>  phone : {customer.phone}</p>
          <p className='col-6 mx-auto'><FaAt/>  email: {customer.email}</p>
        </div>
      <div className='adressCustomer row d-flex mt-5'>
        <div className='col-xl-6 col-lg-12 '>
            <p className='col-12 '>{customer.address}</p>
            <p className='col-12 mt-3'>{customer.zipcode}</p>
            <p className='col-12 mt-3'>{customer.city}</p> 
        </div>
        <div className='col-xl-6 col-lg-12 googleMap' style={{ height: '50vh', width: '50%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyC6wewbwA4OTyKuDe0J6l7GgQSFM1NeQ4U'}}
                defaultZoom={18}
                center={geocode}
                >
                <AnyReactComponent
                  lat={geocode.lat}
                  lng={geocode.lng}
                  MarkerMap
                  />
              </GoogleMapReact>
        </div>
      </div>
    </div>
    </> );
}
 
export default CustomerIdPage;