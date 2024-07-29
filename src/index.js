require('dotenv').config();
import server from './server';

server.listen(3000  , async () => {
    console.log(`Server now listening at localhost:3000`);
});