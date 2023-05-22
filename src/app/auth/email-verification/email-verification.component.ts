import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../../app/store/app.state';
import { emailVerificationStart } from '../state/auth.actions';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'],
})
export class EmailVerificationComponent {
  token!: string | null;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params: ParamMap) => {
        this.token = params.get('token');
        this.store.dispatch(emailVerificationStart({ token: this.token }));
      },
    });
  }
}
