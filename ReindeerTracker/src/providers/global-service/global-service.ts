import { Injectable } from "@angular/core";


@Injectable()


export class GlobalServiceProvider {
    range: any = 1;

    cValue(event, nome) {
        console.log("SliderValue", event._valA);
        this.range = event._valA;
    }
}