import { Injectable } from '@angular/core';
import { ClientSearch, Client } from './client';
import { Config } from '../config/config'
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  /** 検索条件の保存 */
  clientSearch: ClientSearch = new ClientSearch();
    
  /** アクセス先URL */
  private url: string = Config.BASE_URL + '/clients';
  /** ヘッダー(更新時に使用) */
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  /** コンストラクタ */
  constructor(
    private httpClient: HttpClient
  ) { }

  /** 都道府県リストを取得 */
  getClients(clientSearch?: ClientSearch): Promise<Client[]> {
    // 検索条件がある場合は保存
    this.clientSearch = clientSearch;
    // 検索条件が引数にもなくフィールドにもない場合、空っぽを返す
    if(!this.clientSearch.validate())
      return new Promise(()=> []);

    return this.httpClient.get(this.url).toPromise().then(response => response as Client[])
      .catch(error => Promise.reject(error));
  }



}
