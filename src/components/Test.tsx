import React from 'react';
import persons from '../sluzba.json';

export default function Test() {
  return (
    <div>
      {persons.map((person) => {
        return <div key={person.id}>{person.firstName} </div>;
      })}
    </div>
  );
}
