/**
 * Created by Godai Yuusaku on 12/29/2016.
 */
import {Component, Input, OnInit} from "@angular/core";
import {Subscription} from "rxjs";

import {ListService} from "../list.service"

@Component ({
    selector: "list-tab",
    templateUrl: "/app/list/listTabs/listTabs.html"
})
export class ListTabsComponent implements  OnInit {
    @Input() public listName: string;
    editingListName: boolean = false;
    oldListName: string;
    listErrorSubscription: Subscription;
    myListService: ListService;
    listError: boolean;

    constructor(private listService: ListService) {
        this.myListService = listService;
        this.listErrorSubscription = listService.duplicateItemError$.subscribe(
            listErrors => {
                this.listError = listErrors.duplicateList;
            }
        )
    }

    ngOnInit(): void {
        this.listError = this.listService.duplicateList;
    }

    editListName(): void {
        this.oldListName = this.listName;
        this.editingListName = true;
    }

    saveNewName(): void {
        this.editingListName = false;
        this.listService.saveNewListName(this.listName, this.oldListName);
        if (this.listError) {
            this.listName = this.oldListName;
        }
    }

    resetListName(): void {
        this.listName = this.oldListName;
    }

    deleteList(): void {
        this.listService.deleteList(this.listName);
    }

    changeList(): void {
        this.listService.getList(this.listName);
    }
}
