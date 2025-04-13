import mongoose from 'mongoose';
// * export a function that connects to db 
const db =  () => {
 mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("mongodb is connected")
    })
    .catch((err) => {
        console.log(process.env.MONGO_URL)
        console.log("mongodb is not connected")
    });
};
export default db;