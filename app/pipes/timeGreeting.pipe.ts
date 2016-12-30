/**
 * Created by Godai Yuusaku on 12/28/2016.
 */
import {Pipe, PipeTransform} from "@angular/core";
// Takes the time of day and returns Good morning, afternoon or evening

@Pipe({name: "greeting"})
export class GreetingPipe implements PipeTransform {
    transform (currentTime: number): string {
        let hours: number = currentTime;
        if (hours < 12)
        {
            return "Good morning, ";
        }
        else if (hours < 18)
        {
            return "Good afternoon, ";
        }
        else
        {
            return "Good evening, ";
        }
    }
}
