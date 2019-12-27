import React from "react";

const Footer = props => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="copy-right">
      <div className="copyright">
        © {currentYear}{" "}
        <a href="http://taskids.net/" target="_blank">
          Taskids
        </a>{" "}
        - Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
