import { Injectable, Inject } from "@angular/core";
// import { ApiService } from "../../shared/common-services/api.service";
import { Observable } from "rxjs";
import { ApiService } from "src/shared/common-services";

// import { APP_CONFIG } from "../../shared/config/app.config";
// import { IAppConfig } from "../../shared/config/iapp.config";
import { Cache } from "src/shared/common-services/cache.service";
import { APP_CONFIG } from "src/shared/config/app.config";
import { IAppConfig } from "src/shared/config/iapp.config";

@Injectable({
  providedIn: "root"
})
export class playerService {
  appConfig: IAppConfig;
  constructor(
    @Inject(APP_CONFIG) appConfig: IAppConfig,
    private apiService: ApiService,
    private cache:Cache
  ) {
    this.appConfig = appConfig;
  }

  get(url: any, params: any, headers: any) {
    return new Promise((resolve, reject) => {
      this.apiService.getApi(url, params, headers).then(
        (resp: any) => {
          console.log(resp)
          if (resp?.statusCode == 200) {
            resolve(resp);
          } else {
            reject(this.apiService.commonStrings.http_error);
          }
        },
        (error) => {
          reject(this.apiService.commonStrings.http_error);
        }
      );
    });
  }

  save(url: any, data: any) {
    return new Promise((resolve, reject) => {
      this.apiService.postApi(url, data, null).then(
        (resp: any) => {
          if (resp?.statusCode == 200 || resp?.statusCode == 201) {
            resolve(resp);
          }else {
            reject(this.apiService.commonStrings.http_error);
          }
        },
        (error: any) => {
          console.error(error)
          reject(this.apiService.commonStrings.http_error);
        }
      );
    });
  }

  update(url: any, data: any) {
    return new Promise((resolve, reject) => {
      this.apiService.putApi(url, data, null).then(
        (resp: any) => {
          if (resp) {
            resolve(resp);
          } else {
            reject(this.apiService.commonStrings.http_error);
          }
        },
        (error: any) => {
          console.error(error)
          reject(this.apiService.commonStrings.http_error);
        }
      );
    });
  }

  delete(url: any,data:any, headers: any) {
    return new Promise((resolve, reject) => {
      this.apiService.deleteapi(url,data, headers).then(
        (resp: any) => {
          resolve(true);
        },
        (error) => {
          console.error(error)
          resolve(true);
        }
      );
    });
  }


  login(data: any) {
    return new Promise((resolve, reject) => {
      this.save(this.appConfig.endpoints.login, data).then(
        (resp: any) => {
          resolve(resp);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  signUp(data: any) {
    return new Promise((resolve, reject) => {
      this.save(this.appConfig.endpoints.signup, data).then(
        (resp: any) => {
          resolve(resp);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  
get isUserLoggedIn(){
  if(this.cache?.user?.loggedIn){
    return true
  }else {
    return false
  }
}
}
