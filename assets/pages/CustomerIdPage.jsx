import React, {useState, useEffect} from 'react';
import CustomersAPI from '../services/customersAPI';
import GoogleMapReact from 'google-map-react';
import axios from "axios";
import Marker from '../components/beachflag.png';
import Geocode from "react-geocode"; 
import '../styles/custom.css';


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

// Get address from latitude & longitude.
// Geocode.fromLatLng("46.02688209999999", "4.0864872").then(
//   (response) => {
//     const address = response.results[0].formatted_address;
//     console.log(address);
//   },
//   (error) => {
//     console.error(error);
//   }
// ); 
  
// Get formatted address, city, state, country from latitude & longitude when
// Geocode.setLocationType("ROOFTOP") enabled
// the below parser will work for most of the countries
// Geocode.fromLatLng("46.0300641", "4.0851551").then(
//   (response) => {
//     const address = response.results[0].formatted_address;
//     let city, state, country;
//     for (let i = 0; i < response.results[0].address_components.length; i++) {
//       for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
//         switch (response.results[0].address_components[i].types[j]) {
//           case "locality":
//             city = response.results[0].address_components[i].long_name;
//             break;
//           case "administrative_area_level_1":
//             state = response.results[0].address_components[i].long_name;
//             break;
//           case "country":
//             country = response.results[0].address_components[i].long_name;
//             break;
//         }
//       }
//     }
//     console.log(city, state, country);
//     console.log(address);
//   },
//   (error) => {
//     console.error(error);
//   }
// );




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

    // AIzaSyA-4g_KnJ74Mp0CROM02GuvoJJ4vqwd9EU

    useEffect(() => {
      fetchCustomer(id);
    }, [id]);

    console.log(customer);

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

        
          // useEffect(() => {
          //   setTimeout(() => {
          //     geoCodeWithGoogleMap(customer.address+customer.city);
          //   }, 3000);
          // }, [customer.address,customer.city]);

       
        // useEffect(() => {
        //   (async () => {
        //      geoCodeWithGoogleMap(props.center);
             
        //    })();
        // }, [props.center]);

        

    //`address=${customer.city}`


    const AnyReactComponent = ({MarkerMap}) => <img src={Marker}/>;


    
    
   

    // const  defaultProps  = {
    //     center: {
    //       lat: geocode.lat,
    //       lng: geocode.lng
    //     },
    //     zoom: 18
    //   };

      // console.log("defaultProps",defaultProps);

      // const propsgeocode = {
      //   center: {
      //     lat: geocode.lat,
      //     lng: geocode.lng
      //   },
      //   zoom: 18
      // };

      // console.log("propsgeocode",propsgeocode);

    
    return ( <>
        <h1 className="text-center title-customer">{customer.firstName} {customer.lastName} </h1>
        <div className="row justify-content-center">
            <p className='text-center mt-5'>{customer.service}  
            {customer.fidelityPoints.map((points) => (
                <span key={points.id} className="pl-5">
                   {points.pointFidelityCustomer} point
                </span>
              ))}
              </p>
              <p>phone : {customer.phone}</p>
              <p>email: {customer.email}</p>
              <p>{customer.address}</p>
              <p>{customer.zipcode}</p>
              <p>{customer.city}</p>
              
            
        </div>
        <div style={{ height: '50vh', width: '50%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC6wewbwA4OTyKuDe0J6l7GgQSFM1NeQ4U'}}
          // defaultCenter={defaultProps.center}
          // defaultZoom={defaultProps.zoom}
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
        
      
    </> );
}
 
export default CustomerIdPage;