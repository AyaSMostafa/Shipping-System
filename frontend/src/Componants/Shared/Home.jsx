/*eslint-disable*/
import React, { useEffect, useState } from "react";
import "./main.css";
import { NavLink } from "react-router-dom";
import { StorageHandler } from "../../Services/SessionStorage";

function Home() {
  const [refresh, setrefresh] = useState(true);
  useEffect(() => {
    if (!StorageHandler.ContainData()) {
      setrefresh(false);
    }
  }, []);
  return (
    <>
      <div className="page-index">
        <section id="hero" className="hero d-flex align-items-center">
          <div className="container">
            <div className="row offset-2">
              <div className="col-xl-4">
                <h2 data-aos="fade-up">
                  برنامج إدارة شركات الشحن والخدمات اللوجستية
                </h2>
                <blockquote data-aos="fade-up" data-aos-delay="100">
                  <p>
                    يعد دفترة نظامًا متكاملًا لإدارة شركات الشحن واللوجستيك
                    بواجهة سهلة الاستخدام تدعم اللغة العربية، حيث يمكنك إصدار
                    الفواتير عن عمليات الشحن وتنظيم العملاء ومواعيد استلام
                    وتسليم الشحنات، بالإضافة إلى متابعة دقيقة لمراحل الشحن
                    وإدارتها باحترافية،إلى جانب قواعد الإرسال الآلي التي تتيح لك
                    إرسال تنبيهات إلى عملائك لإعلامهم بوصول الشحنات وغيرها عن
                    طريق البريد الإلكتروني أو الرسائل النصية القصيرة، وكذلك
                    إمكانية إصدار تقارير تفصيلية للحصول على رؤية أوضح حول سير
                    الأعمال في شركتك.
                  </p>
                </blockquote>
                <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
                  {!StorageHandler.ContainData() ? (
                    <NavLink className="btn-get-started" id="lin" to={`/Login`}>
                      تسجيل الدخول
                    </NavLink>
                  ) : StorageHandler.GetRole() === "Merchant" ? (
                    <NavLink
                      id="lin"
                      className="btn-get-started"
                      to={`/Merchant/${StorageHandler.GetUserIdentity()}`}
                    >
                      صفحة التاجر الرئيسية
                    </NavLink>
                  ) : (
                    <NavLink
                      id="lin"
                      className="btn-get-started"
                      to={`/Employee/${StorageHandler.GetUserIdentity()}`}
                    >
                      صفحة الموظف الرئيسية
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
