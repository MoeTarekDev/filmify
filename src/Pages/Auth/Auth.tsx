import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swiper from "swiper";
import { Mousewheel, Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import * as Yup from "yup";
import imageOne from "../../assets/auth1.webp";
import imageTwo from "../../assets/auth2.webp";
import imageThree from "../../assets/auth3.webp";
import { featuresActions } from "../../Store/features.slice";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../firebase/firebase";

import { doc, getDoc, setDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { userActions } from "../../Store/user.slice";
export default function Auth() {
  let navigate = useNavigate();
  const { authPage, isDark } = useSelector(function (store: {
    featuresReducer: { authPage: string; isDark: boolean };
  }) {
    return store.featuresReducer;
  });
  // const { userToken } = useSelector(function (store: {
  //   userReducer: { userToken: string };
  // }) {
  //   return store.userReducer;
  // });

  const { setUserEmail, setUserName, setUserToken, setUserImage } = userActions;
  const { changeAuthPageToSignUp, changeAuthPageToSignIn } = featuresActions;
  let dispatch = useDispatch();
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

  async function signUpToFireBase(values: {
    email: string;
    password: string;
    userName: string;
  }) {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = auth.currentUser;
      console.log(user);
      console.log("user is registered");
      if (user) {
        dispatch(setUserEmail(values.email));
        dispatch(setUserName(values.userName));

        await setDoc(doc(db, "Users", user.uid), {
          email: values.email,
          userName: values.userName,
        });

        toast.success("User is registered successfully");
      }
    } catch (error: any) {
      console.log(error.message);

      toast.error("This email is already registered");
    }
  }

  async function signInToFireBase(values: { email: string; password: string }) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      if (userCredential.user) {
        localStorage.setItem("uid", JSON.stringify(userCredential.user.uid));
        dispatch(setUserToken(userCredential.user.uid));

        // Fetch user data from FireStore
        const userDoc = await getDoc(doc(db, "Users", userCredential.user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // Dispatch user info to Redux store
          dispatch(setUserEmail(userCredential.user.email));
          localStorage.setItem("userName", userData.userName);
          dispatch(setUserName(userData.userName)); // Retrieve userName from FireStore
        }
      }
      let id = toast.success("LoggedIn Successfully");

      setTimeout(() => {
        toast.dismiss(id);
        navigate("/");
      }, 1500);
    } catch (error: any) {
      toast.error("Email and Password Does Not Match");
    }
  }

  async function signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const uid = result.user.uid;
      const userName = result.user.displayName;
      const email = result.user.email;
      const photoURL = result.user.photoURL;

      // Store user data in localStorage
      localStorage.setItem("uid", JSON.stringify(uid));
      // @ts-ignore
      localStorage.setItem("userName", userName);
      localStorage.setItem("userImage", JSON.stringify(photoURL));

      // Update Firestore
      await setDoc(doc(db, "Users", uid), {
        email: email,
        userName: userName,
        userImage: photoURL,
      });

      dispatch(setUserImage(photoURL));
      dispatch(setUserEmail(email));
      dispatch(setUserName(userName));
      dispatch(setUserToken(uid));

      let id = toast.success("Logged in successfully");

      // Navigate immediately after successful sign-in
      setTimeout(() => {
        navigate("/");
        toast.dismiss(id);
      }, 1500);
      return result;
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Google sign-in failed");
    }
  }

  let formikSignUp = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: signUpToFireBase,
  });
  let formikSignIn = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: "",
    onSubmit: signInToFireBase,
  });
  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
    if (isDark) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [isDark]);
  useEffect(() => {
    const swiper = new Swiper(".swiper-container-four", {
      modules: [Navigation, Pagination, Mousewheel],

      slidesPerView: 1,

      autoplay: {
        delay: 5000,
        disableOnInteraction: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      loop: true,
    });

    return () => {
      swiper.destroy();
    };
  }, []);
  return (
    <>
      <section className="grid grid-cols-12 min-h-screen ">
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
        <div className="px-5 md:col-span-7 col-span-12 lg:px-[100px] md:px-[60px] sm:px-[100px] bg-myBackground flex flex-col gap-7 md:pt-[50px] pt-[100px]">
          <div className="flex flex-col space-y-20">
            <h3 className="font-bold text-headingsColor text-2xl">
              Sign {authPage === "signIn" ? "in" : "up"} to Filmify
            </h3>
            <a
              onClick={signInWithGoogle}
              target="_blank"
              className="w-full rounded-lg flex  justify-center items-center gap-3 bg-white shadow-md text-center p-3 cursor-pointer "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#fbc02d"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#e53935"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4caf50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1565c0"
                  d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              <div className="text-navTextColor">
                Sign {authPage === "signIn" ? "in" : "up"} with
                <span className="text-black font-medium"> Google</span>
              </div>
            </a>
            <div className="flex justify-center divider">
              <span className="relative text-otherTextColor ">
                or sign {authPage === "signIn" ? "in" : "up"} with email
              </span>
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
                  className={`inline-block  py-3 px-1  border-b-2 ${
                    authPage === "signIn"
                      ? "border-black text-black dark:border-white dark:text-white"
                      : "dark:text-gray-400 dark:border-gray-400"
                  } rounded-t-lg font-bold  transition-colors duration-300`}
                  id="signin-tab"
                  data-tabs-target="#signin"
                  type="button"
                  role="tab"
                  onClick={() => {
                    dispatch(changeAuthPageToSignIn());
                  }}
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Sign In
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block  py-3 px-1  border-b-2 ${
                    authPage === "signUp"
                      ? "border-black text-black dark:border-white dark:text-white"
                      : "dark:text-gray-400 dark:border-gray-400"
                  } rounded-t-lg font-bold  transition-colors duration-300`}
                  id="signup-tab"
                  data-tabs-target="#signup"
                  type="button"
                  role="tab"
                  onClick={() => {
                    dispatch(changeAuthPageToSignUp());
                  }}
                  aria-controls="dashboard"
                  aria-selected="false"
                >
                  Sign Up
                </button>
              </li>
            </ul>
          </div>

          {authPage === "signIn" ? (
            <>
              <form
                className="flex flex-col gap-5 pb-10 -mt-5"
                onSubmit={formikSignIn.handleSubmit}
              >
                <div className="flex flex-col gap-3">
                  <span className="font-medium text-otherTextColor text-sm">
                    Email address *
                  </span>
                  <input
                    onChange={formikSignIn.handleChange}
                    onBlur={formikSignIn.handleBlur}
                    value={formikSignIn.values.email}
                    name="email"
                    type="email"
                    className="bg-[#f7f6f8] rounded-lg border-none text-black font-light  py-3"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <span className="font-medium text-otherTextColor text-sm">
                    Password *
                  </span>
                  <input
                    onChange={formikSignIn.handleChange}
                    onBlur={formikSignIn.handleBlur}
                    value={formikSignIn.values.password}
                    name="password"
                    type="password"
                    className="bg-[#f7f6f8] rounded-lg border-none text-black font-light  py-3"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary self-stretch justify-center"
                >
                  Sign In
                </button>
              </form>
            </>
          ) : (
            <>
              <form
                className="flex flex-col gap-5 pb-10 -mt-5"
                onSubmit={formikSignUp.handleSubmit}
              >
                <div className="flex flex-col gap-3">
                  <span className="font-medium text-otherTextColor text-sm">
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
                  <span className="font-medium text-otherTextColor text-sm">
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
                  <span className="font-medium text-otherTextColor text-sm">
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
            </>
          )}
        </div>
      </section>
    </>
  );
}
