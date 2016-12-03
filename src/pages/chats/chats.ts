import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Chat } from "api/models/whatsapp-models";
import { Chats, Messages } from "api/collections/whatsapp-collections";
import { MessagesPage } from "../messages/messages";
import { NavController } from "ionic-angular";

@Component({
	templateUrl: 'chats.html'
})

export class ChatsPage implements OnInit {
	chats;

	constructor(private navCtrl: NavController) {

	}

  ngOnInit() {

	//Chats.find() returns an Observable so we can bundle it with Messages.find(). Everything will work as a one body, one Observable.
	//Messages.find() looks for last messages of each chat.
	//Chats.find({}) gets all the chats in an array of Chat objects
    this.chats = Chats
      	.find({})
      	.mergeMap((chats: Chat[]) =>
	  	//combineLatest which takes few Observables and combines them into one Observable.
			Observable.combineLatest(
				...chats.map((chat: Chat) =>
					Messages
						.find({chatId: chat._id})
						//RxJS contains a operator called startWith which emit some value before Messages.find
						.startWith(null)
						.map(messages => {
							if (messages) chat.lastMessage = messages[0];
							return chat;
						})
				)
			)
      	).zone();
  }

	showMessages(chat): void {
		this.navCtrl.push(MessagesPage, {chat});
	}

	removeChat(chat: Chat): void {
		// TODO: Implement it later
	}
}