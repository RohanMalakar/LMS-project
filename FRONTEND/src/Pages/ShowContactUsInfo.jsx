import React, { useState, useEffect } from "react";
import axiosInstance from "../Hellers/axiosinstance.js";
import Homelayout from "../Layouts/Homelayout.jsx";

const ShowContactUsInfo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/data/contact");
        let result = response.data.data;
        const formattedData = result.map((item) => ({
          name: item.name,
          email: item.email,
          message: item.message,
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-teal-500">Loading...</div>;
  }

  if (!data.length) {
    return <div className="text-center py-10 text-teal-500">No data available.</div>;
  }

  return (
    <Homelayout>
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">User Messages</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full px-10 border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2 text-left text-black">Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-black">Email</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-black">Message</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-teal-500 hover:font-bold hover:text-black cursor-pointer">
                <td className="border border-gray-200 w-[20%] px-4 py-2">{item.name}</td>
                <td className="border border-gray-200 w-[30%] px-4 py-2">{item.email}</td>
                <td className="border border-gray-200 px-4 py-2">{item.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </Homelayout>
  );
};

export default ShowContactUsInfo;
