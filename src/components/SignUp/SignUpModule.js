import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { createANewUser, signUpUser, userLogesIn } from "@/redux/users/Users";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";


const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave =Swal.resumeTimer;
  }
});
const SignUpModule = () => {
  const routes = useRouter();
  const dispatch = useDispatch();

  return (
    <div className='w-full flex justify-center items-center flex-col font-moraba p-4'>
      <div className='border-2 p-4 w-full md:w-1/2'>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            phoneNumber: "",
            password: "",
            password2: ""
          }}
          validate={async(values) => {
            const errors = {
              firstName: "",
              lastName: "",
              phoneNumber: "",
              password: "",
              password2: ""
           };
            //firstname validation
            if (!values.firstName) {
              errors.firstName = "وارد کردن نام الزامی است.";
            } else if (values.firstName.length <= 2) {
              errors.firstName = " نام باید حداقل سه حرف داشته باشد .";
            }
            //lastname validation
            if (!values.lastName) {
              errors.lastName = "وارد کردن نام الزامی است.";
            } else if (values.lastName.length <= 2) {
              errors.lastName = "فامیلی باید حداقل سه حرف داشته باشد .";
            }
            
            //phone number validation
            if (!values.phoneNumber) {
              errors.phoneNumber = "وارد کردن شماره همراه الزامی است.";
            } else if (values.phoneNumber.length !== 11) {
              errors.phoneNumber = " شماره همراه یازده رقمی است.";
            }
            //password validation
            if (!values.password) {
              errors.password = "وارد کردن رمز عبور الزامی است.";
            } else if (
              !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g.test(
                values.password
              )
            ) {
              errors.password = "رمز عبور امن نیست.";
            }

            //password2 validation
            if (values.password2 !== values.password) {
              errors.password2 = "تکرار رمز عبور اشتباه است.";
            }
            if (
              errors.firstName === "" &&
              errors.lastName === "" &&
              errors.phoneNumber === "" &&
              errors.password === "" &&
              errors.password2 === ""
            ) {
              return {};
            } else {
              return errors;
            }
          }}
          onSubmit={async (values) => {
            console.log("fffffffffffffff")
            const userBody = {
              firstName: values.firstName,
              lastName: values.lastName,
              password: values.password,
              phoneNumber: values.phoneNumber,
              role: "دانش آموز"
            };
            console.log("user body -> ",userBody);

            const result =await dispatch(signUpUser(userBody));
            console.log("resultttt : ", result);
            if (result.payload.status === 201) {
              Toast.fire({
                toast: true,
                customClass: {
                  title: "font-moraba"
                },
                position: "bottom-end",
                title: " شما با موفقیت ثبت نام کردید ...",
                icon: "success"
              });
              dispatch(userLogesIn())
              routes.replace("/userpage")
              } else if (result.payload.status === 409) {
             
                Toast.fire({
                  toast: true,
                  customClass: {
                    title: "font-moraba"
                  },
                  position: "bottom-end",
                  title: " کاربری با این مشخصات قبلا ثبت نام کرده است ...",
                  icon: "error"
                });
              }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleChange,
            handleBlur
          }) => (
            <form
              onSubmit={handleSubmit}
              className='flex flex-col w-full gap-2 text-slate-800'
            >
              <div className='col-start-1 col-span-2 flex justify-center'>
                
                  <div>
                    ثبت نام کرده اید؟{" "}
                    <span className='text-green-600 font-moraba-medium'>
                      <Link href={"/login"}>وارد شوید ...</Link>
                    </span>
                  </div>
                
              </div>
              <div className='flex flex-col '>
                <input
                  type='text'
                  name='firstName'
                  placeholder='نام ...'
                  className={`bg-slate-200 p-2  outline-none `}
                  onChange={handleChange}
                  value={values.firstName}
                  onBlur={handleBlur}
                />
                <div className='text-xs text-red-500'>
                  {errors.firstName && touched.firstName && errors.firstName}
                </div>
              </div>
              <div className='flex flex-col'>
                <input
                  type='text'
                  name='lastName'
                  placeholder='نام خانوادگی  ...'
                  className={`bg-slate-200 p-2 outline-none `}
                  onChange={handleChange}
                  value={values.lastName}
                  onBlur={handleBlur}
                />
                <div className='text-xs text-red-500'>
                  {errors.lastName && touched.lastName && errors.lastName}
                </div>
              </div>
              <div className='flex flex-col'>
                <input
                  type='text'
                  name='phoneNumber'
                  placeholder='شماره همراه  ...'
                  className={`bg-slate-200 p-2  outline-none `}
                  onChange={handleChange}
                  value={values.phoneNumber}
                  onBlur={handleBlur}
                />
                <div className='text-xs text-red-500'>
                  {errors.phoneNumber &&
                    touched.phoneNumber &&
                    errors.phoneNumber}
                </div>
              </div>

              <div className='flex flex-col'>
                <input
                  type='password'
                  name='password'
                  placeholder='رمز عبور ...'
                  className={`bg-slate-200 p-2  outline-none `}
                  onChange={handleChange}
                  value={values.password}
                  onBlur={handleBlur}
                />
                <div className='text-xs text-red-500'>
                  {errors.password && touched.password && errors.password}
                </div>
              </div>

              <div className='flex flex-col'>
                <input
                  type='password'
                  name='password2'
                  placeholder=' رمز عبور تکرار ...'
                  className={`bg-slate-200 p-2  outline-none `}
                  onChange={handleChange}
                  value={values.password2}
                  onBlur={handleBlur}
                />
                <div className='text-xs text-red-500'>
                  {errors.password2 && touched.password2 && errors.password2}
                </div>
              </div>

             <button
                type='submit'
                className='rounded-md bg-green-600 hover:bg-green-400 p-2 text-xl'
              >
                ثبت نام
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignUpModule
