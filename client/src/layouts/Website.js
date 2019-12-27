import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import HomePanel from "../components/content/home-panel";

const Website = props => {
  return (
    <React.Fragment>
      <div className="containers">
        <div className="main">
          <Header />
          <section className="section fullscreen site-main">
            <div className="container-section mbP">
              <HomePanel />
            </div>
          </section>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Website;
