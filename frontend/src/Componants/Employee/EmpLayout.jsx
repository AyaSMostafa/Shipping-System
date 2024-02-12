import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { StorageHandler } from "../../Services/SessionStorage";
import EmpAside from "./EmpAside";
import swal from "sweetalert";

function EmpLayout() {
  let navigate = useNavigate();
  const [ShowContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!StorageHandler.GetRole() || StorageHandler.GetRole() === "Merchant") {
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
              <EmpAside />
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

export default EmpLayout;
