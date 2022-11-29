import express from "express";
import bodyParser from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import User from "./api/User";
import Booking from "./api/Booking";
import Parking from "./api/Parking";
import Opinion from "./api/Opinion";
import Message from "./api/Message";
import Chat from "./api/Chat";
import auth from "./api/auth";

const app = express();
const port = process.env.PORT || 5432;

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json())
app.use(cors());

app.use('/api/auth', auth)
app.use('/api/users', User)
app.use('/api/bookings', Booking)
app.use('/api/parkings', Parking)
app.use('/api/opinions', Opinion)
app.use('/api/messages', Message)
app.use('/api/chats', Chat)

app.get('/', ( req: express.Request, res: express.Response ) => {
	res.send('Hello World!')
})

mongoose.connect('mongodb://localhost/aparcamDB', { useNewUrlParser : true } as ConnectOptions)
	.then(() => {
		// tslint:disable-next-line:no-console
        app.listen(port, () => console.log("Server corriendo en el puerto " + port));
	})
	.catch((err) => {
		// tslint:disable-next-line:no-console
		console.log(err);
	});
