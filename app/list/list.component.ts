/**
 * Created by Godai Yuusaku on 12/23/2016.
 */
import {Component, OnInit, trigger, style, state, transition, animate, keyframes} from '@angular/core';
import {Subscription} from "rxjs";

import {List} from "./list";
import {ListService} from "./list.service";

@Component({
    selector: "list",
    templateUrl: "/app/list/list.page.html",
    animations: [
        trigger("itemEnter", [
            state("in", style({opacity: "1", transform: "translateX(0)"})),

            transition("void => *", [
                style({opacity: 0, transform: "translateX(-100%)"}),
                animate("500ms ease-out")
            ]),
            transition("* => void", [
                animate("500ms ease-out", style({transform: "scaleY(0)", opacity: 0}))
            ])
        ])
    ]
})
export class ListComponent implements OnInit {
    name: string;
    newListName: string;
    newItemName: string;
    myLists: Array<List>;
    currentList: List;
    myListService: ListService;
    listSubscription: Subscription;
    itemErrorSubscription: Subscription;
    selected: Array<boolean>;
    itemError: boolean = false;
    listError: boolean = false;

    // state: string = "fadeIn";

    constructor(private listService: ListService) {
        this.myListService = listService;
        this.listSubscription = listService.myCurrentList$.subscribe(
            changeList => {
                this.myLists = changeList.myLists;
                this.currentList = changeList.currentList;
            }
        );
        this.itemErrorSubscription = listService.duplicateItemError$.subscribe(
            itemErrors => {
                this.itemError = itemErrors.duplicateItem;
                this.listError = itemErrors.duplicateList;
            }
        );
    }

    ngOnInit(): void {
        this.name = this.listService.name;
        this.myLists = this.listService.myLists;
        this.currentList = this.listService.currentList;
        this.itemError = this.listService.duplicateItem;
        this.listError = this.listService.duplicateList;
        this.selected = this.listService.selected;
    }

    currentDate: number = Date.now();
    theDate: Date = new Date();
    currentHour: number = this.theDate.getHours();

    addList(): void {
        //need error check for duplicate name
        this.listService.setListError(false);
        for (let i: number = 0; i < this.myLists.length; i++) {
            if (this.myLists[i].listName == this.newListName) {
                this.listService.setListError(true);
                break;
            }
        }
        if (!this.listError) {
            if (this.newListName) {
                let newList: List = new List(this.newListName);
                this.listService.setCurrentList(newList);
                this.myLists.push(newList);
            }
        }
        this.newListName = "";
    }

    addItem(): void {
        this.listService.setItemError(false);
        if (this.currentList.listItems.indexOf(this.newItemName) == -1) {
            if (this.newItemName) {
                this.currentList.listItems.push(this.newItemName);
            }
        }
        else {
            this.listService.setItemError(true);
        }
        this.newItemName = "";
    }

    clearLists(): void {
        this.listService.clearLists();
    }

    clearItems(): void {
        this.listService.clearItems();
    }

    clearCompleted(): void {
        this.listService.clearCompleted(this.selected);
    }

    updateSelected(): void {
        this.listService.selected = this.selected;
    }
}
