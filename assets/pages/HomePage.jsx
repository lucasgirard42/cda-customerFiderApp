import React from 'react';

const HomePage = (props) => {
    return ( 
<div className="container bg-light p-5">
	  <h1 className="display-4">Jumbotron</h1>
	  <p className="lead">This is  a jumbotron created using the bootstrap 5</p>
	  <hr className="my-4" />
	  <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
	  <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
	</div>
     );
}
 
export default HomePage;