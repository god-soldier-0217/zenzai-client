import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { Client, ClientSearch } from '../client';
import { ClientService } from '../client.service';
import { PrefectureService } from '../prefecture.service';
import { ClientClassService } from '../client-class.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit, AfterViewInit {
  // 全体
  /** パネルが開いているかどうかを示す(双方向バインディング) */
  panelOpenState: boolean = true;
  /** 検索条件 */
  searchCondition: string = '';
  /** ローディングアニメ */
  overlayRef = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position().global().centerHorizontally().centerVertically()
  });

  // 検索条件
  /** 都道府県 */
  searchPrefectures: string[] = ['', '北海道', '青森県', '秋田県'];
  searchPrefectureCtrl: FormControl = new FormControl();
  /** 顧客種別 */
  searchClientClasses: string[] = ['', '高校', '中学校'];
  searchClientClassCtrl: FormControl = new FormControl();
  /** 顧客名 */
  searchNameCtrl: FormControl = new FormControl();
  /** 顧客担当者 */
  searchChargeCtrl: FormControl = new FormControl();
  /** 郵便番号 */
  searchPostalCodeCtrl: FormControl = new FormControl();
  /** 住所 */
  searchAddressCtrl: FormControl = new FormControl();
  /** 電話番号 */
  searchTelCtrl: FormControl = new FormControl();
  /** FAX番号 */
  searchFaxCtrl: FormControl = new FormControl();

  // テーブル表示
  /** 表示データカラム */
  displayedColumns: string[] = ['id', 'name', 'postalCode', 'address', 'tel', 'fax', 'email', 'prefecture', 'clientClass'];
  /** 表示データ */
  elementData: Client[] = [];
  /** データソース */
  dataSource: MatTableDataSource<Client> = new MatTableDataSource(this.elementData);


  /** コンストラクタ */
  constructor(
    private overlay: Overlay,
    private clientService: ClientService,
    private prefectureService: PrefectureService,
    private clientClassService: ClientClassService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) { }

  /** 初期化 */
  async ngOnInit() {
    // サービスから検索条件を復元
    this.searchPrefectureCtrl.setValue(this.clientService.clientSearch.prefecture);
    this.searchClientClassCtrl.setValue(this.clientService.clientSearch.clientClass);
    this.searchNameCtrl.setValue(this.clientService.clientSearch.name);
    this.searchChargeCtrl.setValue(this.clientService.clientSearch.clientCharge);
    this.searchPostalCodeCtrl.setValue(this.clientService.clientSearch.postalCode);
    this.searchAddressCtrl.setValue(this.clientService.clientSearch.address);
    this.searchTelCtrl.setValue(this.clientService.clientSearch.tel);
    this.searchFaxCtrl.setValue(this.clientService.clientSearch.fax);

    /* サーバーから都道府県と顧客種別の選択肢を取得 */
    Promise.all([this.prefectureService.getPrefectures(), this.clientClassService.getClientClasses()])
    .then(values=>{
      this.searchPrefectures = values[0];
      this.searchPrefectures.unshift('');
      this.searchClientClasses = values[1];
      this.searchClientClasses.unshift('');
    }).catch(error => 
      this.router.navigate(['/error'])
    );
  }

  // [stasrt] ソートを可能にする
  // https://ja.coder.work/so/angular/523780
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  // [end] ソートを可能にする

  // イベントハンドラ
  /** [検索]ボタンのイベントハンドラ */
  search() {
    // 入力された検索条件からClientSearchオブジェクトを作成
    let search: ClientSearch = ClientSearch.parse(
      this.searchPrefectureCtrl, this.searchClientClassCtrl, this.searchNameCtrl, this.searchChargeCtrl,
      this.searchPostalCodeCtrl, this.searchAddressCtrl, this.searchTelCtrl, this.searchFaxCtrl);
    // 条件なしは何もしない(エラ〜メッセージ)
    if(!search.validate()) {
      let matSnackBarRef = this.matSnackBar.open("検索条件が指定されていません", "了解", { duration: 3000, });
      return;
    }
    // 検索条件を表示
    this.searchCondition = search.toString();
    // 検索条件を保存 (検索実行時にclientService.getClients()のなかで実行される)
    //this.clientService.clientSearch = search;

    // ローディング開始
    this.overlayRef.attach(new ComponentPortal(MatSpinner));
    // 検索実行(検索結果を表に表示、エラー発生時はエラーページへ遷移)
    this.clientService.getClients(search)
    .then(clients => {
      this.elementData = clients;
      this.dataSource.data = this.elementData;    
    })
    .catch(error => this.router.navigate(['/error']))
    .finally(() => {
      // ローディング終了
      this.overlayRef.detach();
      // パネルを閉じる
      this.panelOpenState = false;
    });
  }
  /** 行の選択イベントハンドラ */
  select(row: Client) {
    console.log(row);
  }
 
  
}
