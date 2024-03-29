import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, of } from "rxjs";

@Injectable({providedIn: 'root'})
export class ShyftApiService{

    private readonly _httpClient: HttpClient = inject(HttpClient);
    private readonly _headers: { 'x-api-key': string} = { 'x-api-key':'WsN4yRSAahFYmfCH' };
    private readonly _mint = '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs';


    getAccount(publicKey: string | undefined | null){
        if(!publicKey){
            return of(null);
        }

        const url = new URL('https://api.shyft.to/sol/v1/wallet/token_balance');
        url.searchParams.set('network', 'mainnet-beta');
        url.searchParams.set('wallet',publicKey)
        url.searchParams.set('token',this._mint)

        return this._httpClient.get<{result: {balance: number; info: {image: string}}}>(
            url.toString(),
            {headers: this._headers}
        ).pipe(map(({result}) => result))
    }
}