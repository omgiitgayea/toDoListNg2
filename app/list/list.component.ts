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
    newItemName: string;
    myLists: Array<List>;
    currentList: List;
    myListService: ListService;
    listSubscription: Subscription;

    constructor(private listService: ListService) {
        this.myListService = listService;
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
        this.myLists = this.listService.myLists;
        this.currentList = this.listService.currentList;
    }

    currentDate: number = Date.now();
    theDate: Date = new Date();
    currentHour: number = this.theDate.getHours();

    addList(): void {
        if (this.newListName) {
            let newList: List = new List(this.newListName);
            this.listService.setCurrentList(newList);
            this.myLists.push(newList);
            this.newListName = "";
        }
    }

    addItem(): void {
        if (this.newItemName) {
            this.currentList.listItems.push(this.newItemName);
            this.newItemName = "";
        }
    }

    clearLists(): void {
        this.listService.clearLists();
    }
}
