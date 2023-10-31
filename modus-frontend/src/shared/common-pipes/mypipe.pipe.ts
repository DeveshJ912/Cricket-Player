import { Pipe ,PipeTransform} from '@angular/core'
@Pipe({
    name:'dotpipe'
})

export class Mypipe implements PipeTransform{
    transform(value: any,len:number=10) {
        if(len){
            value = value.substr(0,len) + "...."
            return value;
        }else{
            value = value.substr(0,10) + "...."
            return value;
        }
    }
}