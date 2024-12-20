import React, { useEffect, useRef, useState } from "react";

function PDFUploadForm() {
  const [studyList, setStudyList] = useState([]);
  const [formInputs, setFormInputs] = useState({
    title: "",
    study: "",
    date: new Date(),
    pdf: "",
  });
  const submitButton = useRef(null);

  const fetchStudies = async () => {
    try {
      const response = await fetch(`http://localhost:3001/study`);
      const data = await response.json();
      setStudyList(data.studies);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", formInputs.title);
    formData.append("studyName", formInputs.study);
    formData.append("date", formInputs.date);
    formData.append("pdf", formInputs.pdf);

    const options = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    };

    try {
      const response = await fetch(`http://localhost:3001/pdfs`, options);
      const data = await response.json();
      submitButton.current.blur();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudies();
  }, []);

  return (
    <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        required
        onChange={(e) =>
          setFormInputs({
            ...formInputs,
            title: e.target.value,
          })
        }
      />
      <label htmlFor="study">Study</label>
      <input
        type="text"
        name="studyName"
        list="study"
        required
        onChange={(e) =>
          setFormInputs({
            ...formInputs,
            study: e.target.value,
          })
        }
      />
      <datalist id="study">
        {studyList.map((study) => (
          <option key={study.id} value={study.name}>
            {study.name}
          </option>
        ))}
      </datalist>
      <label htmlFor="date">Date</label>
      <input
        type="date"
        id="date"
        name="date"
        onChange={(e) =>
          setFormInputs({
            ...formInputs,
            date: e.target.value,
          })
        }
      />
      <label htmlFor="pdf">PDF To Upload</label>
      <input
        type="file"
        id="pdf"
        name="pdf"
        required
        onChange={(e) =>
          setFormInputs({
            ...formInputs,
            pdf: e.target.files[0],
          })
        }
      />
      <input
        type="submit"
        value="Submit"
        className="submit-button"
        ref={submitButton}
      />
    </form>
  );
}

export default PDFUploadForm;
