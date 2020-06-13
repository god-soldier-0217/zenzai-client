import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../config/config'

@Injectable({
  providedIn: 'root'
})
export class PrefectureService {
  /** アクセス先URL */
  private url: string = Config.BASE_URL + '/prefectures';
  /** ヘッダー(更新時に使用) */
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  /** コンストラクタ */
  constructor(
    private httpClient: HttpClient
  ) { }

  /** 都道府県リストを取得 */
  getPrefectures(): Promise<string[]> {
    return this.httpClient.get(this.url).toPromise().then(response => response as string[])
      .catch(error => Promise.reject(error));
  }
}
