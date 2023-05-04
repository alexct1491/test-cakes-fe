import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { CardCake } from "../../components/Card/CardCake";
import { APIURL } from "../../enviroment/stage";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Cake } from "../../models/Cake";
import "./Cakes.scss";

export const Cakes = () => {
  const [cakeList, setCakeList] = useState<Cake[]>([]);
  const { width } = useWindowSize();
  const fetchCakes = async () => {
    const { data } = await axios.get(`${APIURL}/cakes`);
    setCakeList(data);
  };

  useEffect(() => {
    fetchCakes();
  }, []);

  return (
    <div className="container-cakes pt-5">
      <h1>Cakes Kingdom</h1>
  
      <Row className="mt-5 list-overflow">
        {cakeList ? (
          cakeList.map((cake) => (
            <Col xs={width > 992 ? 4 : 12}>
              <CardCake cake={cake} />
            </Col>
          ))
        ) : (
          <div> Nessun dolce disponibile</div>
        )}
      </Row>
    </div>
  );
};
