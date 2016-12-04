import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { NavController, PopoverController } from "ionic-angular";

import { Chat } from "api/models/whatsapp-models";
import { Chats, Messages } from "api/collections/whatsapp-collections";
import { MessagesPage } from "../messages/messages";
import { ChatsOptionsComponent } from "../chat-options/chat-options";


@Component({
	templateUrl: 'chats.html'
})

export class ChatsPage implements OnInit {
	chats;

	  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController) {

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

	showOptions(): void {
		const popover = this.popoverCtrl.create(ChatsOptionsComponent, {}, {
			cssClass: 'options-popover'
		});
		
		popover.present();
	}

	showMessages(chat): void {
		this.navCtrl.push(MessagesPage, {chat});
	}

	removeChat(chat: Chat): void {
		// TODO: Implement it later
	}
}