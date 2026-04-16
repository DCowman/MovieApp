import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class MyHttp {

  async get(url: string, params?: any) {

    const options: HttpOptions = {
      url: url,
      params: params
    };

    const response = await CapacitorHttp.get(options);

    return response.data;
  }

}
