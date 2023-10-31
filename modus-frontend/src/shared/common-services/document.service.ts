import { Injectable, Inject } from "@angular/core";
// import { FileDetails } from "../../models/customer";

import { APP_CONFIG } from "../config/app.config";
import { IAppConfig } from "../config/iapp.config";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DocumentService {
  appConfig: IAppConfig;
  allowedFiles: any[];
  allowedImages: any[];
  allowedFilesOnly: any[];
  allowedFileXmlOnly: any[];

  constructor(
    @Inject(APP_CONFIG) appConfig: IAppConfig,
    private apiService: ApiService,
    private http: HttpClient
  ) {
    this.appConfig = appConfig;
    this.allowedFiles = ["png", "jpeg", "pdf"];
    this.allowedImages = ["png", "jpeg", "jpg"];
    this.allowedFilesOnly = ["pdf"];
    this.allowedFileXmlOnly = ["zip"];
  }

  getFileExtension(event: any) {
    const files = event.target.files;

    let extension = files[0].name.split(".").pop().toLowerCase();
    console.info(extension, "extension");
    return extension;
  }

  validateFileExtensionToUpload(event: any, allowedFiles: any, i: number) {
    const files = event.target.files;
    let extention = files[i].name.split(".").pop().toLowerCase();
    if (allowedFiles.indexOf(extention) == -1) {
      return this.apiService.commonStrings.file_extention;
    }
    return false;
  }

  validateFileSizeToUpload(event: any, i: number) {
    const files = event.target.files;
    let fileSize = files[i].size / 1000000;
    console.info("File Size :" + fileSize + "MB");
    if (fileSize > 1) {
      return this.apiService.commonStrings.file_size;
    } else {
      return false;
    }
  }

  validateNumberOfFiles(event: any, length: any) {
    const files = event.target.files;

    if (files.length > length) {
      event.target.value = "";
      return this.apiService.commonStrings.file_number;
    }
  }

  // form data
  uploadImage(file: File) {
    const formData: FormData = new FormData();

    formData.append("image", file);

    return this.apiService.uploadWithProgress(
      this.appConfig.endpoints.uploadMenuImage,
      formData
    );
  }

  //download doc
  // downloadDoc(file: FileDetails) {
  //   let url = `${this.appConfig.endpoints
  //     .downloadMenuImage}${file.fileName}/${file.fileId}`;
  //   this.apiService.getImages(url, null, null).then(
  //     (resp: any) => {
  //       // response is as blob
  //       this.downloadBlob(resp, file.fileName);
  //     },
  //     error => {
  //       console.error(error);
  //     }
  //   );
  // }

  downloadBlob(blob: any, fileName: any) {
    let navigator: any = window.navigator;
    if (navigator && navigator.msSaveOrOpenBlob)
      return navigator.msSaveOrOpenBlob(blob);

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = data;
    link.download = fileName;

    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );

    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
  }

  // delete doc
//   deleteMenuImage(file: FileDetails) {
//     let url = `${this.appConfig.endpoints.deleteMenuImage}${file.fileId}`;

//     return new Promise((resolve, reject) => {
//       this.apiService.deleteapi(url, null).then(
//         resp => {
//           if (resp) {
//             resolve(file);
//           }
//         },
//         error => {
//           reject(error);
//         }
//       );
//     });
//   }
}
