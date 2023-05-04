import axios from "axios";
import React, { Dispatch, FC, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { APIURL } from "../../enviroment/stage";
import "./ModalBody.scss";
interface Props {
  toggleModal: Dispatch<boolean>;
  onClose: () => void;
}
export const ModalBody: FC<Props> = ({ toggleModal, onClose }) => {
  const [listIngredients, setListIngredients] = useState([
    { name: "", quantity: "" },
  ]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>();
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const changeValue = (
    value: string,
    index: number,
    key: "name" | "quantity"
  ) => {
    setListIngredients((prev) => [
      ...prev.map((input, indexList) => {
        if (indexList === index) input[key] = value;
        return input;
      }),
    ]);
  };

  const addRowIngredients = () =>
    setListIngredients((prev) => [...prev, { name: "", quantity: "" }]);

  const deleteRowIngredients = (index: number) =>
    setListIngredients((prev) => [
      ...prev.filter((_, indexarr) => index !== indexarr),
    ]);

  const createSweet = () => {
    if (name && description && file && price) {
      axios
        .post(
          `${APIURL}/cakes/create`,
          {
            file,
            name,
            description,
            price,
            ingredients:
              listIngredients.length && listIngredients[0].name
                ? listIngredients
                : [],
            available: quantity,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => onClose());
    }
  };
  return (
    <>
      {" "}
      <Modal.Body className="flex-modal">
        <h1 className="mb-5">Inserisci i dati del dolce</h1>
        <Row>
          <Form.Group
            as={Row}
            className="mb-3 "
            controlId="exampleForm.ControlInput1"
          >
            <Col sm="4">
              <Form.Label>Nome Dolce</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col sm="6">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
            <Col sm="2">
              <Form.Label>Prezzo</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </Col>
          </Form.Group>
        </Row>

        <h5 className="pt-5">
          Lista ingredienti
          <span className="icon-add" onClick={() => addRowIngredients()}>
            +
          </span>
        </h5>
        <Row>
          <Col sm="5">
            {listIngredients.map((input, index) => (
              <Form.Group as={Row}>
                <Col sm="3">
                  <Form.Label>Nome ingrediente</Form.Label>
                  <Form.Control
                    type="text"
                    value={input["name"]}
                    onChange={(e) => changeValue(e.target.value, index, "name")}
                  />
                </Col>
                <Col sm="2">
                  <Form.Label>Quantita</Form.Label>
                  <Form.Control
                    type="text"
                    value={input["quantity"]}
                    onChange={(e) =>
                      changeValue(e.target.value, index, "quantity")
                    }
                  />
                </Col>
                <Col sm="2">
                  <div className="icon-align">
                    <span
                      className="icon-add pt-5"
                      onClick={() => deleteRowIngredients(index)}
                    >
                      X
                    </span>
                  </div>
                </Col>
              </Form.Group>
            ))}
          </Col>
          <Col sm="2">
            <Form.Label>Quantita</Form.Label>
            <Form.Control
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </Col>

          <Col sm="2">
            <div className="btn-load">
              {file ? (
                <span>
                  {file.name}{" "}
                  <span
                    className="icon-delete-pic"
                    onClick={() => setFile(null)}
                  >
                    {" "}
                    X
                  </span>
                </span>
              ) : (
                <Button
                  variant="outline-primary"
                  onClick={() => inputRef.current?.click()}
                >
                  Carica immagine
                </Button>
              )}

              <input
                type="file"
                className="d-none"
                accept="image/*"
                ref={inputRef}
                onChange={(e) => {
                  e.target.files?.length && setFile(e.target.files[0]);
                }}
              />
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => toggleModal(false)}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            createSweet();
            toggleModal(false);
          }}
        >
          Crea
        </Button>
      </Modal.Footer>
    </>
  );
};
