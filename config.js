module.exports = { 
    DATABASE_URL : process.env.DATABASE_URL || "mongodb://localhost/donutsdb",
    //DATABASE_URL : "mongodb+srv://admin1:admin123@projectitesm-bnsrl.mongodb.net/donutsdb?retryWrites=true&w=majority",
    PORT : process.env.PORT || 8080,
    SECRET_TOKEN : process.env.SECRET_TOKEN || 'secret'
};