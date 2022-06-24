const ConfirmModal = ({ showModal, deleteContact, id }) => {
  return (
    <div className='confirm-modal'>
      <h3>Confirm Delete</h3>
      <div>
        <button className='btn' onClick={showModal}>
          Cancel
        </button>
        <button className='btn' onClick={deleteContact} data-id={id}>
          Delete
        </button>
      </div>
    </div>
  );
};
export default ConfirmModal;
