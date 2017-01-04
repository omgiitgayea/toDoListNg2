/**
 * Created by Godai Yuusaku on 1/3/2017.
 */
import {Component, Input} from "@angular/core";
import {ListService} from "../list.service"

@Component ({
    selector: "list-item",
    templateUrl: "/app/list/listItems/listItems.html"
})
export class ListItemsComponent {
    @Input() public itemName: string;
    editingItemName: boolean = false;
    oldItemName: string;

    constructor(private listService: ListService) {}

    editItemName(): void {
        this.oldItemName = this.itemName;
        this.editingItemName = true;
    }

    saveNewName(): void {
        this.editingItemName = false;
        this.listService.saveNewItemName(this.itemName, this.oldItemName);
    }

    resetItemName(): void {
        this.itemName = this.oldItemName;
    }

    deleteItem(): void {
        this.listService.deleteItem(this.itemName);
    }
}
