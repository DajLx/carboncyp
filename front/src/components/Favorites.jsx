import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import { TbDoorEnter } from "react-icons/tb";
import { FiSun } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Favorites = () => {
  const navi = useNavigate();
  const favorites = useSelector((state) => state.favorites);
  const donwloadFavorite = (name, dataUrl) => {
    Swal.fire({
      title: "las imagenes solo se podran descargar en png",
      text: "¿estas de acuerdo con eso?",
      icon: "question",
      showDenyButton: true,
      denyButtonText: "no",
      confirmButtonText: "si",
      confirmButtonColor: "#123AC8",
      heightAuto: true,
    }).then((response) => {
      if (response.isConfirmed) {
        var link = document.createElement("a");
        link.download = name;
        link.href = dataUrl;
        link.click();
        Swal.fire({
          title: "Alerta",
          text: "foto descargada",
          icon: "success",
          confirmButtonText: "ok",
          timer: "2000",
        });
      } else {
        Swal.fire({
          title: "Alerta",
          icon: "error",
          html: "<p>la imagen no fue descargada</p>",
          timer: "2000",
        });
      }
    });
  };
  return (
    <div
      style={{ width: "100%", padding: "0 2rem", backgroundColor: "#0047ff" }}>
      <div className="father-sun">
        <button className="button-top">
          <FiSun />
        </button>

        <button
          className="button-top"
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => {
            navi("/");
          }}>
          <TbDoorEnter />
        </button>
      </div>

      <hr style={{ color: "white", margin: "0.5rem 0", opacity: "100%" }} />
      {favorites[0] ? (
        <div>
          <h1 className="orbitron" style={{ color: "white" }}>
            Favorites:
          </h1>
          <Container>
            <Row>
              {favorites.map((favorite) => (
                <Col xs={6} style={{ marginBottom: "1rem" }}>
                  <Row>
                    <Col
                      xs={12}
                      style={{ color: "white" }}
                      className="orbitron">
                      {favorite.formatAndName.split(".")[0]}
                    </Col>
                  </Row>
                  <img
                    onClick={() => {
                      
                      donwloadFavorite(
                        `${favorite.formatAndName.split(".")[0]}.png`,
                        favorite.binaryCode
                      );
                    }}
                    src={favorite.binaryCode}
                    style={{ width: "100%" }}></img>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      ) : (
        <h1 className="orbitron" style={{ color: "white" }}>
          {" "}
          you do not have favorites
        </h1>
      )}
    </div>
  );
};

export default Favorites;
