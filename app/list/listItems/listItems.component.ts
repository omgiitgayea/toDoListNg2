/**
 * Created by Godai Yuusaku on 1/3/2017.
 */
import {Component, Input, OnInit} from "@angular/core";
import {Subscription} from "rxjs";

import {ListService} from "../list.service"

@Component ({
    selector: "list-item",
    templateUrl: "/app/list/listItems/listItems.html"
})
export class ListItemsComponent implements OnInit {
    @Input() public itemName: string;
    editingItemName: boolean = false;
    oldItemName: string;
    itemErrorSubscription: Subscription;
    myListService: ListService;
    itemError: boolean;

    constructor(private listService: ListService) {
        this.myListService = listService;
        this.itemErrorSubscription = listService.duplicateItemError$.subscribe(
            itemErrors => {
                this.itemError = itemErrors.duplicateItem;
            }
        );
    }

    ngOnInit(): void {
        this.itemError = this.listService.duplicateItem;
    }

    editItemName(): void {
        this.oldItemName = this.itemName;
        this.editingItemName = true;
    }

    saveNewName(): void {
        this.editingItemName = false;
        this.listService.saveNewItemName(this.itemName, this.oldItemName);
        if (this.itemError) {
            this.itemName = this.oldItemName;
        }
    }

    resetItemName(): void {
        this.itemName = this.oldItemName;
    }

    deleteItem(): void {
        this.listService.deleteItem(this.itemName);
    }
}
