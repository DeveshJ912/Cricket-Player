import { InjectionToken } from "@angular/core";

import { environment } from "../../environments/environment";

import { IAppConfig } from "./iapp.config";
import { AppCustomerConfig } from "./customer.config";

export const APP_CONFIG = new InjectionToken("app.config", {
  providedIn: "root",
  factory() {}
});

let envConfig: IAppConfig;

envConfig = AppCustomerConfig;

if (environment.delegateUrl) {
  envConfig.host = environment.delegateUrl;
}
// if (environment.onlineUrl) {
//   envConfig.host = environment.onlineUrl;
// }

export const AppConfig: IAppConfig = envConfig;
