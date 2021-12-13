import React from 'react';
import { Link } from "react-router-dom";
import logo from '../components/logo2.png'
import imgLandingPage from '../components/image-template.jpg';
import mobileImg from '../components/mobile.jpg'; 
import {FaWindows, FaGooglePlay} from "react-icons/fa";


const HomePage = (props) => {
    return ( 

		<div className=" bg-light p-3">
			
			<img src={logo} alt="logo" className='logo-app mx-auto d-block ' />
			<img src={imgLandingPage} alt="landingPage" className='imgLanding mx-auto d-block ' />

			<p className="lead text-center mt-5 ">Iam in altera philosophiae parte. quae est quaerendi ac disserendi, quae logikh dicitur, iste</p>

			<div class="d-grid gap-2 col-2 mx-auto mt-5">
				<Link to="/customers" class="btn btn-primary" type="button">Let's Get Started !</Link>
			</div>
			<div className='sectionTitleApp row mt-5 p-3'>
				<img src={mobileImg} alt='img de téléphone' className='imgMobile col-6 mx-auto ' />
				<div className='col-xl-6 col-lg-12 mt-5 text-center'>
					<h2 className='tittleApp mt-5' >Titre de l'application</h2>
					<p className='mt-5'>Lorem ipsum dolor sit amet. Qui velit totam qui cupiditate galisum non sint consequatur est perspiciatis expedita quo 
						quasi dolores et delectus rerum. Vel praesentium aperiam et iure dicta et esse aliquid est corrupti expedita.
					Et optio voluptatem ab magnam autem est totam veniam ea tempora ducimus. Ut nemo tenetur ea rerum nihil sed perferendis assumenda ex molestiae autem. 
					Et nihil labore ad placeat impedit vel odit quia aut perspiciatis fugiat. Et atque quod et iusto harum et iure dolorem a deserunt aperiam qui voluptatem impedit ut temporibus temporibus.
					</p>
				</div>
			</div>
			<div className='sectionTitleApp articleApp row   pt-5 '>
				<div className=' col-xl-6 col-lg-12 mt-5 text-center'>
					<h2 className='tittleApp mt-5' >Titre de l'article</h2>
					<p className='mt-5'>Lorem ipsum dolor sit amet. Qui velit totam qui cupiditate galisum non sint consequatur est perspiciatis expedita quo 
						quasi dolores et delectus rerum. Vel praesentium aperiam et iure dicta et esse aliquid est corrupti expedita.
					Et optio voluptatem ab magnam autem est totam veniam eiam qui voluptatem impedit ut temporibus temporibus.
					</p>
				</div>
				<img src={mobileImg} alt='img de téléphone' className='imgMobile col-6 mx-auto' />
			</div>
			<div className='sectionAppMobileAndDeskTop row mt-5 p-3'>
				<img src={imgLandingPage} alt="imageDeTransition" className='imgMobile col-6 mx-auto d-block' />
				<div className='col-xl-6 col-lg-12 mt-5 '>
					<div className='row'>
						<p className='mt-5 text-center'>Lorem ipsum dolor sit amet. Qui velit totam qui cupiditate galisum non sint consequatur est perspiciatis expedita quo 
											quasi dolores et delectus rerum. Vel praesentium aperiam et iure dicta et esse aliquid est corrupti expedita.
											Et optio voluptatem ab magnam autem est totam veniam eiam qui voluptatem impedit ut temporibus temporibus.
						</p>
						<div class="d-grid gap-2 col-lg-6 col-xl-4 mt-3 mx-auto ">
						
							<Link to="/customers" class="btn btn-primary" type="button"><FaWindows /> app desktop</Link>
						</div>
						<div class="d-grid gap-2 col-lg-6 col-xl-4 mt-3 mx-auto ">
							<Link to="/customers" class="btn btn-primary" type="button"><FaGooglePlay/> app mobile</Link>
						</div>
					</div>
				</div>
			</div>
		</div>

     );
}
 
export default HomePage;