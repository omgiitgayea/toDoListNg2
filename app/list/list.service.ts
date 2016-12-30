/**
 * Created by Godai Yuusaku on 12/28/2016.
 */
import {Injectable} from "@angular/core";

import {List} from "./list"

@Injectable()
export class ListService {
    name: string = "Dave";
    myLists: Array<List> = [];
    currentList: List;
}
