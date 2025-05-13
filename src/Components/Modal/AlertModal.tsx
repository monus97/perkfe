import React from 'react';
import styled from 'styled-components';

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}
const Div = styled.div`
 overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    background: '#fff',
    borderRadius: '8px',
    padding: '20px',
    minWidth: '300px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
  body: {
    margin: '20px 0',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cancelButton: {
    background: '#f0f0f0',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  deleteButton: {
    background: '#d9534f',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
  },
`
const AlertDialog: React.FC<AlertDialogProps> = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <Div className="overlay">
      <div className="dialog">
        <div className="header">
          <h2>Alert dialog</h2>
          <button className="closeButton" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="body">
          <p>Are you absolutely sure?</p>
          <p>This action cannot be undone. This will permanently delete this user ID87236?</p>
        </div>
        <div className="footer">
          <button className="cancelButton" onClick={onClose}>
            Cancel
          </button>
          <button className="deleteButton" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </Div>
  );
};


export default AlertDialog;