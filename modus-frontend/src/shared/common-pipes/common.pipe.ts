import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
// import { ConstantService } from 'shared/common-services';


@Pipe({
    name: 'formatSrNo'
})
export class FormatSrNoPipe implements PipeTransform {
    transform(value: any): any {
        value = value.toString();
        if (value) {
            let arr = value.split("");
            let format = '0' + arr[0] + '/' + '0' + arr[1];
            return format;
        }
    }
}

@Pipe({ name: 'slugify' })
export class SlugifyPipe implements PipeTransform {
    transform(input: string): string {
        return input.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }
}

@Pipe({name: 'safe'})
export class SafePipe implements PipeTransform {

    constructor(protected sanitizer: DomSanitizer) {
    }

    public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
        switch (type) {
            case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
            case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
            case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
            case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);

            default: throw new Error(`Invalid safe type specified: ${type}`);
        }
    }
}

// @Pipe({ name: "category" })
// export class CategoryPipe implements PipeTransform {
//     constructor(private constantService: ConstantService) {}
//     parse(category: string | number): number {
//         let categoryval = 0;
//         this.constantService.constants.categories.forEach((item:any) => {
//             if (item.display == category) {
//                 categoryval = item.value;
//             }
//         }, this);
//         return categoryval;
//     }

//     transform(categoryval: number): string {
//         let categoryString = "";
//         this.constantService.constants.categories.forEach((item:any) => {
//             if (item.value == categoryval) {
//                 categoryString = item.display;
//             }
//         }, this);
//         return categoryString;
//     }
// }

// @Pipe({ name: "foodtype" })
// export class FoodTypePipe implements PipeTransform {
//     constructor(private constantService: ConstantService) {}
//     parse(foodType: string | number): number {
//         let foodTypeVal = 0;
//         this.constantService.constants.foodType.forEach((item:any) => {
//             if (item.display == foodType) {
//                 foodTypeVal = item.value;
//             }
//         }, this);
//         return foodTypeVal;
//     }

//     transform(foodTypeVal: number): string {
//         let foddTypeString = "";
//         this.constantService.constants.foodType.forEach((item:any) => {
//             if (item.value == foodTypeVal) {
//                 foddTypeString = item.display;
//             }
//         }, this);
//         return foddTypeString;
//     }
// }