import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import notfound from "../../assets/img/notfound.svg";

function Error500() {
  const location = useLocation();
  const backPath = location.state.backPath;
  return (
    <>
      <main>
        <div className="container">
          <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
            <h1>500</h1>
            <h2>
              حدث خطا فى السيرفر, الرجاء مراجعة صحة الطلب او التحقق من الاتصال
              بالانترنت
            </h2>
            <Link className="btn" to={backPath ? backPath : "/"}>
              العودة الى الصفحة السابقة
            </Link>
            <img
              src={notfound}
              className="img-fluid py-5"
              alt="Page Not Found"
            />
          </section>
        </div>
      </main>

      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
}

export default Error500;
