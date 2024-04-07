import React, { useState, useEffect } from "react";
import { getMark } from "../apis/marks";
import { Chart } from "react-google-charts";

const defaultData = {
  MarksA: 0,
  MarksB: 0,
  MarksC: 0,
  MarksD: 0,
  MarksE: 0,
}

function MarksBarGraph({ width, height }) {
  const [marks, setMarks] = useState(defaultData);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setEmail(token);
      fetchMarks(token);
    }
  }, []);

  const fetchMarks = async (email) => {
    try {
      const response = await getMark(email);
      if (response.data) {
        setMarks(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching marks:", error);
      setError("An error occurred while fetching data.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
    <div className="relative">
          <h3 className="text-[25px] font-bold tracking-wider text-[#fff]">
            Email: {email}
          </h3>
        </div>

        {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <Chart
          width={'100%'}
          height={'100%'}
          chartType="Bar"
          loader={<div>Loading Chart...</div>}
          data={[
            ['Subject', 'Marks', { role: 'style' }],
            ['MarksA', marks.MarksA, '#FF5733'],
            ['MarksB', marks.MarksB, '#33FF57'],
            ['MarksC', marks.MarksC, '#5733FF'],
            ['MarksD', marks.MarksD, '#33FFFF'],
            ['MarksE', marks.MarksE, '#FFFF33'],
          ]}
          options={{
            chart: {
              title: 'Marks for Each Subject',
            },
            legend: { position: 'none' },
            backgroundColor: "none", // Add this line to remove the background color
            bars: 'vertical',
            colors: ['#FF5733', '#33FF57', '#5733FF', '#33FFFF', '#FFFF33'], // Custom bar colors
            chartArea: { width: '80%', height: '80%' },
            hAxis: {
              title: 'Marks',
              minValue: 0
            },
            vAxis: {
              title: 'Subject'
            },
          }}
        />
      )}
      </div>
  );
}

export default MarksBarGraph;
