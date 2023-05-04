import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./tableList.scss";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { ModalBody } from "../../components/ModalBody/ModalBody";
import IconTrash from "../../assets/icons/trash.svg";
import IconPlus from "../../assets/icons/plus.svg";
import { APIURL } from "../../enviroment/stage";
import { DeleteModal } from "../../components/ModalBody/DeleteModal/DeleteModal";
import { AddModal } from "../../components/ModalBody/AddModal/AddModal";

interface Cake {
  name: string;
  id: string;
  image: string;
  price: number;
  available: any[];
  description: string;
  ingredients: any[];
}
export const TableList = () => {
  const [cakeList, setCakeList] = useState<Cake[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalToAdd, setShowModalToAdd] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [idToAdd, setIdToAdd] = useState<string | null>(null);

  const fetchCakes = async () => {
    const { data } = await axios.get(`${APIURL}/cakes`);
    setCakeList(data as Cake[]);
  };


  useEffect(() => {
    
    fetchCakes();
  }, []);

  return (
    <div className="container-tablist">
      <div className="line-btn">
        <Button variant="outline-primary" onClick={() => setShowModal(true)}>
          Aggiungi Dolce
        </Button>
      </div>
      <Table bordered className="table-size mt-3">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrizione</th>
            <th>Prezzo</th>
            <th>Quantita</th>
          </tr>
        </thead>
        <tbody>
          {cakeList &&
            cakeList.map(({ name, description, available, price, id }) => (
              <tr>
                <th className="th-sm">{name}</th>
                <th className="th-sm">{description}</th>
                <th className="th-xs">{price}</th>
                <th className="th-xs">{available.length}</th>
                <th className="th-sm">
                  <div className="icons-line">
                    <img
                      src={IconTrash}
                      alt="tash-icon"
                      onClick={() => {
                        setShowModalDelete(true);
                        setIdToDelete(id);
                      }}
                      className="pointer"
                    />
                    <img
                      src={IconPlus}
                      alt="add-icon"
                      onClick={() => {
                        setShowModalToAdd(true);
                        setIdToAdd(id);
                      }}
                      className="pointer"
                    />
                  </div>
                </th>
              </tr>
            ))}
        </tbody>
      </Table>

      <Modal fullscreen show={showModal}>
        <ModalBody toggleModal={setShowModal}   onClose={()=>fetchCakes()}/>
      </Modal>
      <Modal show={showModalDelete}>
        <DeleteModal
          toggleModal={setShowModalDelete}
          id={idToDelete}
          onClose={()=>fetchCakes()}
        />
      </Modal>
      <Modal show={showModalToAdd}>
        <AddModal
          toggleModal={setShowModalToAdd}
          id={idToAdd}
          onClose={()=>fetchCakes()}
        />
      </Modal>
    </div>
  );
};
