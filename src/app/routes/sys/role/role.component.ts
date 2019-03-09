import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BasePage } from '@core/utils/basePage';
import { WTableComponent } from '@shared/core-components/w-table/w-table.component';

@Component({
  selector: 'app-sys-role',
  templateUrl: './role.component.html',
})
export class SysRoleComponent extends BasePage implements OnInit, AfterViewInit {
  url = `/sys/role/`;
  @ViewChild('mainTable')
  mainTable: WTableComponent;
  saveWin = {
    isShow: false,
    title: '添加',
  };
  saveData: any = {};
  constructor(protected injector: Injector) {
    super(injector);
  }
  ngOnInit() {
  }
  sendSaveData() {
    this.http.post(this.url + 'save', this.saveData).subscribe((data: any) => {
      this.msg.success(data.msg);
      this.mainTable.getData();
      this.saveWin.isShow=false;
    });
  }
  ngAfterViewInit(): void {
    this.mainTable.getData();
  }

  getColumns() {
    const columns = [
      { field: 'roleName', headerName: '角色名', checkboxSelection: true },
      { field: 'roleType', headerName: '角色类型' },
      { field: 'createTime', headerName: '创建时间',suppressFilter: true, },

      {
        field: 'operation', headerName: '操作', pinned: 'right', cellRenderer: 'operationRenderComponent',
        width: 300,
        buttons: [
          { 'text': '修改', 'icon': 'edit', 'handle': this.openSaveWin },
          { 'text': '删除', 'icon': 'delete', 'handle': this.delete },
          { 'text': '删除', 'icon': 'delete', 'handle': this.delete },
          { 'text': '删除', 'icon': 'delete', 'handle': this.delete },
          { 'text': '删除', 'icon': 'delete', 'handle': this.delete },
        ],
        suppressSorting: true, suppressFilter: true,
      },
    ];
    return columns;
  }

  delete(rowData, context){

  }
  openSaveWin(rowData?) {
    this.saveWin.isShow = true;
    this.saveWin.title = '新建';
    if (rowData) {
      this.saveWin.title = '修改';
      this.saveData=rowData;
    }
    else {
      this.saveData = {};
    }

  }
}
