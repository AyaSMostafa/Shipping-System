import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import MerchAside from "./MerchAside";
import { StorageHandler } from "../../Services/SessionStorage";
import { useEffect } from "react";
import { useState } from "react";
import swal from "sweetalert";


function MerchLayout() {
  let navigate = useNavigate();
  const [ShowContent, setShowContent] = useState(false);

  useEffect(() => {
    if (StorageHandler.GetRole() !== "Merchant") {
      swal({
        title: "صلاحيات  !",
        text: `فشل في الصلاحية `,
        icon: "error",
        buttons: "حسنا  !",
      });
      navigate(`/Forbidden`, { state: { backPath: `/` } });
    } else {
      setShowContent(true);
    }
  }, []);
  return (
    <>
      {ShowContent && (
        <Container>
          <Row>
            <Col xs={3}>
              <MerchAside />
            </Col>
            <Col xs={9}>
              <Outlet />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default MerchLayout;
