import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../UserContext.jsx";

export default function IndexPage() {
  const [tours, setTours] = useState([]);
  const { showNotification } = useUserContext();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get("/tours");
        setTours(res.data.data.data);
      } catch (error) {
        if (error.response) {
          showNotification(
            error.response.data.message ||
              "An error occurred while fetching tours"
          );
        } else {
          showNotification("Network error: Unable to fetch tours");
        }
        console.error("Failed to fetch tours:", error);
      }
    };

    fetchTours();
  }, [showNotification]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };
  // grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  return (
    <div className="py-4 px-32 mt-8 grid gap-16 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ">
      {tours.length > 0 &&
        tours.map((tour) => (
          <div
            key={tour.id}
            className="tour-card border shadow-md shadow-gray-200 max-w-sm"
          >
            <div className="relative tour-card-cover">
              <img
                src={`/img/tours/${tour.imageCover}`}
                alt={tour.title}
                className="tour-card-image  trapezoid-image"
              />

              <div className="absolute text-lg uppercase tour-name">
                {tour.name}
              </div>
            </div>
            <div className="tour-info m-6">
              <h2 className="tour-intro font-bold my-1 uppercase">
                <span> {tour.difficulty}</span>
                <span> {tour.duration}-DAY TOUR</span>
              </h2>
              <p className="tour-summary text-sm text-gray-500 mb-4">
                {tour.summary}
              </p>
              <div className="tour-specs grid grid-cols-2 my-2">
                <div className="text-gray-500 flex items-center my-2">
                  <svg className="w-6 h-6 text-gray-500" fill="#00712d">
                    <use xlinkHref="/img/icons.svg#icon-map-pin" />
                  </svg>
                  <span className="ml-2">{tour.startLocation.description}</span>
                </div>

                <div className="text-gray-500 flex items-center my-2">
                  <svg className="w-6 h-6 text-gray-500" fill="#00712d">
                    <use xlinkHref="/img/icons.svg#icon-calendar" />
                  </svg>
                  <span className="ml-2">
                    {" "}
                    {formatDate(tour.startDates[0])}
                  </span>
                </div>
                <div className="text-gray-500 flex items-center my-2">
                  <svg className="w-6 h-6 text-gray-500" fill="#00712d">
                    <use xlinkHref="/img/icons.svg#icon-flag" />
                  </svg>
                  <span className="ml-2"> {tour.locations.length} stops</span>
                </div>

                <div className="text-gray-500 flex items-center my-2">
                  <svg className="w-6 h-6 text-gray-500" fill="#00712d">
                    <use xlinkHref="/img/icons.svg#icon-user" />
                  </svg>
                  <span className="ml-2">{tour.maxGroupSize} people</span>
                </div>
              </div>
            </div>
            <div className="tour-bookingDetails flex justify-between items-center bg-gray-100">
              <div className="my-4 ml-8">
                <div className="flex items-center">
                  <span className="font-bold">${tour.price}</span>
                  <span className="text-gray-500 ml-2 text-sm">per person</span>
                </div>
                <div>
                  <span className="font-bold">{tour.ratingsAverage}</span>
                  <span className="text-gray-500 m-1 text-sm"> Rating</span>
                  <span className="text-gray-500  text-sm">
                    ({tour.ratingsQuantity})
                  </span>
                </div>
              </div>
              <Link
                to={`/tours/${tour.id}`}
                className="border border-gray-300 rounded-full shadow-md px-6 py-1 mr-8  text-center text-white inline-block bg-primary"
              >
                DETAILS
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}
