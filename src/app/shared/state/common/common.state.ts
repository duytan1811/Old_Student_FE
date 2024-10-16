import { Injectable, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject, Subscription, map, tap } from 'rxjs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class CommonState implements OnDestroy {
  private sub: Subscription;

  constructor() {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public convertFileToBase64(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => result.next(reader.result as string);
    return result;
  }

  public convertBase64ToFile(
    base64Data: string,
    fileName: string,
    fileType: string
  ): void {
    const binaryData = atob(base64Data);

    const byteArray = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      byteArray[i] = binaryData.charCodeAt(i);
    }

    const blob = new Blob([byteArray], { type: fileType });

    saveAs(blob, fileName);
  }

  public convertBase64ToBlob(base64: string, contentType: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }
}
