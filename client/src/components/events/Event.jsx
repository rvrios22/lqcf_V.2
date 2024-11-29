import React, { useState } from "react";
import "../../css/events.css";
import dateFormater from "../../helpers/getDate";

function Event({ event, setEventsArray, eventsArray }) {
  const [isEventEditable, setIsEventEditable] = useState(false);
  const [editedEvent, setEditedEvent] = useState({
    title: event.title,
    date: event.date,
    description: event.description,
  });
  const submitEdit = async (e, id) => {
    e.preventDefault();
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedEvent),
    };
    try {
      const response = await fetch(
        `http://localhost:3001/events/${id}`,
        options
      );
      const data = await response.json();
      const foundEvent = {
        ...eventsArray.find((e) => e.id === event.id),
        title: editedEvent.title,
        date: editedEvent.date,
        description: editedEvent.description,
      };
      const filteredEvents = eventsArray.filter((e) => e.id !== event.id);
      const newArray = [...filteredEvents, foundEvent];
      newArray.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      setEventsArray(newArray);
      console.log(data);
      setIsEventEditable(false);
    } catch (err) {
      console.error(err);
    } finally {
      // setIsEventEditable(false);
    }
  };

  const handleDete = async (id) => {
    const options = {
      method: "DELETE",
    };
    try {
      const response = await fetch(
        `http://localhost:3001/events/${id}`,
        options
      );
      const data = await response.json();
      setEventsArray(
        eventsArray.filter((e) => {
          return e.id !== event.id;
        })
      );
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const displayEvent = (
    <>
      <h3 className="event-header">{event.title}</h3>
      <p className="event-text">{event.description}</p>
      <p className="event-date">{dateFormater(event.date)}</p>
    </>
  );

  const editEvent = (
    <form
      onSubmit={(e) => {
        submitEdit(e, event.id);
      }}
      method="post"
    >
      <input
        type="text"
        name="title"
        placeholder={event.title}
        onChange={(e) =>
          setEditedEvent({
            ...editedEvent,
            title: e.target.value,
          })
        }
      />
      <textarea
        name="description"
        id=""
        placeholder={event.description}
        onChange={(e) =>
          setEditedEvent({
            ...editedEvent,
            description: e.target.value,
          })
        }
      ></textarea>
      <input
        type="date"
        name="date"
        value={editedEvent.date.split("T")[0]}
        onChange={(e) =>
          setEditedEvent({
            ...editedEvent,
            date: e.target.value,
          })
        }
      />
      <input type="submit" value="Edit" className="submit-button" />
    </form>
  );

  return (
    <div className="">
      <button
        onClick={() => {
          handleDete(event.id);
        }}
      >
        Delete
      </button>
      <button
        onClick={() => {
          setIsEventEditable(!isEventEditable);
        }}
      >
        Edit
      </button>
      {isEventEditable ? editEvent : displayEvent}
      <hr />
    </div>
  );
}

export default Event;
