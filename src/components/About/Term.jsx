import React, { useState, useEffect } from "react";
import "./css/Term.css";

const Term = () => {
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch("/text/Term.txt");
        const data = await response.text();
        const lines = data.split("\n");
        setTerms(lines);
        console.log("reading...", data);
      } catch (error) {
        console.error("Error fetching terms:", error);
      }
    };
    fetchTerms();
  }, []);

  return (
    <>
      <div className="terms">
        <div className="terms--title">Điều khoản</div>
        <div className="terms--descriptions">
          {terms.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </div>
      </div>
    </>
  );
};

export default Term;
