import { ChangeDetectorRef, Component, ElementRef, Host, HostBinding, Input, OnInit, Optional, TemplateRef } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { NzColComponent, NzColDirective } from 'ng-zorro-antd';

@Component({
  selector: 'w-input',
  templateUrl: './w-input.component.html',
  styleUrls: ['./w-input.component.less']
})
export class WInputComponent implements OnInit {
  private el: HTMLElement;
   _label='';
   _labelTpl:TemplateRef<any>;
  constructor( el: ElementRef,public changeDetectorRef:ChangeDetectorRef,@Optional() @Host()public col:NzColDirective) {
      this.el=el.nativeElement;
  }
  ngOnInit() {
    if(this.col && !this.col.nzSpan)
    {
      if (!this.col.nzXs)
      {
        this.col.nzXs=12;
      }
     if (!this.col.nzSm)
     {
       this.col.nzSm=8;
     }
     if (!this.col.nzMd)
     {
       this.col.nzMd=6;
     }
      this.col.setClassMap();
    }
  }
  @Input()
  set label(value:string |TemplateRef<any>){
    if(value instanceof TemplateRef){
      this._label=null;
      this._labelTpl=value;
    }
    else{
      this._label=value;
    }
  }
}
