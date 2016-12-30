/**
 * Created by Godai Yuusaku on 12/23/2016.
 */
import {Component} from '@angular/core';
import {List} from "./list";
import {ListService} from "./list.service";


@Component({
    selector: "list",
    templateUrl: "/app/list/list.page.html"
})
export class ListComponent {
    name: string;
    newListName: string;
    myLists: Array<List>;
    currentList: List;
    // myService: ListService;

    constructor(private listService: ListService) {
        this.name = listService.name;
        this.myLists = listService.myLists;
        this.currentList = listService.currentList;
        // this.myService = listService;
    }

    currentDate: number = Date.now();
    theDate: Date = new Date();
    currentHour: number = this.theDate.getHours();

    onClickList(list: List): void {
        this.currentList = list;
        this.listService.currentList = list;
    }

    addList(): void {
        if (this.newListName) {
            let newList: List = new List(this.newListName);
            this.currentList = newList;
            this.listService.currentList = newList;
            this.myLists.push(newList);
            this.newListName = "";
        }
    }
}
