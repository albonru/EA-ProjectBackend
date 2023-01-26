import express from "express";
import bodyParser from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import user from "./api/User";
import User from "./model/User";
import Chat, { IChat } from "./model/Chat";
import Messsage, { IMessage } from "./model/Message";
import Booking from "./api/Booking";
import Parking from "./api/Parking";
import Opinion from "./api/Opinion";
import Message from "./api/Message";
import chat from "./api/Chat";
import auth from "./api/auth";
import {WebSocket} from "ws";
import Report from "./api/Report";

const app = express();
const port = process.env.PORT || 5432;
const port1 = 8080;
const wss = new WebSocket.Server({ port: port1})

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json())
app.use(cors());

app.use('/api/auth', auth)
app.use('/api/users', user)
app.use('/api/bookings', Booking)
app.use('/api/parkings', Parking)
app.use('/api/opinions', Opinion)
app.use('/api/messages', Message)
app.use('/api/chats', chat)
app.use('/api/reports', Report)

app.get('/', ( req: express.Request, res: express.Response ) => {
	res.send('Hello World!')
})

const users: WebSocket[] = [];
const chats: IChat[] = [];

wss.on('connection', (ws, request) => {
	let id = 0;
  while (true) {
    if (!users.hasOwnProperty(id)) {users[id] = ws; break}
		id++;}
	// tslint:disable-next-line:no-console
	console.log(users.length + " usuario conectado!");
  ws.on('message', async (message: any) => {
	// tslint:disable-next-line:no-console
    console.log(`Received message => ${message}`);
	let num = 0;
		const client1 = false;
		const str = message.toString().split("/");
		const comp1 = String(str[0]);
		const comp2 = String("init");
		const equals = comp1.localeCompare(comp2);
		const comp3 = String("close");
    	const equals2 = comp1.localeCompare(comp3);
		if(equals === 0){
			// tslint:disable-next-line:no-console
			console.log("Init...");
			let cont = 0;
			let cont1 = 0;
			let is1 = false;
			let exist = false;
			const user1 = await User.findById(str[1]);
			// tslint:disable-next-line:no-console
			console.log(user1.name);
			const user2 = await User.findOne({name: str[2]});
			// tslint:disable-next-line:no-console
			console.log(user2.name);
				let chat11 = await Chat.findOne({
					client1: user1.id, client2: user2.id
				});
				// tslint:disable-next-line:no-console
				console.log(chat11);
				if(chat11 != null){
					exist = true;
					is1 = true;
				}else{
				chat11 = await Chat.findOne({
					client1: user2.id, client2: user1.id}).populate('messages');
				if(chat11 != null){
					exist = true;
				}}
			// chats.forEach(xat => {
			// 	if(xat.client1 === user1 && xat.client2 === user2){
			// 		exist = true;
			// 		cont1 = chats.indexOf(xat);
			// 	}
			// 	if(xat.client2 === user1 && xat.client1 === user2){
			// 		exist = true;
			// 		cont1 = chats.indexOf(xat);
			// 	}
			// });
			if(!exist){
			// tslint:disable-next-line:no-console
			console.log("chat NO exist!");
			while(true){
			if(chats[cont] == null) {cont1 = cont; break;}
				cont++;}
			const chat1 = new Chat({
				client1: user1.id,
				client2: user2.id,
				wsclient1: [String(ws)]
			})
			const user111 = await User.findByIdAndUpdate(user1.id, {
				chats:chat1
			}, { new: true });
			const user222 = await User.findByIdAndUpdate(user2.id, {
				chats:chat1
			}, { new: true });
			await chat1.save().catch(Error);
			chats[cont1] = chat1;
			num = cont1;
			ws.send(chats[cont1].id);
			// tslint:disable-next-line:no-console
			console.log(chats[cont1].id);
			}
			else{
				// tslint:disable-next-line:no-console
				console.log("chat exist!");
				// if(chats[cont1].client1 === user1){
				// 	chats[cont1].wsclient1[chats[cont1].wsclient1.length] = users.indexOf(ws).toString();
				// 	client1 = true;
				// }
				// else{
				// 	chats[cont1].wsclient2[chats[cont1].wsclient2.length] = users.indexOf(ws).toString();
				// }
				ws.send(chat11.id);
				// tslint:disable-next-line:no-console
				console.log(chat11.id);
			}
		}
		if(equals2 === 0){
			// tslint:disable-next-line:no-console
			console.log("Close...");
			const chat2 = await Chat.findById(str[1]);
			if(chat2 != null){

			delete chats[chats.indexOf(chat2)].wsclient1[chats[chats.indexOf(chat2)].wsclient1.indexOf(String(ws))];
			delete chats[chats.indexOf(chat2)].wsclient2[chats[chats.indexOf(chat2)].wsclient2.indexOf(String(ws))];
			}
			delete users[id];
			// tslint:disable-next-line:no-console
			console.log("the client has disconnected");
		}
		if(equals !== 0 && equals2 !== 0){
			// tslint:disable-next-line:no-console
			console.log("Message...");
			const chat3 = await (await Chat.findById(str[0]).populate('wsclient1')).populate('wsclient2');
			let isclient1 = false;
			// tslint:disable-next-line:no-console
			console.log(String(str[2]));
			const comp111 = String(str[2]);
			// tslint:disable-next-line:no-console
			console.log(String(chat3.client1));
			const comp222 = String(chat3.client1);
			const equals1221 = comp111.localeCompare(comp222);
			if(equals1221 === 0){
				isclient1 = true;
			}
			else{
				isclient1 = false;
			}
			// tslint:disable-next-line:no-console
			console.log(isclient1);
			if(isclient1){
				const messagetosend1 = new Messsage({
					chat: chat3,
					client: chat3.client1,
					send: Date.now(),
					text:str[1]});
					try{
						// tslint:disable-next-line:no-console
						await messagetosend1.save().catch(error => console.log(error));
						// tslint:disable-next-line:no-console
						console.log("Mensaje guardado");
						// tslint:disable-next-line:no-console
						console.log("Mensaje: " + messagetosend1);
						chat3.messages.push(messagetosend1);
					await chat3.save().catch(Error);
					}
					catch(Error){
						// tslint:disable-next-line:no-console
						console.log("Mensaje NO guardado: " + Error);
					}
				for (let q = 0; q < users.length; q++){
					try{
						chat3.wsclient2.indexOf(String(users[q]));
						users[q].send(chats[chats.indexOf(chat3)].id + "/" + str[1]);
					}
					catch{
						// tslint:disable-next-line:no-console
						console.log("message NOT send to client2");
					}
				}
			}
			else{
				const messagetosend2 = new Messsage({
					chat: chat3,
					client: chat3.client2,
					send: Date.now(),
					text:str[1]});
					try{
						// tslint:disable-next-line:no-console
						await messagetosend2.save().catch(error => console.log(error));
						// tslint:disable-next-line:no-console
						console.log("Mensaje guardado");
						// tslint:disable-next-line:no-console
						console.log("Mensaje: " + messagetosend2);
						chat3.messages.push(messagetosend2);
					await chat3.save().catch(Error);
					}
					catch(Error){
						// tslint:disable-next-line:no-console
						console.log("Mensaje NO guardado: " + Error);
					}
				for (let q = 0; q < users.length; q++){
					try{
						chat3.wsclient1.indexOf(String(users[q]));
						users[q].send(chats[chats.indexOf(chat3)].id + "/" + str[1]);
					}
					catch{
						// tslint:disable-next-line:no-console
						console.log("message NOT send to client1");
					}
				}
			}
		}
	}
)
  ws.on("close", async () => {
	const chat2 = await Chat.findById(String(ws));
			if(chat2 != null){
			delete chats[chats.indexOf(chat2)].wsclient1[chats[chats.indexOf(chat2)].wsclient1.indexOf(String(ws))];
			delete chats[chats.indexOf(chat2)].wsclient2[chats[chats.indexOf(chat2)].wsclient2.indexOf(String(ws))];
			}
			delete users[id];
			// tslint:disable-next-line:no-console
			console.log("the client has disconnected");
	// tslint:disable-next-line:no-console
	console.log("the client has disconnected");
});
}
)

mongoose.connect('mongodb://localhost/aparcamDB', { useNewUrlParser : true } as ConnectOptions)
	.then(() => {
		// tslint:disable-next-line:no-console
        app.listen(port, () => console.log("Server corriendo en el puerto " + port));
	})
	.catch((err) => {
		// tslint:disable-next-line:no-console
		console.log(err);
	});
