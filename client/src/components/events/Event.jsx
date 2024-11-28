import React from "react";
import "../../css/events.css";
import dateFormater from "../../helpers/getDate";

function Event({ event }) {
  return (
    <div className="general-container">
      <h3 className="event-header">{event.title}</h3>
      <p className="event-text">{event.description}</p>
      <p className="event-date">{dateFormater(event.date)}</p>
      <hr />
    </div>
  );
}

export default Event;
