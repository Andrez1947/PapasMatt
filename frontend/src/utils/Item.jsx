import React from "react";

export const Item = ({ Links, title }) => {
  return (
    <ul>
      <h1 className="mb-1 font-semibold">{title}</h1>
      {Links.map((Link) => (
        <li key={Link.nombre}>
          <a
            className="text-gray-400 hover:tex-teal-400 duration-300 text-sm curspr-pointer leading-6"
            href={Link.link}
          >
            {Link.nombre}
          </a>
        </li>
      ))}
    </ul>
  );
};