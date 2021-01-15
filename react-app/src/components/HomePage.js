import React from 'react';
import { Redirect } from 'react-router-dom';

import '../stylesheets/homepage.css';

// const Header = styled.div`
// font-size: 35px;
// display: flex;
// align-items: center;
// justify-content: center;
// margin-top: 15px;
// position: relative;
// font-family: 'Fugaz One', cursive;
// z-index: 10;
// `

// const BackgroundImage = styled.div`
// overflow: hidden;
// background-image: url('https://images.pexels.com/photos/1081031/pexels-photo-1081031.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
// width: 100vw;
// height: 91vh;
// background-size: cover;
// display: flex;
// align-items: center;
// justify-content: center;
// z-index: -10;
// position: absolute;
// `
const HomePage = ({ authenticated, setAuthenticated }) => {
    if (authenticated) {
        return <Redirect to="/" />;
    }
    return(
        <div id='body'>
            <Header/>
            <Card 
                className='section'
                img='./Capture1.PNG'
                title='About ECOFridge' 
                description='ECOFridge is a sustainability minded dashboard for users to reduce wasted grocery items. ECOFridge visually prioritizes items that will parish first in the user’s refrigerator or pantry, and help users to make informed decisions when creating a grocery list to utilizes items that could otherwise be wasted. '
            />

            <Card 
                className='section bg-grey'
                img='./Capture3.PNG' 
                title='Our Values'
                description='Food waste prevention is one of the most important
                issues to tackle when it comes sustainability.  Food waste is the single largest component of solid waste reaching landfills and incinerators in the U.S., according to the EPA.
                ECOFridge is a tool to help users reduce their environmental impact.'
            />

            <Card 
                className='section'
                img='./Capture1.PNG' 
                title='Our Mission' 
                description='Our mission is to reduce food waste.'
            />
            <ContactContainer/>
        </div>
    );
}

const Header = () =>{
    return(
        <div className='header'>
            <span className='header-title'>
                ECOFridge
            </span>
            <br/>
       
        </div>
    );
}







const Card = (props) =>{
    return(
        <div className={props.className} >
            <div className="small-div">
                <i className={props.className}></i>
                <img src={props.img} alt=''/>
            </div>

            <div className="big-div">
                <span className='div-title'>
                    {props.title}
                </span>
                <br/>
                <span>
                    {props.description}
                </span>
            </div>
        </div>
    )
}



const ContactContainer = () => {
    return(
        <div className='contact-container bg-grey'>
            <span className="div-title">Contact us</span>
            <div className='contact-form'>
                <div id='sect1'>
                    <span>Contact us and we will get back to you within 24 hours.</span>
                    <span>
                        <i className="fas fa-map-marker-alt"></i>
                        John Hiestand
                    </span>
                    <span>
                        <i className="far fa-envelope"></i>
                        jgh2102@gmail.com
                    </span>
                </div>
                    
                <div id='sect2'>
                    <span>
                        Contact
                    </span>

                    <input type="text" placeholder="email address" className="input-field"/>
                    <textarea name="" id="" cols="30" rows="10" placeholder="comment"></textarea>
                    <button className="contact-btn">Send</button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;