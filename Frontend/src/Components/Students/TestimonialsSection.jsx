import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";

const TestimonialsSection = () => {
  return (
    <div className="pb-14 px-8 md:px-0 text-center">
      <h2 className="text-3xl font-medium text-gray-800">Testimonials</h2>
      <p className="md:text-base text-gray-500 mt-3 max-w-2xl mx-auto">
        Hear from our learners as they share their journeys of transformation,
        success, and how our platform has made a difference in their lives.
      </p>

      <div className="flex flex-row justify-center items-start flex-wrap gap-6 mt-8">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="w-80 text-left pb-4 border border-gray-300 rounded-lg bg-white shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)] overflow-hidden"
          >
            <div className="flex items-center gap-4 px-5 py-4 bg-gray-100">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h1 className="text-lg font-medium text-gray-800">
                  {testimonial.name}
                </h1>
                <p className="text-gray-600">{testimonial.role}</p>
              </div>
            </div>

            <div className="px-5 pb-6 pt-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <img
                    className="h-5"
                    key={i}
                    src={
                      i < Math.floor(testimonial.rating)
                        ? assets.star
                        : assets.star_blank
                    }
                    alt=""
                  />
                ))}
              </div>
              <p className="text-gray-500 mt-4">{testimonial.feedback}</p>
            </div>
            <a href="" className="text-blue-500 underline px-5">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
