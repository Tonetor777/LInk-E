import React from 'react'
import { Link } from 'react-router-dom';
import './Home.css';
import logo from '../assets/logos.png'
import funeral  from "../assets/Images/home_page/funeral.jpg";
import concert  from "../assets/Images/home_page/concert.jpg";
import graduation  from "../assets/Images/home_page/graduation.jpg";
import wedding  from "../assets/Images/home_page/wedding.jpg";
import cake3 from "../assets/Images/birthday/cake3.jpg";
import Navbar from './Navbar';
import Footer from './Footer';



export default function Home() {
  return (
    <>
   <Navbar />
   <div className="head h-[300px] pt-[50px] scroll-smooth">
      <div className="flex flex-col items-center justify-center gap-4 ">
        <p className=' sm:w-[80%] md:w-[60%] font-extrabold font-mono lg:text-4xl  md:text-2xl text-xl text-center'>
          Find the Perfect Services for Your Event
        </p>
        <p className='w-[60%] font-semibold font-sans lg:text-2xl  md:text-lg sm:text-sm text-center hidden lg:block'>
          Discover a world of seamless event planning with our platform.
          Connecting you with a curated network of top-notch service providers,
          we make every moment memorable.
        </p>
      
         <div className=' flex justify-center gap-2 md:mt-8'>
          <input
            className="search rounded-md h-10 md:w-[350px] md:h-12"
            type="search"
            placeholder="Search Services"
            aria-label="Search"
          />
          <button className="bg-blue-600 h-10 md:h-12 rounded-md" type="submit">
            Search
          </button>
          </div>
      </div >
      </div>
    
  
  <main className="services">
    <section className="wedding light">
      <img
        className="services_img"
        src={wedding}
        alt=""
      />
      <div className="wedding_desc light_desc">
        <h1>Wedding</h1>
        <p>
          Embark on your journey of love with our exquisite wedding services.
          From enchanting venues to skilled planners, visionary decorators, and
          talented photographers – we've curated a selection of the finest
          wedding professionals to turn your dreams into a reality. Immerse
          yourself in a world of personalized elegance, where every detail is
          crafted to perfection. Our wedding experts are dedicated to bringing
          your unique love story to life, ensuring a day that is as
          extraordinary and beautiful as your forever bond. Let us transform
          your special day into a cherished masterpiece, leaving you free to
          savor each moment of joy, love, and celebration
        </p>
        <Link to="/services/Wedding">
          <button className="button explore" type="submit">
            EXPLORE
          </button>
        </Link>
      </div>
    </section>
    <section className="birthday blue">
      <div className="birthday_desc blue_desc">
        <h1>Birthday</h1>
        <p>
          Make every birthday an unforgettable celebration with our bespoke
          birthday services. From vibrant party venues to creative theme setups,
          professional entertainers, and delightful catering – we specialize in
          crafting magical moments for every age. Whether it's a milestone event
          or a fun-filled kids' party, our team of experts is committed to
          turning your vision into a reality. Imagine a hassle-free celebration
          where all you need to do is enjoy the laughter, smiles, and joy. Let
          us take care of the details, ensuring that your birthday celebration
          is a seamless and joyous experience. With our personalized approach,
          every birthday becomes a cherished memory waiting to be created
        </p>
        <Link to="/services/Birthday">
          <button className="button explore" type="submit">
            EXPLORE
          </button>
        </Link>
      </div>
      <img
        className="services_img"
        src={cake3}
        alt=""
      />
    </section>
    <section className="concert light">
      <img
        className="services_img"
        src={concert}
        alt=""
      />
      <div className="concert_desc light_desc">
        <h1>Concert</h1>
        <p>
          Step into the spotlight with our unparalleled concert services, where
          every note, every beat, and every moment is orchestrated to
          perfection. Whether you're an artist looking for a stage to showcase
          your talent or an event organizer aiming to create a show-stopping
          experience, our concert services are tailored to elevate your
          performance to new heights. Join us on a journey where passion meets
          precision, and where the energy of live music resonates with the
          audience, creating memories that echo long after the last encore. Let
          us set the stage for your musical masterpiece, ensuring an
          unforgettable concert experience for performers and audiences alike
        </p>
        <Link to="/services/Concert">
          <button className="button explore" type="submit">
            EXPLORE
          </button>
        </Link>
      </div>
    </section>
    <section className="funeral blue">
      <div className="funeral_desc blue_desc">
        <h1>Funeral</h1>
        <p>
          During times of sorrow, our funeral services provide a comforting
          embrace, guiding you through the delicate process of saying goodbye to
          a cherished life. With compassion as our cornerstone, we offer support
          in crafting a meaningful farewell that honors the memory of your loved
          one. Trust us to create a dignified and heartfelt farewell, allowing
          you to focus on remembrance and finding solace. In these moments of
          grief, let us be your pillar of strength, providing compassion and
          support to ease the journey of saying goodbye.
        </p>
        <a href="/Funeral">
          <button className="button explore" type="submit">
            EXPLORE
          </button>
        </a>
      </div>
      <img
        className="services_img"
        src={funeral}
        alt=""
      />
    </section>
    <section className="graduation light">
      <img
        className="services_img"
        src={graduation}
        alt=""
      />
      <div className="graduation_desc light_desc">
        <h1>Graduation</h1>
        <p>
          Embark on a new chapter of achievement and celebrate your academic
          journey with our specialized graduation services. Whether you're an
          educational institution organizing a commencement ceremony or a
          graduate seeking the perfect setting for your milestone achievement,
          we are here to make your graduation memorable. Step onto the stage
          with confidence, knowing that your graduation day is marked by
          precision, pride, and the promise of a bright future. Let us be a part
          of your academic success story, ensuring that your graduation is a
          momentous occasion filled with joy, recognition, and the anticipation
          of exciting possibilities ahead.
        </p>
        <Link to="/services/Graduation">
          <button className="button explore" type="submit">
            EXPLORE
          </button>
        </Link>
      </div>
    </section>
    <section className="login">
      <div className="customer">
        <p>
          Discover a world of convenience and personalized services tailored
          just for you. As a valued customer on our platform, you're invited to
          explore a diverse array of offerings, from event planning to catering,
          photography, and more. Our user-friendly interface empowers you to
          effortlessly find and connect with the perfect service providers to
          bring your visions to life. Whether you're planning a wedding,
          birthday celebration, or any special event, our platform ensures a
          seamless experience. Enjoy the ease of browsing through curated
          options, reading reviews, and making informed decisions. Your
          satisfaction is our priority, and we're here to transform your ideas
          into memorable experiences. Join us in creating moments that last a
          lifetime – where your dreams become reality.
        </p>
        <a href="/login">
          <button className="button explore" type="submit">
            Login
          </button>
        </a>
      </div>
      <div className="service_providers">
        <p>
          Join our vibrant community of service providers and showcase your
          expertise on our premier platform. Registering your service is your
          gateway to connecting with a diverse audience seeking your talents.
          Whether you're a wedding planner, photographer, caterer, or
          entertainer, our user-friendly registration process allows you to
          highlight your unique offerings. Unlock a world of opportunities to
          grow your business, expand your clientele, and gain visibility in your
          industry. Our platform provides a seamless space to feature your
          portfolio, receive inquiries, and manage bookings effortlessly.
          Elevate your online presence and become a trusted partner in creating
          unforgettable moments. Register today and step into a world where your
          skills shine, and your business thrives.
        </p>
        <a href="/ServiceProviderssignup">
          <button className="button explore" type="submit">
            Register
          </button>
        </a>
      </div>
    </section>
  </main>
  <Footer />
</>
  )
}