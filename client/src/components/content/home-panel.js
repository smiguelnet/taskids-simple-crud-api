import React from "react";
import imageApp from "../../assets/images/app.png";

const HomePanel = props => {
  return (
    <div className="container mb50">
      <div className="row center mb-par">
        <img src={imageApp} className="img-responsive center" alt="Taskids.net" />
      </div>
      <div className="row space-par text-center">
        <div className="col-sm-8 col-sm-offset-2 color-white pink">
          <h3>API v.0.1.1</h3>
        </div>
        <div className="col-sm-8 col-sm-offset-2 color-white pink2">
          <h5>Gest&#227;o de Usu&#225;rios, Tarefas e Recompensas</h5>
        </div>
      </div>
    </div>
  );
};
export default HomePanel;
