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

    myCurrentList = new Subject<any>();

    myCurrentList$ = this.myCurrentList.asObservable();

    sendCurrentList(list:List, lists:Array<List> = this.myLists): void
    {
        let fred:any = {currentList: list, myLists: lists};
        this.myCurrentList.next(fred);
    }

    getList(listName: string): void {
        for (let i: number = 0; i < this.myLists.length; i++) {
            if (this.myLists[i].listName == listName) {
                this.currentList = this.myLists[i];
                this.sendCurrentList(this.currentList);
                break;
            }
        }
    }

    setCurrentList(newList: List): void {
        this.currentList = newList;
        this.sendCurrentList(this.currentList);
    }

    saveNewListName(newName: string, oldName: string): void {
        for (let i: number = 0; i < this.myLists.length; i++) {
            if (this.myLists[i].listName == oldName) {
                this.myLists[i].listName = newName;
                break;
            }
        }
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
        this.sendCurrentList(this.currentList, this.myLists);
    }

    clearLists(): void
    {
        this.myLists = [];
        this.currentList = null;
        this.sendCurrentList(this.currentList, this.myLists);
    }

    deleteItem(itemName: string): void {

    }

    saveNewItemName(itemName: string, oldItemName: string): void {

    }
}
