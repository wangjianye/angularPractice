import { _HttpClient, SettingsService } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import {
  SocialService,
  SocialOpenType,
  TokenService,
  DA_SERVICE_TOKEN,
} from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { StartupService } from '@core/startup/startup.service';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {
  form: FormGroup;
  error = '';
  type = 0;
  loading = false;
  count = 0;
  interval$: any;
  constructor(
    fb: FormBuilder,
    private router: Router,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private settingsService: SettingsService,
    private socialService: SocialService,
    public http: _HttpClient,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    private startupSrv: StartupService,
  ) {
    this.form = fb.group({
      userName: ['admin', [Validators.required, Validators.minLength(2)]],
      password: ['888888', Validators.required],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [Validators.required]],
      remember: [true],
    });
    modalSrv.closeAll();
  }

  // region: fields

  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }
  get mobile() {
    return this.form.controls.mobile;
  }
  get captcha() {
    return this.form.controls.captcha;
  }

  // endregion

  switch(ret: any) {
    this.type = ret.index;
  }

  // region: get captcha



  getCaptcha() {
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) clearInterval(this.interval$);
    }, 1000);
  }

  // endregion

  submit() {
    this.error = '';
    this.userName.markAsDirty();
    this.userName.updateValueAndValidity();
    this.password.markAsDirty();
    this.password.updateValueAndValidity();
    if (this.userName.invalid || this.password.invalid) return;
    this.loading = true;
    this.http.post('/sys/login/getToken',{
      loginName:this.userName.value,
      password:this.password.value
    }).subscribe((res:any)=>{
      this.loading=false;
      if(res.code==0)
      {
        console.log(res);
        console.log(res.token);
        // 清空路由复用信息
        this.reuseTabService.clear();
        // 设置Token信息
        this.tokenService.set({
          token: res.token,
          name: this.userName.value,
          email: res.email,
          id: res.id,
          time: +new Date(),
        });
        // 重新获取 StartupService 内容，若其包括 User 有关的信息的话
         this.startupSrv.load().then(() => this.router.navigate(['/']));
        // 否则直接跳转
        // this.router.navigate(['/']);
      }

    },(ee)=>{


    });
  }
  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  }
}
