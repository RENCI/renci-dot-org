export const Pre = ({ children }) => {
  return (
    <pre
      style={{
        backgroundColor: "#234",
        color: "#def",
        fontSize: "80%",
        padding: "1rem",
        overflowX: "auto",
        whiteSpace: "pre-wrap",
      }}
    >
      {children}
    </pre>
  );
};
