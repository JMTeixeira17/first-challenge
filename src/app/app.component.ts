import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { ShyftApiService } from './shyft-api.service';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { toSignal } from '@angular/core/rxjs-interop'
import { MatAnchor } from '@angular/material/button'
@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, HdWalletMultiButtonComponent, MatAnchor],
  selector: 'first-challenge-root',
  template: `
  <header class="px-16 pt-24 pb-8">
    <h1 class="text-center text-5xl mb-4"> Hola, soy Chema :D</h1>
    <div class="flex justify-center mb-4">
      <hd-wallet-multi-button></hd-wallet-multi-button>
    </div>

    @if(account()){
      <div class="absolute top-4 left-4 flex items-center gap-2">
        <img [src]="account()?.info?.image" class="w-8 h-8"/>
      <p class="text-2xl font-bold">
        {{account()?.balance}}
      </p>
      </div>
    }
    </header>

    <nav>
      <ul class="flex justify-center items-center gap-4">
        <li>
          <a [routerLink]="['']" mat-raised-button>Home</a>
        </li>
        <li>
          <a [routerLink]="['settings']" mat-raised-button >Settings</a>
        </li>
      </ul>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$)


  readonly account = computedAsync(() => this._shyftApiService.getAccount(this._publicKey()?.toBase58()), { requireSync: true })

}



