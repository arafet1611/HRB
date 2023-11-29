import React from 'react';
import banner from "../assets/banner-img-02.svg";

function About() {
  return (
    <div>
      <section className="bg-light w-100">
        <div className="container">
          <div className="row d-flex align-items-center py-5">
            <div className="col-lg-6 text-start">
              <h1 className="py-5 text-primary typo-space-line">About Us</h1>
              <p className="light-300">
              Discover the future of HR management on our platform. From streamlined onboarding to powerful analytics, our user-friendly system caters to businesses of all sizes. Elevate your workforce management today
              </p>
              
            </div>
            <div className="col-lg-6">
              <figure className="td_figure">
                <img src={banner} alt="banner"/>
              </figure>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
