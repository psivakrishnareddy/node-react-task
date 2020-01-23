function User(fname, lname, email, password) {
  (this.fname = fname),
    (this.lname = lname),
    (this.email = email),
    (this.password = password);
}

function Item(id, name, tax, image) {
  (this.name = name), (this.tax = tax), (this.image = image), (this.id = id);
}

module.exports = { User, Item };

// create table users (
// 	fname varchar(50),
//    lname VARCHAR(50),
// 	email varchar(50),
// 	password varchar,
// 	userId  SERIAL PRIMARY KEY
// )
