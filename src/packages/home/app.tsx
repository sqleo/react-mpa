import React from "react";
import ReactDom from "react-dom";
import a from  "@src/containers/assets/images/images.png"
import "./index.scss"

const element = <div>asd
  <img src={a} alt="" />
</div>
ReactDom.render(element, document.getElementById('root'))