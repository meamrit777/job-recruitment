const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <p style={{ marginBottom: "20px" }}>{message}</p>
        <button
          onClick={onConfirm}
          style={{
            marginRight: "10px",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          OK
        </button>
        <button
          onClick={onCancel}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
