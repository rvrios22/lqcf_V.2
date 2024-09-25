import React from "react";
import "../css/footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer-child">
        <h3 className="sub-header">Service Times:</h3>
        <p className="general-text">Sunday Bible Study: 9:00AM</p>
        <p className="general-text">Sunday Service: 10:00AM</p>
        <p className="general-text">Wednesday Service: 6:30PM</p>
      </div>
      <div className="footer-child">
        <h3 className="sub-header">Church Address:</h3>
        <p className="general-text">
          50800 Calle Paloma<br></br>La Quinta CA 92253
        </p>
        <h3 className="sub-header">Mailing Address:</h3>
        <p className="general-text">P.O. Box 676 La Quinta CA 92247</p>
        <h3 className="sub-header">Contact Us:</h3>
        <p className="general-text">
          <a href="tel:760-564-9195">760-564-9195</a>
        </p>
        <p className="general-text">
          <a href="mailto:lqcf@verizon.net">lqcf@verizon.net</a>
        </p>
      </div>
      <div className="footer-child">
        <img
          src="./churchMap.avif"
          alt="A location of the church"
        />
      </div>
    </footer>
  );
}

export default Footer;
