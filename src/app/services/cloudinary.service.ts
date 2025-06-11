import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CloudinaryService {
  private cloudName = 'dseo6ulep';
  private uploadPreset = 'encuestas_publicas';

  constructor(private http: HttpClient) {}

  subirArchivo(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);
    formData.append('folder', 'encuestas');
    return this.http.post(`https://api.cloudinary.com/v1_1/${this.cloudName}/auto/upload`, formData);
  }
}