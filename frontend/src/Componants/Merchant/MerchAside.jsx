import * as React from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { AccountApi } from "../../Services/AccountService";
import { StorageHandler } from "../../Services/SessionStorage";

function MerchAside() {
  let { mid } = useParams();
  let navigate = useNavigate();

  let Logout = async () => {
    try {
      await AccountApi.Logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <aside id="sidebar" className="sidebar bg-gradient-warning">
        <ul className="sidebar-nav" id="sidebar-nav">
          <div className="accordion" id="accordionExample">
            <div className="card">
              <div className="card-header bg-white text-dec" id="headingOne">
                <button
                  className="btn btn-link btn-block text-right bg-white text-dec"
                  type="button"
                >
                  <NavLink
                    className="loginlink text-dec"
                    to={`/Merchant/${mid}`}
                  >
                    الصفحه الرئيسية
                  </NavLink>
                </button>
              </div>
            </div>

            <div className="card">
              <div className="card-header bg-white text-dec" id="headingTwo">
                <button
                  className="btn btn-link btn-block text-right bg-white text-dec"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                  aria-expanded="true"
                  aria-controls="collapseTwo"
                >
                  الطلبات
                </button>
              </div>
              <div
                id="collapseTwo"
                className="collapse show"
                aria-labelledby="headingTwo"
                data-parent="#accordionExample"
              >
                <div className="card-body bg-white">
                  <NavLink
                    className="loginlink text-dec"
                    to={`/Merchant/${mid}/Orders`}
                  >
                    قائمة الطلبات
                  </NavLink>
                </div>
                <div className="card-body bg-white">
                  <NavLink
                    className="loginlink text-dec"
                    to={`/Merchant/${mid}/newOrder`}
                  >
                    إضافة طلب جديد
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header bg-white text-dec" id="headingThree">
                <button
                  className="btn btn-link btn-block text-right bg-white text-dec loginlink text-dec"
                  type="button"
                  onClick={Logout}
                >
                  تسجيل الخروج
                </button>
              </div>
            </div>
          </div>
        </ul>
      </aside>
    </>
  );
}

export default MerchAside;
