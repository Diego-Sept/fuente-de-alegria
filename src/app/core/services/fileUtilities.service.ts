import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileUtilitiesService {

  constructor() { }

  getMimeType(fileB64: string): string {
    const mime = !!fileB64 ? fileB64.substring(
      fileB64.lastIndexOf(":") + 1,
      fileB64.lastIndexOf(";")
    ) : '';
    return mime;
  }

  getContent(fileB64: string): string {
    const mime = fileB64.substring(
      fileB64.lastIndexOf(",") + 1
    );
    return mime;
  }

  isPhoto(fileB64) {
    const extensions = ['image/jpg', 'image/png', 'image/svg+xml', 'image/jpeg']
    const mimeType = this.getMimeType(fileB64)
    return extensions.includes(mimeType);
  }

  isPdf(fileB64) {
    const extensions = ['application/pdf']
    const mimeType = this.getMimeType(fileB64)
    return extensions.includes(mimeType);
  }

  downloadFile(fileB64) {
    const sliceSize = 512;
    const content = this.getContent(fileB64);
    const type = this.getMimeType(fileB64);
    const byteCharacters = atob(content);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  async createZip(files: any[], zipName: string) {
    const zip = new JSZip();
    const name = zipName + '.zip';
    console.log(files);

    // tslint:disable-next-line:prefer-for-of  
    for (let counter = 0; counter < files.length; counter++) {
      const element = files[counter];
      // const fileData = element;
      // const b: any = new Blob([fileData], { type: '' + fileData.type + '' });
      const b = this.getFileBlob(element);
      console.log(b);

      zip.file(element.substring(element.lastIndexOf('/') + 1), b);
    }
    zip.generateAsync({ type: 'blob' }).then((content) => {
      if (content) {
        FileSaver.saveAs(content, name);
      }
    });
  }

  downloadZip(file, files, fileName: string, zipName: string) {
    var zip = new JSZip();
    zip.file(fileName + new Date().toISOString() + '.' + file.ext, file.data, { base64: true });
    var fileFolder = zip.folder("archivos");
    for (let i = 0; i < files.length; i++) {
      fileFolder.file(files[i].title + '.' + files[i].ext, files[i].data, { base64: true });
    }
    zip.generateAsync({ type: "blob" })
      .then(function (content) {
        FileSaver.saveAs(content, `${zipName}.zip`);
      });
  }

  getExtension(fileB64) {
    const a = this.getMimeType(fileB64);
    return a.substring(a.indexOf('/') + 1, a.length)

  }

  getFileBlob(fileB64) {
    const sliceSize = 512;
    const content = this.getContent(fileB64);
    const type = this.getMimeType(fileB64);
    const byteCharacters = atob(content);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
    return url;
  }

  getFileBlob2(fileB64)  {
    const sliceSize = 512;
    const content = this.getContent(fileB64);
    const type = this.getMimeType(fileB64);
    const byteCharacters = atob(content);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: 'application/pdf'});
    return blob
    // const url = window.URL.createObjectURL(blob);
    // window.open(url);
    // return url;
  }

  

}
