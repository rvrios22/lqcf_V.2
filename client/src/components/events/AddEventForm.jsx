import React, { useState } from "react";

function AddEventForm({ setEventsArray, eventsArray }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    try {
      const response = await fetch(`http://localhost:3001/events`, options);
      const data = await response.json();
      setEventsArray([...eventsArray, data.event]);
      console.log(data);
    } catch (err) {
      console.error(err);
      setEventsArray([...eventsArray]);
    } finally {
      setFormData({ title: "", date: "", description: "" });
    }
  };
  return (
    <form
      method="POST"
      onSubmit={(e) => {
        handleSubmit(e)
      }}
    >
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        required
        onChange={(e) =>
          setFormData({
            ...formData,
            title: e.target.value,
          })
        }
      />
      <label htmlFor="date">Date</label>
      <input
        type="date"
        id="date"
        name="date"
        value={formData.date}
        required
        onChange={(e) =>
          setFormData({
            ...formData,
            date: e.target.value,
          })
        }
      />
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id="description"
        value={formData.description}
        required
        onChange={(e) =>
          setFormData({
            ...formData,
            description: e.target.value,
          })
        }
      ></textarea>
      <input type="submit" value="Submit" className="submit-button" />
    </form>
  );
}

export default AddEventForm;
