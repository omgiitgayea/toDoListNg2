import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

import {AppComponent}  from './app.component';
import {AboutComponent} from "./about/about.component";
import {ListComponent} from "./list/list.component";
import {NoPageComponent} from "./noPage/noPage.component";
import {ListService} from "./list/list.service";
import {GreetingPipe} from "./pipes/timeGreeting.pipe";
import {ListTabsComponent} from "./list/listTabs/listTabs.component"

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot([
            {path: "about", component: AboutComponent},
            {path: "lists", component: ListComponent},
            {path: "", component: ListComponent},
            {path: "**", component: NoPageComponent}
        ])
    ],
    declarations: [
        AppComponent,
        AboutComponent,
        ListComponent,
        NoPageComponent,
        ListTabsComponent,
        GreetingPipe
    ],
    providers: [ListService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
