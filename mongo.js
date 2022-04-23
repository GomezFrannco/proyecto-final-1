const obj = 



db.createUser({user: "sukiDev", pwd: "Password123¡", roles:[{role: "userAdminAnyDatabase", db: "admin"}, {role: "readWriteAnyDatabase", db: "admin"}]})


db.createUser({user: "pepe", pwd: "asd456", roles: [{role: "read", db: "ecommerce"}]})
db.createUser({user: 'pepe', pwd: 'asd456', roles: [{role: 'read', db: 'ecommerce'}]})






