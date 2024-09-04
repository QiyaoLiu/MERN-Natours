import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { UserContext } from "../UserContext";

export default function TourPage() {
  const { id, slug } = useParams();
  const [tour, setTour] = useState(null);
  const [guides, setGuides] = useState(null);
  const [images, setImages] = useState(null);
  const [reviews, setReviews] = useState(null);
  const navigate = useNavigate();
  const { showNotification } = useContext(UserContext);

  useEffect(() => {
    if (!id) return;

    const fetchTour = async () => {
      try {
        const res = await axios.get(`/tours/${id}`);
        const fetchedTour = res.data.data.data;
        setTour(fetchedTour);
        setGuides(fetchedTour.guides || []);
        setImages(fetchedTour.images || []);

        // Update URL to include slug if it's not already there
        if (fetchedTour.slug !== slug) {
          navigate(`/tours/${id}/${fetchedTour.slug}`, { replace: true });
        }
      } catch (error) {
        console.error("Error fetching tour:", error);
        showNotification(
          error.response?.data?.message ||
            "An error occurred while fetching the tour."
        );
      }
    };

    fetchTour();
  }, [id, slug, navigate, showNotification]);

  useEffect(() => {
    if (!id) return;

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/tours/${id}/reviews`);
        setReviews(res.data.data.data || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        showNotification(
          error.response?.data?.message ||
            "An error occurred while fetching reviews."
        );
      }
    };

    fetchReviews();
  }, [id, showNotification]);

  if (!tour) return ""; // Handle loading state as needed

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  return (
    <div className="relative">
      <img
        src={`/img/tours/${tour.imageCover}`}
        alt={tour.title}
        className="tour-image trapezoid-image absolute"
      />
      <div className="grid mt-16 gap-x-2 grid-cols-1 md:grid-cols-[1fr_1.5fr] flex-1 z-10">
        <div className="bg-gray-100 px-8 pt-32 pb-16 flex flex-col ">
          <div>
            <p className="text-xl py-8">QUICK FACTS</p>
            <div className="flex my-2 items-center">
              <svg className="w-6 h-6 mr-4" fill="#00712d">
                <use xlinkHref="/img/icons.svg#icon-calendar" />
              </svg>{" "}
              <span className="">NEXT DATE</span>
              <span className="ml-4 text-gray-500 text-sm">
                {formatDate(tour.startDates[0])}
              </span>
            </div>

            <div className="flex my-2 items-center">
              <svg className="w-6 h-6 mr-4" fill="#00712d">
                <use xlinkHref="/img/icons.svg#icon-trending-up" />
              </svg>
              <span>DIFFICULTY</span>
              <span className="ml-4 text-gray-500 text-sm">
                {tour.difficulty}
              </span>
            </div>

            <div className="flex my-2 items-center">
              <svg className="w-6 h-6 mr-4" fill="#00712d">
                <use xlinkHref="/img/icons.svg#icon-user" />
              </svg>
              <span>PARTICIPANTS</span>
              <span className="ml-4 text-gray-500 text-sm">
                {tour.maxGroupSize}
              </span>
            </div>

            <div className="flex my-2 items-center">
              <svg className="w-6 h-6 mr-4" fill="#00712d">
                <use xlinkHref="/img/icons.svg#icon-star" />
              </svg>{" "}
              <span>RATING</span>
              <span className="ml-4 text-gray-500 text-sm">
                {tour.ratingsAverage} / 5
              </span>
            </div>

            <div className="facts py-8"></div>
          </div>
          <div className="">
            <p className="text-xl py-8"> YOUR TOUR GUIDES</p>
            <div className="guides">
              {guides.length > 0 &&
                guides.map((guide) => (
                  <div
                    key={guide._id}
                    className="guide-info flex items-center my-2"
                  >
                    <img
                      src={`/img/users/${guide.photo}`}
                      alt={guide.name}
                      className="guide-image mr-2"
                    />
                    <div>{guide.name}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="m-16">
          <h1 className="uppercase text-2xl my-16">
            About the tour {tour.name}
          </h1>
          <p>{tour.description}</p>
        </div>

        {/* Adjusted the images section to span both columns */}
        <div
          className="tour-images grid grid-cols-1 md:grid-cols-3 col-span-1 md:col-span-2"
          // style={{
          //   clipPath:
          //     "polygon(0 var(--section-rotate), 100% 0, 100% calc(100% - var(--section-rotate)), 0 100%)",
          //   "--section-rotate": "20%", // Customize this value as needed
          // }}
        >
          {images.length > 0 &&
            images.map((image, index) => (
              <div key={index} className="flex">
                <img
                  src={`/img/tours/${image}`}
                  alt={`Tour image ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
        </div>
      </div>
      <div className="py-16 px-16 grid gap-8 grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {reviews.length > 0 &&
          reviews.map((review) => (
            <div
              key={review.id}
              className="review-card border shadow-md shadow-gray-200 max-w-m"
            >
              <div className="m-4">
                {" "}
                <div className="flex items-center my-2">
                  {" "}
                  <img
                    src={`/img/users/${review.user.photo}`}
                    alt={review.user.name}
                    className="user-image mr-2"
                  />
                  <div className="text-m uppercase">{review.user.name}</div>
                </div>
                <div className="my-4 text-sm text-gray-500">
                  {" "}
                  {review.review}
                </div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 h-4"
                      style={{
                        fill: star <= review.rating ? "#00712d" : "#d1d5db",
                      }}
                    >
                      <use xlinkHref="/img/icons.svg#icon-star" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="flex justify-center items-center mx-32 mt-16 mb-64 border p-8 rounded-[32px] shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl mb-4 text-primary uppercase">
            What are you waiting for?
          </h1>
          <Link
            to={`/tours/${tour.id}`}
            className=" border border-gray-300 rounded-full shadow-md px-8 py-2 text-center text-white inline-block bg-primary"
          >
            Book Now!
          </Link>
        </div>
      </div>
    </div>
  );
}
