/**
 * Created by Godai Yuusaku on 12/28/2016.
 */
import {Injectable} from "@angular/core";

import {List} from "./list";

@Injectable()
export class ListService {
    name: string = "Dave";
    myLists: Array<List> = [];
    currentList: List;

    getList(listName: string): void {
        for (let i: number = 0; i < this.myLists.length; i++) {
            if (this.myLists[i].listName == listName) {
                this.currentList = this.myLists[i];
                break;
            }
        }
    }

    setCurrentList(newList: List): void {
        this.currentList = newList;
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
    }
}
