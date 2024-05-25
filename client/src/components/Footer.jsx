import React from "react";
import github from "../assets/github.svg";
import { Button, Container } from "react-bootstrap";


const Footer = () => {
<Container id="footer" className="flex flex-col items-center mt-20">
  <h3 className="text-xl font-bold mb-4 text-center">Created by</h3>
  <div className="git-buttons flex flex-wrap justify-center">
    <Button className="flex items-center justify-center p-2 rounded-full text-white bg-gray-800 custom-footer-button">
      <a className="flex items-center" href="https://github.com/heeyitsrissa/" target="_blank" rel="noopener noreferrer">
        <img src={github} alt="github" className="flex h-6 pr-2" />
        Marissa
      </a>
    </Button>
    <Button className="flex items-center justify-center p-2 rounded-full text-white bg-gray-800 custom-footer-button">
      <a className="flex items-center" href="https://github.com/Levangul" target="_blank" rel="noopener noreferrer">
        <img src={github} alt="github" className="flex h-6 pr-2" />
        Levan
      </a>
    </Button>
    <Button className="flex items-center justify-center p-2 rounded-full text-white bg-gray-800 custom-footer-button">
      <a className="flex items-center" href="https://github.com/Jetniksyla" target="_blank" rel="noopener noreferrer">
        <img src={github} alt="github" className="flex h-6 pr-2" />
        Jetnik
      </a>
    </Button>
    <Button className="flex items-center justify-center p-2 rounded-full text-white bg-gray-800 custom-footer-button">
      <a className="flex items-center" href="https://github.com/marphco" target="_blank" rel="noopener noreferrer">
        <img src={github} alt="github" className="flex h-6 pr-2" />
        Marco
      </a>
    </Button>
  </div>
</Container>
}

export default Footer