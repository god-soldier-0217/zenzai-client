import { Injectable } from '@angular/core';
import { Config } from '../config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientClassService {
  /** アクセス先URL */
  private url: string = Config.BASE_URL + '/clientClasses';
  /** ヘッダー(更新時に使用) */
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  /** コンストラクタ */
  constructor(
    private httpClient: HttpClient
  ) { }

  /** 顧客分類のリストを取得 */
  getClientClasses(): Promise<string[]>{
    return this.httpClient.get(this.url).toPromise()
      .then(response => response as string[])
      .catch(error => Promise.reject(error));
  }
}
