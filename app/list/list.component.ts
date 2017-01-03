/**
 * Created by Godai Yuusaku on 12/23/2016.
 */
import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {List} from "./list";
import {ListService} from "./list.service";

@Component({
    selector: "list",
    templateUrl: "/app/list/list.page.html"
})
export class ListComponent implements OnInit {
    name: string;
    newListName: string;
    myLists: Array<List>;
    currentList: List;
    listService: ListService;
    listSubscription: Subscription;

    constructor(private listService: ListService) {
        this.listService = listService;
        this.listSubscription = listService.myCurrentList$.subscribe(
            changeList => {
                this.myLists = changeList.myLists;
                this.currentList = changeList.currentList;
            }
        )
    }

    ngOnInit(): void
    {
        this.name = this.listService.name;
        // put the rest here
    }

    currentDate: number = Date.now();
    theDate: Date = new Date();
    currentHour: number = this.theDate.getHours();

    addList(): void {
        if (this.newListName) {
            let newList: List = new List(this.newListName);
            // this.currentList = newList;
            this.listService.setCurrentList(newList);
            this.currentList = this.listService.currentList;
            this.myLists.push(newList);
            this.newListName = "";
        }
    }
}
