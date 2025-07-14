import cosmosImageUrl from "../assets/space.jpg";
const NotFound = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "90vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          fontSize: "15rem",
          fontWeight: "900",
          margin: 0,
          backgroundImage: `url(${cosmosImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "transparent",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          userSelect: "none",
        }}
      >
        404
      </h1>
      <p style={{ fontSize: "1.5rem", color: "#333", marginTop: "1rem" }}>
        Данных нет, попробуйте заполнить и повторить
      </p>
    </div>
  );
};

export default NotFound;
