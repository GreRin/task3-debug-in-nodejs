const Sequelize = require('sequelize');
                                //database username   password
const sequelize = new Sequelize('gamedb', 'postgres', '557799', {
    host: 'localhost',
    dialect: 'postgres'
})

sequelize.authenticate().then(
    function success() {
        console.log("Connected to DB");
    },

    function fail(err) {
        console.log(`Error: ${err}`);
    }
)
