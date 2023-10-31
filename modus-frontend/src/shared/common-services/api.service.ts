import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError as observableThrowError, Observable, Subject } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { APP_CONFIG } from "../config/app.config";
import { IAppConfig } from "../config/iapp.config";

// import cache

@Injectable({
  providedIn: "root"
})
export class ApiService {
  appConfig: IAppConfig;
  commonStrings: any = {};
  private actionSource = new Subject<any>();
  currentAction = this.actionSource.asObservable();

  constructor(
    @Inject(APP_CONFIG) appConfig: IAppConfig,
    private http: HttpClient
  ) {
    this.appConfig = appConfig;
    this.commonStrings = {
      no_access: "Please login to complete the application",
      http_error: "Ahh! something is wrong, Please contact support",
      download_error: "Unable to download PDF...",
      data_saved: "Data saved",
      data_updated: "Data Updated",
      file_size: "Please Upload file size below 5Mb",
      file_extention: "Please upload a valid file type",
      file_extention_pdf: "Allowed file types are PDF only",
      file_extention_xml: "Allowed file types are zip only",
      file_number: "Only five number of files are allowed"
    };
  }

  sendAction(message: any) {
    this.actionSource.next(message);
    // for auto save on tab navigation
  }

  unSubscribe(subs: any) {
    if (
      subs &&
      typeof subs === "object" &&
      typeof subs.unsubscribe === "function"
    ) {
      subs.unsubscribe();
    } else {
      if (subs && subs.length) {
        subs.forEach((localSub: any) => {
          this.unSubscribe(localSub);
        });
      } else if (subs && typeof subs === "object") {
        Object.keys(subs).forEach(key => {
          this.unSubscribe(subs[key]);
        });
      } else {
        console.warn("Not sure what it is...", subs);
      }
    }
  }

  // API Methods

  uploadWithProgress(url: any, data: any) {
    return this.http
      .post(this.appConfig.host + url, data, {
        reportProgress: true,
        observe: "events"
      })
      .pipe(map(res => res as {}), catchError(this.handleError));
  }

  // upload method

  upload(url: any, data: any) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.appConfig.host + url, data)
        .pipe(map(res => res as {}), catchError(this.handleError))
        .subscribe(
          (res: any) => {
            if (res && res.uploadStatus == "Success") {
              resolve(res);
            } else {
              reject(
                res && res.errorDesc
                  ? res.errorDesc
                  : this.commonStrings.http_error
              );
            }
          },
          error => {
            reject(this.commonStrings.http_error);
          }
        );
    });
  }

  handleError(error: any): Observable<Response> {
    console.error(error);
    if (error.status === 401 || error.status === 0) {
      return observableThrowError(error.message);
    } else {
      return observableThrowError(this.commonStrings.http_error);
    }
  }

  // common parameters

  appendCommonParameters(data: any) {
    if (!data) {
      data = {
        // appId: this.cache?.user?.applicationId ?? 0
      };
    } else {
      if (data.appId == undefined) {
        // data.appId = this.cache?.user?.applicationId ?? 0;
      }
    }

    if (data.appId == 0 || data.appID) delete data.appId;
    // appID is case for status API where we are sending appID insted of appId.
    return data;
  }

  // 1. getApi
  getApi(url: any, params: any, headers: any) {
    if (!headers || !headers["Content-Type"]) {
      headers = new HttpHeaders({ "Content-Type": "application/json" });
    }

    // params = this.appendCommonParameters(params);

    return new Promise((resolve, reject) => {
      this.http
        .get(this.appConfig.host + url, { params: params, headers: headers })
        .pipe(map(res => res as {}), catchError(this.handleError))
        .subscribe(
          res => {
            resolve(res);
          },
          error => {
            reject(this.commonStrings.http_error);
          }
        );
    });
  }

  getImages(url: any, params: any, headers: any) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.appConfig.host + url, {
          params: params,
          headers: headers,
          responseType: 'blob' as 'json'
        })
        .pipe(catchError(this.handleError))
        .subscribe(
          res => {
            resolve(res);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  // 2. post API

  postApi(url: any, data: any, headers: any) {
    if (!headers || !headers.get("Content-Type")) {
      headers = new HttpHeaders({ "Content-Type": "application/json" });
    }

    // data = this.appendCommonParameters(data);

    return new Promise((resolve, reject) => {
      this.http
        .post(this.appConfig.host + url, JSON.stringify(data), {
          headers: headers
        })
        .pipe(map(res => res as {}), catchError(this.handleError))
        .subscribe(
          res => {
            resolve(res);
          },
          error => {
            reject(this.commonStrings.http_error);
          }
        );
    });
  }

  // 3. put api

  putApi(url: any, data: any, headers: any) {
    if (!headers || !headers.get("Content-Type")) {
      headers = new HttpHeaders({ "Content-Type": "application/json" });
    }

    // data = this.appendCommonParameters(data);

    return new Promise((resolve, reject) => {
      this.http
        .put(this.appConfig.host + url, JSON.stringify(data), {
          headers: headers
        })
        .pipe(map(res => res as {}), catchError(this.handleError))
        .subscribe(
          res => {
            resolve(res);
          },
          error => {
            reject(this.commonStrings.http_error);
          }
        );
    });
  }

  // 4. delete api

  deleteapi(url: any, data: any, headers: any) {
    if (!headers || !headers.get("Content-Type")) {
      headers = new HttpHeaders({ "Content-Type": "application/json" });
    }

    return new Promise((resolve, reject) => {
      this.http
        .delete(this.appConfig.host + url,{ headers: headers,body:JSON.stringify(data) })
        .pipe(map(res => res as {}), catchError(this.handleError))
        .subscribe(
          res => {
            resolve(res);
          },
          error => {
            reject(this.commonStrings.http_error);
          }
        );
    });
  }

  postApiCancellable(url: any, data: any, headers: any) {
    if (!headers || !headers.get("Content-Type")) {
      headers = new HttpHeaders({ "Content-Type": "application/json" });
    }

    data = this.appendCommonParameters(data);

    return this.http
      .post(this.appConfig.host + url, JSON.stringify(data), {
        headers: headers
      })
      .pipe(map(res => res as {}), catchError(this.handleError));
  }

  // Common Methods
  b64toBlob(b64Data: any, contentType: any) {
    contentType = contentType;
    let sliceSize = 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  // Download File to browser

  downloadFileToBrowser(fileResp: any) {
    if (fileResp && fileResp.file) {
      let navigator: any = window.navigator;
      if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(
          this.b64toBlob(fileResp.file, fileResp.mimeType),
          fileResp.fileName
        );
      } else {
        const element = document.createElement("a");
        element.setAttribute(
          "href",
          "data:" +
            fileResp.mimeType +
            ";base64," +
            encodeURIComponent(fileResp.file)
        );
        element.setAttribute("download", fileResp.fileName);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    }
  }

  // view file in browser

  viewFileDocument(fileResp: any) {
    const fileObj = fileResp.resultMap ? fileResp.resultMap : fileResp;
    if (fileObj && fileObj.base64PdfFile) {
      const file = new Blob(
        [
          this.b64toBlob(fileObj.base64PdfFile, fileObj.mimeType),
          fileObj.fileName
        ],
        { type: fileObj.mimeType }
      );
      let navigator: any = window.navigator;
      if (navigator && navigator.msSaveOrOpenBlob) {
        return;
      } else {
        let objectUrl = URL.createObjectURL(file);
        window.open(objectUrl);
      }
    }
  }
}
