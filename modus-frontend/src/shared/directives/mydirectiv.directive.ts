import { Directive,ElementRef } from "@angular/core";

@Directive({
    selector:'[highlighter]'
})
export class HighlightDirective{
    constructor(el:ElementRef){
        el.nativeElement.style.backgroundColor = "red";
    }
}