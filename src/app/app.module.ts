import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { ChatsPage } from "../pages/chats/chats";
import { MessagesPage } from "../pages/messages/messages";
import { MomentModule } from "angular2-moment";

import { LoginComponent } from "../pages/auth/login";
import { VerificationComponent } from "../pages/verification/verification";
import { ProfileComponent } from "../pages/profile/profile";
import { ChatsOptionsComponent } from "../pages/chats-options/chats-options";

@NgModule({
	declarations: [
		MyApp,
		ChatsPage,
    	MessagesPage,
		TabsPage,
    	LoginComponent,
		VerificationComponent,
		ProfileComponent,
		ChatsOptionsComponent
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
		TabsPage,
    	LoginComponent,
		VerificationComponent,
		ProfileComponent,
		ChatsOptionsComponent
	],
	providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
