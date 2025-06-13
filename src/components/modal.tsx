import React, { useState } from 'react';
import './modal.scss';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (link: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [link, setLink] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (link.trim()) {
            onSubmit(link);
            setLink('');
            onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>Adicionar Novo Link</h2>
                <input
                    type="url"
                    placeholder="Digite o link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <div className="modal-actions">
                    <button className="submit-btn" onClick={handleSubmit}>
                        Adicionar
                    </button>
                    <button className="cancel-btn" onClick={onClose}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;