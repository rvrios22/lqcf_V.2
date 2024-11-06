import React from "react";
import Person from "./Person";

function PersonMapper({ data }) {
  return (
    <main>
      {data.map((person, idx) => (
        <Person
          key={idx}
          img={person.img}
          name={person.name}
          bio={person.bio}
          link={person.fetch}
        />
      ))}
    </main>
  );
}

export default PersonMapper;
