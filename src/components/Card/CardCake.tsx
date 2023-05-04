import React, { FC } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router";
import { APIURL } from "../../enviroment/stage";
import { Cake } from "../../models/Cake";
import "./CardCake.scss";
interface Props {
  cake: Cake;
}

export const CardCake: FC<Props> = ({
  cake: { name, description, image, id },
}) => {
  const navigate = useNavigate();
  return (
    <Card
      className="mt-5 card-custom"
    
    >
      <Card.Img
        variant="top"
        src={`${APIURL}/images/${image}`}
        className="img-card pointer"
        onClick={() => navigate(`${id}`, { replace: true })}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text className="card-description">{description}</Card.Text>
        <Button
          className="btn-custom"
          onClick={() => console.log("aggiunto a carrello")}
        >
          Aggiungi a Carello
        </Button>
      </Card.Body>
    </Card>
  );
};
