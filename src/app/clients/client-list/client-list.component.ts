import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner, MatTableDataSource, MatSort } from '@angular/material';
import { Client } from '../client';


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
  searchCondition: string = "検索条件だよー";
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
  dataSource:  MatTableDataSource<Client> = new MatTableDataSource(this.elementData);
 

  /** コンストラクタ */
  constructor(
    private overlay: Overlay
  ) { }
  /** 初期化 */
  ngOnInit() {
  }

  // [stasrt] ソートを可能にする
  // https://ja.coder.work/so/angular/523780
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  // [end] ソートを可能にする

  // イベントハンドラ
  /** [検索]ボタンのイベントハンドラ */
  search() {
    // ローディング開始
    this.overlayRef.attach(new ComponentPortal(MatSpinner));
    setTimeout(() => {
      this.elementData = [
        { id: 1, name: 'A高等学校', postalCode: '112-3456', address: '大阪府枚方市楠葉美咲1ー21ー10', tel: '072-850-7019', fax: '072-850-7091', prefecture: '大阪府', clientClass: '高校', email: 'ohyama@mmm-keio.net', remarks: '' },
        { id: 2, name: 'B高等学校', postalCode: '112-3456', address: '大阪府枚方市楠葉美咲1ー21ー10', tel: '072-850-7019', fax: '072-850-7091', prefecture: '大阪府', clientClass: '高校', email: 'ohyama@mmm-keio.net', remarks: '' },
        { id: 3, name: 'C高等学校', postalCode: '112-3456', address: '大阪府枚方市楠葉美咲1ー21ー10', tel: '072-850-7019', fax: '072-850-7091', prefecture: '大阪府', clientClass: '高校', email: 'ohyama@mmm-keio.net', remarks: '' },
        { id: 4, name: 'D高等学校', postalCode: '112-3456', address: '大阪府枚方市楠葉美咲1ー21ー10', tel: '072-850-7019', fax: '072-850-7091', prefecture: '大阪府', clientClass: '高校', email: 'ohyama@mmm-keio.net', remarks: '' },
      ];
      this.dataSource.data = this.elementData;


      // ローディング終了
      this.overlayRef.detach();
      // パネルを閉じる
      this.panelOpenState = false;
    }, 3000);

  }
  /** 行の選択イベントハンドラ */
  select(row: Client){
    console.log(row);
  }
}
