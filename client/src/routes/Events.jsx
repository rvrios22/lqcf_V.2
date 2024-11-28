import React, { useEffect, useState } from "react";
import Event from "../components/events/Event";

function Events() {
  const [eventsArray, setEventsArray] = useState([]);

  const fetchEvents = async () => {
    const response = await fetch(`http://localhost:3001/events`);
    const data = await response.json();
    setEventsArray(data.events);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <h1 className="sub-header">Upcoming Events:</h1>
      {eventsArray.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </>
  );
}

export default Events;
