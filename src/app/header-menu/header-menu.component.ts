import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {
  /** 幅が広いウインドウであるかを示す */
  private wideWindow: boolean = false;
  /** メニュー */
  menus : Menu[] = [
    { link: ['/clients'], icon: 'school', title: '顧客管理' },
    { link: ['/vouchers'], icon: 'filter_none', title: '受注伝票管理' },
    { link: ['/items'], icon: 'local_florist', title: '受注アイテム管理' },
    { link: ['/actions'], icon: 'grading', title: 'アクション履歴管理' }
  ];
  selectedTabIndex: number = undefined;

  /** コンストラクタ */
  constructor(
    private ngZone: NgZone,
    private router: Router,
    private menuService: MenuService
  ) { }

  /** 初期化処理 */
  ngOnInit() {
    // 画面幅が広いかどうかを判定
    const isWideWindow = ()=>(window.innerWidth>660);
    this.wideWindow = isWideWindow();
    window.onresize = (e) => {          // イニシャル以降の画面サイズ変更時にも計算
      this.ngZone.run(() => this.wideWindow = isWideWindow());
    };
    // 最後に選択されていたタブメニューを選択状態にする
    if(this.menuService.lastSelectedTabIndex)
      this.selectedTabIndex = this.menuService.lastSelectedTabIndex;
  }

  /** メニューの選択が変わったときのイベントハンドラ */
  onTabChanged(event: MatTabChangeEvent): void {
    this.menuService.lastSelectedTabIndex = this.selectedTabIndex;
    this.router.navigate(this.menus[this.selectedTabIndex].link);
  }
}

/** メニューを表すクラス */
class Menu {
  /** メニュー選択時のルータリンク先 */
  link: string[];
  /** Matアイコン */
  icon: string;
  /** メニュータイトル(画面幅が狭い時は非表示) */
  title: string;
}