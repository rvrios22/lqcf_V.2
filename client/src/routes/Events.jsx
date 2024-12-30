import React, { useEffect, useState } from "react";
import Event from "../components/events/Event";
import AddEventForm from "../components/events/AddEventForm";
import { useOutletContext } from "react-router-dom";

function Events() {
  const [eventsArray, setEventsArray] = useState([]);
  const { user } = useOutletContext();

  const fetchEvents = async () => {
    const response = await fetch(`/api/events`);
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
          user={user}
        />
      ))}

      {user && user.admin && (
        <AddEventForm
          setEventsArray={setEventsArray}
          eventsArray={eventsArray}
        />
      )}
    </div>
  );
}

export default Events;
