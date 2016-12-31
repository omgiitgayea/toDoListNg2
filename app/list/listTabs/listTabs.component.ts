/**
 * Created by Godai Yuusaku on 12/29/2016.
 */
import {Component, Input} from "@angular/core";
import {ListService} from "../list.service"

@Component ({
    selector: "list-tab",
    templateUrl: "/app/list/listTabs/listTabs.html"
})
export class ListTabsComponent {
    @Input() public listName: string;
    editingListName: boolean = false;
    oldListName: string;

    constructor(private listService: ListService) {}

    editListName(): void {
        this.oldListName = this.listName;
        this.editingListName = true;
    }

    saveNewName(): void {
        this.editingListName = false;
        this.listService.saveNewListName(this.listName, this.oldListName);
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
