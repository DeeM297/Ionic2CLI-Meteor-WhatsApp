import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { ChatsPage } from "../pages/chats/chats";
import { MessagesPage } from "../pages/messages/messages";
import { MomentModule } from "angular2-moment";

@NgModule({
	declarations: [
		MyApp,
		ChatsPage,
    	MessagesPage,
		TabsPage
	],
	imports: [
		IonicModule.forRoot(MyApp),
    	MomentModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		ChatsPage,
		MessagesPage,
		TabsPage
	],
	providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
