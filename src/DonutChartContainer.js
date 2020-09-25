import React from 'react';
import 'hammerjs';
import {
    Chart,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartSeriesLabels,
    ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartValueAxis,
  ChartValueAxisItem
  } from '@progress/kendo-react-charts';
  import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
  import { Sparkline } from '@progress/kendo-react-charts';
  import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
  import { donutChartData,barChartQ4Months, barChartMonthlyPercentages,gridData,panelBarData } from './appData';
  import logo from './img/12.jpg';
  import {ReactComponent as Log} from './logo.svg';

  /* This function's outputted string determines the label contents */
  const labelTemplate = (e) => (e.category + '\n'+ e.value + '%');

  const SparkLineChartCell = (props) => <td><Sparkline data={props.dataItem.PriceHistory}/></td>
export const DonutChartContainer = () => (
    <Chart style={{height:300}}>
      <ChartSeries>
        <ChartSeriesItem type="donut" data={donutChartData} categoryField="foodType" field="percentSold" padding={0}>
          <ChartSeriesLabels color="#fff" background="none" content={labelTemplate} />
        </ChartSeriesItem>
      </ChartSeries>
      <ChartLegend visible={false} />
    </Chart>
  );

  export const BarChartContainer = () => (
  <Chart style={{ height: 288 }}>
    <ChartLegend visible={false} />
    <ChartCategoryAxis>
      <ChartCategoryAxisItem categories={barChartQ4Months} startAngle={45} />
    </ChartCategoryAxis>
    <ChartSeries>
      {
        barChartMonthlyPercentages.map((item, idx) => (
          <ChartSeriesItem key={idx} type="column" data={item.data} name={item.name} gap={2}/>
        ))}
    </ChartSeries>
    <ChartValueAxis skip={4}>
      <ChartValueAxisItem color="#888" skip={2} />
    </ChartValueAxis>
  </Chart>
);

const processData = (data) => {
    data.forEach((item) => {
      item.PriceHistory = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
      return item;
    })
    return data;
  }

export const GridContainer = () => (

    <div>
      <Grid style={{ height: '300px' }} data={processData(gridData)}>
        <Column field="ProductID" title="ID" width="40px" />
        <Column field="ProductName" title="Name" width="160px" />
        <Column field="Category.CategoryName" title="Category Name" width="80px" />
        <Column field="UnitPrice" title="Price" width="80px" />
        <Column field="UnitsInStock" title="Stock" width="90px" />
        <Column field="Discontinued" width="130px"
          cell={(props) => (
            <td>
              <input className="k-checkbox" type="checkbox"  defaultChecked={props.dataItem[props.field]} />
              <label className="k-checkbox-label"></label>
            </td>
          )} />
          <Column field="PriceHistory" width="130px" cell={SparkLineChartCell} title="Price history" />
      </Grid>
    </div>
  );

  const imageUrl = (imageName) => ('./12.jpg');

export const PanelBarContainer = () => (
  <PanelBar >
    <PanelBarItem expanded={true} title="My Teammates">
      <div>
        {panelBarData.teammates.map((item, idx) => (
          <div className={idx === 0 ? 'teammate k-state-selected' : 'teammate'} id={item.firstName + ' ' + item.lastName} key={idx}>
            <img src={logo} alt={item.firstName + ' ' + item.lastName} />
            <span className="mate-info">
              <h2>{item.firstName + ' ' + item.lastName}</h2>
              <p>{item.position}</p>
            </span>
            {/* <Log/> */}
          </div>
        ))}
      </div>
    </PanelBarItem>
    <PanelBarItem title={'Projects'} >
      <PanelBarItem title={'Sales Reports'} >
        {panelBarData.salesReports.map((item, idx) => (
          <PanelBarItem title={item.title} key={idx} />
        ))}
      </PanelBarItem >
    </PanelBarItem>
    <PanelBarItem title="Communication" disabled={true} />
  </PanelBar>
);
  