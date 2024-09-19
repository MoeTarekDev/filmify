import { useEffect } from "react";
import Swiper from "swiper";
import { Mousewheel, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import imageOne from "../../assets/auth1.webp";
import imageTwo from "../../assets/auth2.webp";
import imageThree from "../../assets/auth3.webp";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function SignUp() {
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const validationSchema = Yup.object({
    userName: Yup.string()
      .required("name is required")
      .min(3, "name must be 3 characters or more")
      .max(10, "name must be less than 10 characters"),
    email: Yup.string()
      .required("email is required")
      .matches(emailRegex, "email is not valid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        passwordRegex,
        "password must be Minimum eight characters, at least one letter and one number"
      ),
  });
  let formikSignUp = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: function (values) {
      console.log(values);
    },
  });
  let formikSignIn = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: "",
    onSubmit: function (values) {
      console.log(values);
    },
  });

  useEffect(() => {
    setTimeout(() => {
      new Swiper(".swiper-container-four", {
        modules: [Navigation, Pagination, Mousewheel, Autoplay], // Ensure Autoplay is added
        slidesPerView: 1,
        loop: true, // Keep loop enabled for continuous autoplay
        autoplay: {
          delay: 5000,
          disableOnInteraction: false, // Ensure autoplay doesn't stop on interaction
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    }, 100); // Add slight delay to ensure the DOM is fully loaded
  }, []);
  return (
    <>
      <section className="grid grid-cols-12 min-h-screen">
        <div className="swiper-container-four col-span-5 bg-primaryColor overflow-hidden py-10 hidden md:block">
          <div className="swiper-wrapper">
            <div className="swiper-slide cursor-grab">
              <img
                className="w-full h-[400px] object-contain"
                src={imageOne}
                alt="anime image"
              />
              <h2 className="text-white text-center text-lg font-bold px-5">
                Lights, Camera, Login!
              </h2>
              <p className="text-white text-center mt-4 leading-5 px-5">
                Step into your personal cinema paradise, where a vast collection
                of films awaits your exploration.
              </p>
            </div>
            <div className="swiper-slide cursor-grab ">
              <img
                className="w-full h-[400px] object-contain"
                src={imageThree}
                alt="anime image"
              />
              <h2 className="text-white text-center text-lg font-bold mt-2 px-5">
                Your Ticket to Endless Entertainment
              </h2>
              <p className="text-white text-center mt-4 leading-5 px-5">
                Unlock a world of movies at your fingertips, from timeless
                classics that have shaped the art of filmmaking.
              </p>
            </div>
            <div className="swiper-slide cursor-grab ">
              <img
                className="w-full h-[400px] object-contain"
                src={imageTwo}
                alt="anime image"
              />
              <h2 className="text-white text-center text-lg font-bold mt-2 px-5">
                Reel in the Magic
              </h2>
              <p className="text-white text-center mt-4 leading-5 px-5">
                Your silver screen adventure begins here, offering you a
                front-row seat to an incredible array of stories.
              </p>
            </div>
          </div>
        </div>
        <div className="px-5 md:col-span-7 col-span-12 lg:px-[100px] md:px-[60px] sm:px-[100px] bg-white flex flex-col gap-7 md:pt-[50px] pt-[100px]">
          <div className="flex flex-col space-y-20">
            <h3 className="font-bold text-black text-2xl">
              Sign up to Filmify
            </h3>
            <div className="w-full rounded-lg bg-white shadow-md text-center p-3 ">
              Google
            </div>
            <div className="flex justify-center divider">
              <span className="relative ">or sing up with email</span>
            </div>
          </div>

          <div className="mb-4 ">
            <ul
              className="flex flex-wrap -mb-px no-class text-sm font-medium text-center"
              id="default-tab"
              data-tabs-toggle="#default-tab-content"
              role="tablist"
            >
              <li className="me-2" role="presentation">
                <button
                  className="inline-block py-3 px-1  border-b-2 rounded-t-lg font-bold text-black"
                  id="signin-tab"
                  data-tabs-target="#signin"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Sign In
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className="inline-block font-bold text-black py-3 px-1  border-b-2 rounded-t-lg"
                  id="signup-tab"
                  data-tabs-target="#signup"
                  type="button"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="false"
                >
                  Sign Up
                </button>
              </li>
            </ul>
          </div>
          <div id="default-tab-content">
            <div
              className="hidden rounded-lg"
              id="signin"
              role="tabpanel"
              aria-labelledby="signin-tab"
            >
              <form
                className="flex flex-col gap-5 pb-10 -mt-5"
                onSubmit={formikSignIn.handleSubmit}
              >
                <div className="flex flex-col gap-3">
                  <span className="font-medium text-black text-sm">
                    Email address *
                  </span>
                  <input
                    onChange={formikSignIn.handleChange}
                    onBlur={formikSignIn.handleBlur}
                    value={formikSignIn.values.email}
                    name="email"
                    type="email"
                    className="bg-[#f7f6f8] rounded-lg border-none text-black font-light p-3"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <span className="font-medium text-black text-sm">
                    Password *
                  </span>
                  <input
                    onChange={formikSignIn.handleChange}
                    onBlur={formikSignIn.handleBlur}
                    value={formikSignIn.values.password}
                    name="password"
                    type="password"
                    className="bg-[#f7f6f8] rounded-lg border-none text-black font-light px-3  py-3"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary self-stretch justify-center"
                >
                  Sign In
                </button>
              </form>
            </div>
            <div
              className="hidden"
              id="signup"
              role="tabpanel"
              aria-labelledby="signup-tab"
            >
              <form
                className="flex flex-col gap-5 pb-10 -mt-5"
                onSubmit={formikSignUp.handleSubmit}
              >
                <div className="flex flex-col gap-3">
                  <span className="font-medium text-black text-sm">
                    Username *
                  </span>
                  <input
                    onChange={formikSignUp.handleChange}
                    onBlur={formikSignUp.handleBlur}
                    value={formikSignUp.values.userName}
                    name="userName"
                    type="text"
                    className="bg-[#f7f6f8] rounded-lg border-none text-black font-light  py-3"
                  />
                  {formikSignUp.errors.userName &&
                  formikSignUp.touched.userName ? (
                    <p className="text-primaryColor">
                      {formikSignUp.errors.userName}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <span className="font-medium text-black text-sm">
                    Email address *
                  </span>
                  <input
                    onChange={formikSignUp.handleChange}
                    onBlur={formikSignUp.handleBlur}
                    value={formikSignUp.values.email}
                    name="email"
                    type="email"
                    className="bg-[#f7f6f8] rounded-lg border-none text-black font-light  py-3"
                  />
                  {formikSignUp.errors.email && formikSignUp.touched.email ? (
                    <p className="text-primaryColor">
                      {formikSignUp.errors.email}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <span className="font-medium text-black text-sm">
                    Password *
                  </span>
                  <input
                    onChange={formikSignUp.handleChange}
                    onBlur={formikSignUp.handleBlur}
                    value={formikSignUp.values.password}
                    name="password"
                    type="password"
                    className="bg-[#f7f6f8] rounded-lg border-none text-black font-light  py-3"
                  />
                  {formikSignUp.errors.password &&
                  formikSignUp.touched.password ? (
                    <p className="text-primaryColor">
                      {formikSignUp.errors.password}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <button
                  type="submit"
                  className="btn-primary self-stretch justify-center"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
