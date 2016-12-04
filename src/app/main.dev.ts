import 'meteor-client-side';
import 'accounts-phone';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { MeteorObservable } from 'meteor-rxjs';

declare let Meteor;

Meteor.startup(() => {
  const sub = MeteorObservable.autorun().subscribe(() => {

    //If user is logged in, he'll be sent to chat view
    if (Meteor.loggingIn()) return;

    setTimeout(() => {
        sub.unsubscribe();
    });
 
    platformBrowserDynamic().bootstrapModule(AppModule);
  });
});
