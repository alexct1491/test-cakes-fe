import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { APIURL } from "../../enviroment/stage";
import useEndPoints from "../../hooks/useEndPoint";
import { Cake } from "../../models/Cake";
import "./CakeDetail.scss";

export const CakeDetail = () => {
  const { id } = useParams();
  const { getCake } = useEndPoints();
  const [cake, setCake] = useState<Cake>();

  const fetchCake = async () => {
    if (id) {
      const { data } = await getCake(id);
      data && setCake(data);
    }
  };
  useEffect(() => {
    fetchCake();
  }, []);
  console.log(cake);
  return (
    <div className="container-cake-detail">
      <div className="title-center">
        <h1>{cake?.name}</h1>
      </div>

      <Row>
        <Col sm="8" className="main-column">
          <img
            src={`${APIURL}/images/${cake?.image}`}
            className="cake-image"
            alt=""
          />
          <div className="desc-container">{cake?.description}</div>
        </Col>
        <Col sm="4">
          <Row>
            <Col sm="12" className="flex-column">
              <h3>Lista ingredienti:</h3>
              {cake?.ingredients.length ? (
                <ul>
                  {cake.ingredients.map(({ name }) => (
                    <li className="sub-title">{name}</li>
                  ))}
                </ul>
              ) : (
                <span className="sub-title">Nessun ingrediente riportato</span>
              )}
            </Col>
            <Col sm="12" className="flex-column">
              <h3>Info vendita</h3>

              <span className="p-3 sub-title">Prezzo: {cake?.price} €</span>
              <span className="p-3 sub-title">
                Disponibilià: {cake?.available.length}{" "}
              </span>
            </Col>
            <Col>
              <Button
                className="btn-custom"
                onClick={() => console.log("aggiunto a carrello")}
              >
                Aggiungi a Carello
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
