import React from "react";
import logo from "../../assets/images/logo.svg";

const Header = props => {
  return (
    <header className="header-site">
      <div className="logo-site animated">
        <img src={logo} />
      </div>
    </header>
  );
};

export default Header;
