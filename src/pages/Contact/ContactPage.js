import React from 'react'
import Header from '../../ShopWeb/header/Header'
import Footer from '../../ShopWeb/footer/Footer'
import '../Contact/ContactPage.css'

export default function ContactPage() {
  return (
    <div>
        <Header/>
        <div className="container">
	<div className="row">
			<h1 className='con'>contact us</h1>
	</div>
	<div className="row">
			<h4 className='text-center'>We'd love to hear from you!</h4>
	</div>
	<div className="row input-container">
			<div className="col-xs-12">
				<div className="styled-input wide">
					<input type="text" required />
					<label>Name</label> 
				</div>
			</div>
			<div className="col-md-6 col-sm-12">
				<div className="styled-input">
					<input type="text" required />
					<label>Email</label> 
				</div>
			</div>
			<div className="col-md-6 col-sm-12">
				<div className="styled-input">
					<input type="text" required />
					<label>Phone Number</label> 
				</div>
			</div>
			<div className="col-xs-12">
				<div className="styled-input wide">
					<textarea required></textarea>
					<label>Message</label>
				</div>
			</div>
			<div className="col-xs-12">
				<div className="btn-lrg submit-btn">Send Message</div>
			</div>
	</div>
</div>

        <Footer/>
    </div>
  )
}
