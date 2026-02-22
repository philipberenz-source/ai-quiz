export const startServer = ({ server, port, onStart }) =>
  new Promise((resolve) => {
    server.listen(port, () => {
      if (typeof onStart === "function") {
        onStart(port);
      }
      resolve();
    });
  });
