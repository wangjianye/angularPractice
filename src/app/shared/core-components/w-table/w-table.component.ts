import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AgGridNg2 } from '../../../../../node_modules/ag-grid-angular/main';
import { _HttpClient } from '@delon/theme';
import { OperationRenderComponent } from '../cell-render/operation-render/operation-render.component';
import { TextFilterComponent } from '../grid-filter/text-filter/text-filter.component';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'w-table',
  templateUrl: './w-table.component.html',
  styles: [],
})
export class WTableComponent implements OnInit {
  @ViewChild('grid') grid: AgGridNg2;
  @Input()
  public url;
  public filterModel;
  @Input()
  public columns = [];
  public page = {
    pageSize: 10,
    pageIndex: 1,
    orderBy: '',
    total: 0,
  };
  public rows = [];
  public frameworkComponents = {
    operationRenderComponent: OperationRenderComponent,
    textFilter: TextFilterComponent,
  };
  @Input()
  public context;
  /**
   * 数据
   */
  public data = [];

  /**
   * 总记录数
   */
  public total = 0;

  public defaultColDef = {
    unSortIcon: true, filter: 'textFilter',
  };
  public localeText = {
    noRowsToShow: '没有数据可显示',
  };

  constructor(public http: _HttpClient,private http2: HttpClient) {
  }

  ngOnInit() {
    this.grid.filterChanged.subscribe(() => {
      this.filterModel = this.grid.api.getFilterModel();
      this.getData();

    });
    this.grid.sortChanged.subscribe(() => {
      this.getData();
    });
    this.grid.context = {componentParent:this.context};
    this.grid.frameworkComponents = this.frameworkComponents;
    this.grid.localeText = this.localeText;
    this.grid.enableServerSideFilter = true;
    this.grid.enableServerSideSorting = true;
    this.grid.enableFilter = true;
    this.grid.enableSorting = true;
    this.grid.enableColResize = true;
    this.grid.columnDefs = this.columns;
    this.grid.defaultColDef = this.defaultColDef;
  }

  onWhereTagClose(event) {
    this.grid.api.destroyFilter(event.key);
  }

  getData() {
    if(this.url)
    {
      this.http2.post(this.url, this.getSearchData()).subscribe((data: any) => {
        this.rows = data.list;
        this.page.total = data.total;
      });
    }
  }
  getSearchData() {
    let searchData = _.cloneDeep({
      page: this.page,
    });
    if (this.grid && this.grid.api) {
      let filterModel = this.grid.api.getFilterModel();
      if (filterModel) {
        _.forEach(filterModel, (value, key) => {
          if (value.value) {
            searchData[key] = value.value;
          }
          else {
            searchData[key] = null;
          }
          if (value.filterType && value.filterType.en !== 'equals') {
            searchData[key + 'FilterType'] = value.filterType.en;
          }
        });
      }
      if (this.grid.api && this.grid.api) {
        let sortModel = this.grid.api.getSortModel();
        if (sortModel && sortModel.length > 0) {
          searchData.page['orderBy'] = sortModel[0].colId + ' ' + sortModel[0].sort;
        }
        else {
          searchData.page['orderBy'] = null;
        }
      }

    }

   // return searchData;
    return _.cloneDeep(searchData);
  }

}
