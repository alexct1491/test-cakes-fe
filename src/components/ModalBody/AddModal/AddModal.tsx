import React, { Dispatch, FC, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import useEndPoints from "../../../hooks/useEndPoint";
import "./AddModal.scss";

interface Props {
  toggleModal: Dispatch<boolean>;
  onClose: () => void;
  id: string | null;
}
export const AddModal: FC<Props> = ({ toggleModal, onClose, id }) => {
  const { addQuantity } = useEndPoints();
  const [quantityInput, setQuantityInput] = useState<number>(1);

  return (
    <Modal.Body>
      <div className="container-delete-modal">
        <h2>Seleziona quantità da aggiungere</h2>
        <input
          type="number"
          value={quantityInput}
          onChange={(e) => setQuantityInput(Number(e.target.value))}
        />
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
              /*   id && deleteCake(id).then(()=>{
                onClose();
                toggleModal(false)
              }); */
              id &&
                addQuantity(id, quantityInput).then(() => {
                  onClose();
                  toggleModal(false);
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
