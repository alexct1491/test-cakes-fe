import React, { Dispatch, FC, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import useEndPoints from "../../../hooks/useEndPoint";
import "./DeleteModal.scss";

interface Props {
  toggleModal: Dispatch<boolean>;
  onClose: () => void;
  id: string | null;
}
export const DeleteModal: FC<Props> = ({ toggleModal, onClose, id }) => {
  const { deleteCake } = useEndPoints();

  return (
    <Modal.Body>
      <div className="container-delete-modal">
        <h2>Conferma eliminazione</h2>
        <div className="line-btn">
          <Button
            variant="outline-secondary"
            onClick={() => toggleModal(false)}
          >
            Annulla
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => {
              id && deleteCake(id).then(()=>{
                onClose();
                toggleModal(false)
              });
            }}
          >
            Conferma
          </Button>
        </div>
      </div>
    </Modal.Body>
  );
};
