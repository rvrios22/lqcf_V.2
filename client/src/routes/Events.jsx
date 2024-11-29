import React, { useEffect, useState } from "react";
import Event from "../components/events/Event";
import AddEventForm from "../components/events/AddEventForm";

function Events() {
  const [eventsArray, setEventsArray] = useState([]);

  const fetchEvents = async () => {
    const response = await fetch(`http://localhost:3001/events`);
    const data = await response.json();
    setEventsArray(data.events);
  };

  const sortEventsByDate = () => {
    const eventsCopy = [...eventsArray];
    eventsCopy.sort((a, b) => {
      return new Date(b.updateAt) - new Date(a.updatedAt);
    });
    setEventsArray(eventsCopy);
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  
  return (
    <div className="general-container">
      <h1 className="sub-header">Upcoming Events:</h1>
      {eventsArray.map((event) => (
        <Event
          key={event.id}
          event={event}
          setEventsArray={setEventsArray}
          eventsArray={eventsArray}
        />
      ))}
      <AddEventForm setEventsArray={setEventsArray} eventsArray={eventsArray} />
    </div>
  );
}

export default Events;
