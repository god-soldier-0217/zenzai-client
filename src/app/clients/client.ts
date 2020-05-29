/** 顧客を表すエンティティのインタフェース */
export interface Client {
    id: number;
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

