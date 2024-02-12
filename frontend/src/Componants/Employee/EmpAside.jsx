import * as React from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { AccountApi } from "../../Services/AccountService";
import { StorageHandler } from "../../Services/SessionStorage";

function EmpAside() {
  let { eid } = useParams();
  let navigate = useNavigate();
  let permissions = StorageHandler.GetAllermissions();
  let role = StorageHandler.GetRole();

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
      <aside id="sidebar" className="sidebar">
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
                    to={`/Employee/${eid}`}
                  >
                    الصفحه الرئيسية
                  </NavLink>
                </button>
              </div>
            </div>
            {(permissions.includes("OrdersDisplay") ||
              permissions.includes("OrdersUpdate") ||
              permissions.includes("OrdersDelete")) && (
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
                {permissions.includes("OrdersDisplay") && (
                  <div
                    id="collapseTwo"
                    className="collapse hide"
                    aria-labelledby="headingTwo"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body bg-white">
                      <NavLink
                        className="loginlink text-dec"
                        to={`/Employee/${eid}/Orders`}
                      >
                        قائمة الطلبات
                      </NavLink>
                    </div>
                    <div className="card-body bg-white">
                      <NavLink
                        className="loginlink text-dec"
                        to={`/Employee/${eid}/Orders/Report`}
                      >
                        تقرير الطلبات
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            )}
            {role === "SuperAdmin" && (
              <div className="card">
                <div
                  className="card-header bg-white text-dec"
                  id="headingThree"
                >
                  <button
                    className="btn btn-link btn-block text-right bg-white text-dec"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseThree"
                    aria-expanded="true"
                    aria-controls="collapseThree"
                  >
                    الصلاحيات
                  </button>
                </div>
                <div
                  id="collapseThree"
                  className="collapse hide"
                  aria-labelledby="headingThree"
                  data-parent="#accordionExample"
                >
                  <div className="card-body bg-white">
                    <NavLink
                      className="loginlink text-dec"
                      to={`/Employee/${eid}/NewPermissions`}
                    >
                      اضافة مجموعة صلاحيات جديدة
                    </NavLink>
                  </div>
                </div>
              </div>
            )}
            {(permissions.includes("GovernatesDisplay") ||
              permissions.includes("GovernatesCreate") ||
              permissions.includes("GovernatesUpdate") ||
              permissions.includes("GovernatesDelete")) && (
              <div className="card">
                <div className="card-header bg-white text-dec" id="headingFour">
                  <button
                    className="btn btn-link btn-block text-right bg-white text-dec"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseFour"
                    aria-expanded="true"
                    aria-controls="collapseFour"
                  >
                    المحافظات
                  </button>
                </div>
                <div
                  id="collapseFour"
                  className="collapse hide"
                  aria-labelledby="headingFour"
                  data-parent="#accordionExample"
                >
                  {permissions.includes("GovernatesDisplay") && (
                    <div className="card-body bg-white">
                      <NavLink
                        className="loginlink text-dec"
                        to={`/Employee/${eid}/Governates`}
                      >
                        قائمة المحافظات
                      </NavLink>
                    </div>
                  )}
                  {permissions.includes("GovernatesCreate") && (
                    <div className="card-body bg-white">
                      <NavLink
                        className="loginlink text-dec"
                        to={`/Employee/${eid}/Governates/New`}
                      >
                        اضافة محافظة جديدة
                      </NavLink>
                    </div>
                  )}
                </div>
              </div>
            )}
            {(permissions.includes("CitiesDisplay") ||
              permissions.includes("CitiesCreate") ||
              permissions.includes("CitiesUpdate") ||
              permissions.includes("CitiesDelete")) && (
              <div className="card">
                <div className="card-header bg-white text-dec" id="headingFive">
                  <button
                    className="btn btn-link btn-block text-right bg-white text-dec"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseFive"
                    aria-expanded="true"
                    aria-controls="collapseFive"
                  >
                    المدن
                  </button>
                </div>
                <div
                  id="collapseFive"
                  className="collapse hide"
                  aria-labelledby="headingFive"
                  data-parent="#accordionExample"
                >
                  {permissions.includes("CitiesDisplay") && (
                    <div className="card-body bg-white">
                      <NavLink
                        className="loginlink text-dec"
                        to={`/Employee/${eid}/Cities`}
                      >
                        قائمة المدن
                      </NavLink>
                    </div>
                  )}
                  {permissions.includes("CitiesCreate") && (
                    <div className="card-body bg-white">
                      <NavLink
                        className="loginlink text-dec"
                        to={`/Employee/${eid}/Cities/New`}
                      >
                        اضافة مدينة جديدة
                      </NavLink>
                    </div>
                  )}
                </div>
              </div>
            )}

            {(permissions.includes("BranchesDisplay") ||
              permissions.includes("BranchesCreate") ||
              permissions.includes("BranchesUpdate") ||
              permissions.includes("BranchesDelete")) && (
              <div className="card">
                <div className="card-header bg-white text-dec" id="headingSix">
                  <button
                    className="btn btn-link btn-block text-right bg-white text-dec"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseSix"
                    aria-expanded="true"
                    aria-controls="collapseSix"
                  >
                    الفروع
                  </button>
                </div>
                <div
                  id="collapseSix"
                  className="collapse hide"
                  aria-labelledby="headingSix"
                  data-parent="#accordionExample"
                >
                  {permissions.includes("BranchesDisplay") && (
                    <div className="card-body bg-white">
                      <NavLink
                        className="loginlink text-dec"
                        to={`/Employee/${eid}/Branches`}
                      >
                        قائمة الفروع
                      </NavLink>
                    </div>
                  )}
                  {permissions.includes("BranchesCreate") && (
                    <div className="card-body bg-white">
                      <NavLink
                        className="loginlink text-dec"
                        to={`/Employee/${eid}/Branches/New`}
                      >
                        اضافة فرع جديد
                      </NavLink>
                    </div>
                  )}
                </div>
              </div>
            )}
            {role === "SuperAdmin" && (
              <>
                <div className="card">
                  <div
                    className="card-header bg-white text-dec"
                    id="headingSeven"
                  >
                    <button
                      className="btn btn-link btn-block text-right bg-white text-dec"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseSeven"
                      aria-expanded="true"
                      aria-controls="collapseSeven"
                    >
                      المستخدمين
                    </button>
                  </div>
                  <div
                    id="collapseSeven"
                    className="collapse hide"
                    aria-labelledby="headingSeven"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body bg-white">
                      <NavLink
                        className="loginlink text-dec"
                        to={`/Employee/${eid}/Users/NewUser`}
                      >
                        اضافة مستخدم جديد
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div
                    className="card-header bg-white text-dec"
                    id="headingEight"
                  >
                    <button
                      className="btn btn-link btn-block text-right bg-white text-dec"
                      type="button"
                    >
                      <NavLink
                        className="loginlink text-dec"
                        to={`/Employee/${eid}/WeightSettings`}
                      >
                        اعدادات الوزن
                      </NavLink>
                    </button>
                  </div>
                </div>
              </>
            )}
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

export default EmpAside;
