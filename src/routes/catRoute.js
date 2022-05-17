const routes = ({ catService }) => ({
    "/cats:get": async (req, res) => {
        throw new Error("testing! just keep quiet");
        res.write("GET");
        res.end();
    },
    "/cats:post": async (req, res) => {
        throw new Error("testing! just keep quiet");
        res.write("GET");
        res.end();
    },
});

export {routes}
