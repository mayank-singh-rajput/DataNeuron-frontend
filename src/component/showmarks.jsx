import React, { useState, useEffect } from "react";
import { getMark } from "../apis/marks";

function MarksFetch() {
  const [marks, setMarks] = useState([]);
  const [email, setEmail] = useState("");

  const fetchMarks = async (email) => {
    try {
      const response = await getMark(email);
      if (response.data) {
        setMarks(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching marks:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setEmail(token);
      fetchMarks(token);
    }
  }, []);

  return (
    <>
      <div className="w-full h-full">
        <div className="relative">
          <h3 className="text-[25px] font-bold tracking-wider text-[#fff]">
            Email: {email}{" "}
          </h3>
        </div>

        <div>
          <h3 className="text-xl mb-2">Marks:</h3>
          {marks ? (
            <ul>
              <li className="mb-2">MarksA: {marks.MarksA}</li>
              <li className="mb-2">MarksB: {marks.MarksB}</li>
              <li className="mb-2">MarksC: {marks.MarksC}</li>
              <li className="mb-2">MarksD: {marks.MarksD}</li>
              <li className="mb-2">MarksE: {marks.MarksE}</li>
            </ul>
          ) : (
            <p>No marks available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default MarksFetch;
