import { HttpParams } from '@angular/common/http';
import { HttpParamsOptions } from '@angular/common/http/src/params';
import { FormControl } from '@angular/forms';
import { ArgumentOutOfRangeError, concat } from 'rxjs';
import { stringify } from 'querystring';

/** 顧客を表すエンティティのインタフェース */
export interface Client {
    id: string;
    name: string;
    prefecture: string;
    clientClass: string;
    postalCode: string;
    address: string;
    tel: string;
    fax: string;
    remarks: string;
    email: string
}

/** 顧客の検索条件を表すクラス */
export class ClientSearch {
    prefecture: string = '';
    clientClass: string = '';
    name: string = '';
    clientCharge: string = '';
    postalCode: string = '';
    address: string = '';
    tel: string = '';
    fax: string = '';

    /** 
     * 条件入力用のFormControl配列をもとにClientSearchを作成します。
     * 引数に与えるFormControl配列は、このクラスの8個のプロパティ定義と同じ数・順番でなければなりません
     */
    static parse(...forms: FormControl[]): ClientSearch {
        if(forms.length!=8)   throw new Error('forms.length('+forms.length+')!=8');
        let search: ClientSearch =  new ClientSearch();
        search.prefecture = forms[0].value;
        search.clientClass = forms[1].value;
        search.name = forms[2].value;
        search.clientCharge = forms[3].value;
        search.postalCode = forms[4].value;
        search.address = forms[5].value;
        search.tel = forms[6].value;
        search.fax = forms[7].value;
        return search;
    }
    /** この検索条件をHttpパラメータに変換 */
    toHttpParams(): HttpParams {
        let a = JSON.parse(JSON.stringify(this));
        console.log(a);
        let options: HttpParamsOptions=  <HttpParamsOptions>{fromObject: a};
        console.log(options);
        return new HttpParams(options);
    }
    /** この検索条件を検査し、少なくとも１つの条件が設定されている時trueを返す */
    validate(): boolean {
        let result: boolean = 
            (this.prefecture.length>0 || this.clientClass.length>0 || this.name.length>0 || this.clientCharge.length>0 
                || this.postalCode.length>0 || this.address.length>0 || this.tel.length>0 || this.fax.length>0);
        return result;
    }
    /** この検索条件をカンマ区切りの文字列に変換 */
    toString() {
        let obj: object = JSON.parse(JSON.stringify(this));
        let values = Object.values(obj) as string[];
        return values.filter(value => value.length>0).join(', ');
    }
}

