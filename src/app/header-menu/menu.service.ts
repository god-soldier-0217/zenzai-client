import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  /** 最後にメニュー選択されたインデックス番号を記憶する */
  lastSelectedTabIndex: number;
}
