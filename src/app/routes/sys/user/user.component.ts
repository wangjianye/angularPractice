import { AfterViewInit, Component, Host, HostBinding, HostListener, Injector, OnInit, Optional, ViewChild } from '@angular/core';
import { BasePage } from '@core/utils/basePage';
import * as _ from 'lodash';
import { AgGridNg2 } from '../../../../../node_modules/ag-grid-angular';
import { WTableComponent } from '@shared/w-table/w-table.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sys-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
})
export class SysUserComponent extends BasePage implements OnInit {
  @ViewChild('mainTable') mainTable:WTableComponent;
  saveWin={
    isShow:false,
    title:'添加'
  };
  url = `/user`;
  saveData: any = {};
  roleList: any[] = [];
  userList:any[]=[];
  constructor(protected injector: Injector) {
    super(injector);
  }
  ngOnInit() {
    this.getRoleList();
    this.getUserList();
    this.mainTable.getData();
  }
  getColumns() {
   const columns = [
      { field: 'loginName', headerName: '登录名', pinned: 'left', checkboxSelection: true,filterArgs:{
          filterTypeList:[
            'equals',
            'startsWith',
            'contains',
            'endsWith'
          ]
        } },
      { field: 'name', headerName: '姓名', pinned: 'left',filterArgs:{

          inputType:'select',
          select:{
            dataList:'userList',
            label:'name',
            value:'name'
          },

          filterTypeList:[
            'equals',
            'startsWith',
            'contains',
            'endsWith'
          ]

        }},
      { field: 'no', headerName: '工号'},
      { field: 'email', headerName: 'email'},
      { field: 'phone', headerName: '电话'},
      { field: 'mobile', headerName: '手机'},
      {
        field: '角色', headerName: '角色', cellRenderer: (item) => {
          if (item.data.roleList) {
            return item.data.roleList.map(( item ) => item.roleName).join(',');
          }
          return '';
        },  suppressSorting: true,suppressFilter:true
      },
      { field: 'createTime', headerName: '创建时间', fieldType:'datetime'
     },
      {
        field: 'operation', headerName: '操作', pinned: 'right', cellRenderer: 'operationRenderComponent',
        width: 300,
        buttons: [
          { 'text': '修改', 'icon': 'edit', 'handle': this.openUpdateWin },
          { 'text': '删除', 'icon': 'delete', 'handle': this.delete },
        ],
        suppressSorting: true,suppressFilter:true
      },
    ];
   return columns;
  }


  delete(rowData, context) {
  }
  generateArray(value: number): number[] {
    return new Array(value);
  }

  /**
   * 获得角色列表
   */
  getRoleList() {
    this.http.get('/sys/user/getRoleList').subscribe((data: any) => {
      this.roleList = data.list;
      if (data.list) {
        data.list.map((item) => {
          item.label = item.roleName;
        });
      }
    });
  }

  getUserList(){
    this.http.get('/sys/user/list').subscribe((data:any)=>{
      this.userList=data.list;
    });
  }
  /**
   * 打开添加窗口
   * @param tpl
   */
  openAddWin() {
    this.openSaveWin(null);
  }
  /**
   * 打开保存窗口
   * @param rowData
   */
  openSaveWin(rowData) {
    this.saveWin.isShow=true;
    this.saveWin.title='新建';
    if (rowData) {
      this.saveWin.title='修改';
    }
    else {
      rowData = {};
    }
    this.roleList.forEach((item) => {
      item.checked = false;
    });
    if (rowData.roleList) {
      rowData.roleList.forEach((role) => {
        this.roleList.forEach((item) => {
          if (item.id == role.id) {
            item.checked = true;
          }
        });
      });
    }
    this.saveData = rowData;

  }
  openUpdateWin(rowData) {
    this.openSaveWin(rowData);
  }

  postSaveData()
  {
    let roleList = this.roleList.filter((item) => {
      return item.checked == true;
    });
    this.saveData.roleList = roleList;
    this.http.post('/sys/user/save', this.saveData).subscribe((data: any) => {
      this.msg.success(data.msg);
      this.mainTable.getData();
      this.saveWin.isShow=false;
    });
  }
}
