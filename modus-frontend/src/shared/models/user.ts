export class User {
    sessionTime: number = 0;
    errorFlag: number = 4;
    authorizationToken: string = '';
    user: string = '';
    username: string = '';
    loggedIn:boolean=false;
    email:string='';


    constructor(jsonObj: any) {
        if (jsonObj) {
            this.sessionTime = jsonObj.sessionTime ? jsonObj.sessionTime : 0;
            this.errorFlag = jsonObj.errorFlag ? jsonObj.errorFlag : 4;
            this.authorizationToken = jsonObj.authorizationToken ? jsonObj.authorizationToken : '';
            this.user = jsonObj.user ? jsonObj.user : '';
            this.email = jsonObj.email ? jsonObj.email : '';
            this.username = jsonObj.username ? jsonObj.username : '';
            this.loggedIn = jsonObj.loggedIn ? jsonObj.loggedIn : false;

        }
    }
}