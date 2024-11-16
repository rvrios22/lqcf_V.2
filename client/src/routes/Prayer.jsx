import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
function Prayer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_PUBLIC_KEY
      );
      setFormData({});
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="general-container">
      <h1 className="sub-header">Why Should We Pray?</h1>
      <p className="general-text">
        God commands that we join with other faithful Christians to pray over
        those who are seeking prayer.
      </p>
      <p className="bible-text">
        "Is any sick among you? Let him call for the elders of the church; and
        let them pray over him, anointing him with oil in the name of the Lord:
        And the prayer of faith shall save the sick, and the Lord shall raise
        him up; and if he have committed sins, they shall be forgiven him.”{" "}
        <span className="citation">James 5:14-15</span>
      </p>
      <h2 className="sub-header">Are You In Need of Prayer?</h2>
      <p className="general-text">
        Please full out our form to send us your prayer request and we will pray
        for you.
      </p>
      <form ref={formRef} onSubmit={handleSubmit}>
        <label className="general-text" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          required
          name="user_name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <label className="general-text" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          name="user_email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <label className="general-text" htmlFor="request">
          Prayer Request
        </label>
        <textarea
          id="request"
          required
          name="message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        ></textarea>
        <input type="submit" value="Submit" className="submit-button"/>
      </form>
    </div>
  );
}

export default Prayer;
