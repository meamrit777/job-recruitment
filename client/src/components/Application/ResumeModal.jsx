const ResumeModal = ({ imageUrl, onClose }) => {
  const handleBackdropClick = (e) => {
    if (e.target.className === "resume-modal") {
      onClose();
    }
  };

  return (
    <div className="resume-modal" onClick={handleBackdropClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt="resume" />
      </div>
    </div>
  );
};

export default ResumeModal;
