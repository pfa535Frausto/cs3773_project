import React from 'react'
import "./Home.css";
import Product from "./Product";


function Home() {
  return (
    <div className='home'>
        <div className="home__container">
            <img className="home__image" src="./images/fading_image.jpg" alt=""/>

            <div className="home__row">
                <Product id="3" title="Amazon Fire Tablet" image="./images/Amazon_Fire_Tablet.jpg" price={149.99} rating={4} />
                <Product id="2" title="Apple Tablet" image="./images/apple_tablet.jpg" price={299.99} rating={2}/>
            </div>

            <div className="home__row"> 
                <Product id="8" title="MSI Z690 Godlike" image="./images/MSI_Z690_Godlike.jpg" price={899.99} rating={5}/>
                <Product id="9" title="ASUS Z690 ROG Maximus" image="./images/ASUS_Z690_ROG_Maximus.png" price={899.95} rating={5}/>
                <Product id="10" title="Gigabyte Z690 Aorus Extreme" image="./images/Gigabyte_Z690_Aorus_Extreme.jpg" price={859.59} rating={4}/>
            </div>

            <div className="home__row">
                <Product id="22" title="RTX3090TI FTW3" image="./images/RTX3090TI_FTW3.png" price={2099.98} rating={5}/>
            </div>

        </div>
    </div>
  )
}

export default Home