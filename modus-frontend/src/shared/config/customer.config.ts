import { IAppConfig } from "./iapp.config";

import { environment } from "../../environments/environment";

const customerConfig: IAppConfig = {
  host: "",

  restrictedChars: [],
  restrictedCharsRegEx: "[]",
  restrictedAllSpecialCharsRegEx: "[]",

  endpoints: {
    login:'users/login',
    signup:'users/registerUser',
    createData:'data',
    getData:'data',
    deleteData:'data/delete',
    updateData:'data/update'
  },
};

export const AppCustomerConfig: IAppConfig = customerConfig;
