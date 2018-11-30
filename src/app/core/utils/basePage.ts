import { Injector, OnInit } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';

export  class BasePage implements OnInit  {

  public http: _HttpClient;
  public modal: ModalHelper;
  public msg: NzMessageService;
  public modalSvr: NzModalService;
  public  datePipe: DatePipe;
  ngOnInit(): void {
  }
  constructor(protected  injector: Injector  ) {
    this.http =this.injector.get(_HttpClient);
    this.modal=this.injector.get(ModalHelper);
    this.msg=this.injector.get(NzMessageService);
    this.modalSvr=this.injector.get(NzModalService);
    this.datePipe=this.injector.get(DatePipe);
  }


}
