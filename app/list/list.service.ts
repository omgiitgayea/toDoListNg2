/**
 * Created by Godai Yuusaku on 12/28/2016.
 */
import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject"

import {List} from "./list";

@Injectable()
export class ListService {
    name: string = "Dave";
    myLists: Array<List> = [];
    currentList: List;
    duplicateItem: boolean = false;
    duplicateList: boolean = false;

    myCurrentList = new Subject<any>();
    duplicateItemError = new Subject<any>();

    myCurrentList$ = this.myCurrentList.asObservable();
    duplicateItemError$ = this.duplicateItemError.asObservable();

    sendCurrentList(): void {
        this.myCurrentList.next({currentList: this.currentList, myLists: this.myLists});
    }

    sendErrors(): void {
        this.duplicateItemError.next({duplicateList: this.duplicateList, duplicateItem: this.duplicateItem});
    }

    getList(listName: string): void {
        for (let i: number = 0; i < this.myLists.length; i++) {
            if (this.myLists[i].listName == listName) {
                this.currentList = this.myLists[i];
                this.sendCurrentList();
                break;
            }
        }
    }

    setCurrentList(newList: List): void {
        this.currentList = newList;
        this.sendCurrentList();
    }

    saveNewListName(newName: string, oldName: string): void {
        this.duplicateList = false;
        if (newName != oldName)
            for (let i: number = 0; i < this.myLists.length; i++) {
                if (this.myLists[i].listName == newName) {
                    this.duplicateList = true;
                    break;
                }
            }
        if (!this.duplicateList)
            for (let i: number = 0; i < this.myLists.length; i++) {
                if (this.myLists[i].listName == oldName) {
                    this.myLists[i].listName = newName;
                    break;
                }
            }
        this.sendErrors();
    }

    deleteList(listName: string): void {
        for (let i: number = 0; i < this.myLists.length; i++) {
            if (this.myLists[i].listName == listName) {
                this.myLists.splice(i, 1);
                break;
            }
        }
        // check if currentList is one that was deleted
        if (this.currentList.listName == listName) {
            this.currentList = this.myLists[0];
        }
        this.sendCurrentList();
    }

    clearLists(): void {
        this.myLists = [];
        this.currentList = null;
        this.sendCurrentList();
    }

    deleteItem(itemName: string): void {
        this.currentList.listItems.splice(this.currentList.listItems.indexOf(itemName), 1);
    }

    saveNewItemName(itemName: string, oldItemName: string): void {
        if (itemName != oldItemName)
            if (this.currentList.listItems.indexOf(itemName) == -1) {
                this.currentList.listItems.splice(this.currentList.listItems.indexOf(oldItemName), 1, itemName);
                this.duplicateItem = false;
            }
            else {
                this.duplicateItem = true;
            }
        this.sendErrors();
    }

    clearItems(): void {
        this.currentList.listItems = [];
        this.sendCurrentList();
    }

    clearCompleted(completedList: any): void {
        for (let key in completedList) {
            if (this.currentList.listItems.indexOf(key) != -1 && completedList[key]) {
                this.currentList.listItems.splice(this.currentList.listItems.indexOf(key), 1);
                delete completedList[key];
            }
        }
    }

    setItemError(itemError: boolean): void {
        this.duplicateItem = itemError;
        this.sendErrors();
    }

    setListError(listError: boolean): void {
        this.duplicateList = listError;
        this.sendErrors();
    }
}
