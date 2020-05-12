/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import ReactWordcloud from 'react-wordcloud';
import { Resizable } from 're-resizable';
import Charty from "react-google-charts";
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import Chart from "react-apexcharts";
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";
import { observer, inject } from "mobx-react";






function abs(val){
  if(val<0){
    return -val;
  }
  return val;
}
var series= [
  {
    name: "Series 1",
    data: [45, 52, 38, 45, 19, 23, 2]
  },
  {
    name: "Series 2",
    data: [40, 56, 32, 48, 29, 33, 12]
  },
  
]

@inject("globalstate")
@observer
class Dashboard extends Component {
  options = {
    chart: {
      height: 300,
      type: "area"
    },
    dataLabels: {
      enabled: false
    },
    series: [
      {
        name: "Series 1",
        data: [45, 52, 38, 45, 19, 23, 2]
      }
    ],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: this.props.globalstate.stated.timeLine.centroids.forEach(cent=> new Date(cent).getDate())
    }
  };
  
 sampleTweets(tweets){
  // console.log(tweets);
     var tweetsSample =  new Array();
  if( tweets!=undefined && tweets.length!=0){
  for(let i=0;i<Math.min(20,  tweets.length);i++){
    tweetsSample.push( tweets[i]);
  }
  var renderTweets =tweetsSample.map(function(item, i){
      var color = "#46bfbd";
       if(item.label == "Neutral"){
          color = "#FDB45C";
      }
      if(item.label == "Negative"){
          color = "#FF4500";
      }
      if(item.label=="Strong Positive"){
        color = '#17e825';
      }
      if(item.label == "Strong Negative"){
        color = "#f2050a";
      }
        return (
              <div key={i} style={{paddingLeft:10,paddingRight:5,marginTop:2,marginBottom:2,backgroundColor:'#F7F7F8',borderRadius:5,marginLeft:5,marginRight:5}} >
              <p style={{fontSize:10}}><b>Sample Tweet: {i+1}</b><br/> 
             {item.text} <br/>
               <b style={{"color": color,fontSize:12}}>Predicted Sentiment - {item.label}</b></p>
              </div>
            );
      });
      return renderTweets;
    }else{
      return <div style={{color:'red',paddingLeft:20}}>Sample Tweets Not Available.</div>
    }
  
  }
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  render() {
 

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-gleam text-warning" />}
                statsText="Tweets Count"
                statsValue={this.props.globalstate.stated.tweets.length}
                // statsIcon={<i className="fa fa-refresh" />}
                // statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-repeat text-success" />}
                statsText="Retweets"
                statsValue={this.props.globalstate.stated.retweets}
                // statsIcon={<i className="fa fa-calendar-o" />}
                // statsIconText="Last day"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                statsText="Reach"
                statsValue={this.props.globalstate.stated.reach}
                // statsIcon={<i className="fa fa-clock-o" />}
                // statsIconText="In the last hour"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-twitter text-info" />}
                statsText= ''
                statsValue={'#'+ this.props.globalstate.stated.hashtag.split(' ').join('')}
             
                // statsIcon={<i className="fa fa-refresh" />}
                // statsIconText="Updated now"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Card
                // statsIcon="fa fa-history"
                id="chartHours"
                title="Sentiment Variations"
                category="7 day time line"
                // stats="Most recent and popular tweets"
                ctTableFullWidth={true}
                content={   <div className="ct-chart">  <Chart
                  options= {{
                    chart: {
                      height: 300,
                      type: "area"
                    },
                    dataLabels: {
                      enabled: false
                    },
                    series: [
                      {
                        name: "Series 1",
                        data: [45, 52, 38, 45, 19, 23, 2]
                      }
                    ],
                    fill: {
                      type: "gradient",
                      gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        stops: [0, 90, 100]
                      }
                    },
                    xaxis: {
                      categories: this.props.globalstate.stated.timeLine.centroids.forEach(cent=>{console.log(cent);return new Date(cent).getDate()})
                    }
                  }}
                  
                  
                  series={[{name:'negatives',data:this.props.globalstate.stated.timeLine.negatives,color:'#FF4A55'},{name:'positives',data:this.props.globalstate.stated.timeLine.positives}  ]}
                  type="area"
                  width="500"
                  
                />

</div>
                
                  // <div className="ct-chart">
                  //   <ChartistGraph
                  //     data={dataSales}
                  //     type="Line"
                  //     options={optionsSales}
                  //     responsiveOptions={responsiveSales}
                  //   />
                  // </div>
             


                }
                // legend={
                //   <div className="legend">{this.createLegend(legendSales)}</div>
                // }
              />
            </Col>
            <Col md={6}>
              <Card
                // statsIcon="fa fa-clock-o"
                title="Sentiments"
                category="Most recent and popular tweets"
                stats="Last 7 days tweets only"
                ctTableFullWidth={true}
                content={ 
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                    // ctTableFullWidth={true}
                  >
                        <Charty
          chartType="PieChart"
          width="100%"
          height="300px"
        data = {[
          ["Sentiment", "Percentage"],
          ["Negative", abs(this.props.globalstate.stated.resultScore.negativeScoreStrength)],
          ["Positive",  abs(this.props.globalstate.stated.resultScore.positiveScoreStrength)],
          ["Neutral", abs(this.props.globalstate.stated.resultScore.totalscore - this.props.globalstate.stated.resultScore.strongPositive - this.props.globalstate.stated.resultScore.strongNegtive -this.props.globalstate.stated.resultScore.positiveScore-this.props.globalstate.stated.resultScore.negativeScore)],
          ["Strong Positive",   abs(this.props.globalstate.stated.resultScore.strongPositiveStrength)],
          ["Strong Negative", abs(this.props.globalstate.stated.resultScore.strongNegativeStrength)] // CSS-style declaration
        ]}
          options = {{
            slices: [
              {
                color: "#FFBF00"
              },
              {
                color: "#04f9e9"
              },
              {
                color: "#990099"
              },
              {
                color: "#5af23c"
              },{
                color:'#f90404'
              }
            ],
            title : "Sentiments",
            pieHole: 0.4,
            is3D: false}
          }
        
        />
                  </div>
                }
                // legend={
                //   <div className="legend">{this.createLegend(legendPie)}</div>
                // }
              />
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Card
                id="chartActivity"
                title="Important Words"
                category="Influencing words"
                stats="Extracted from Tweets"
                statsIcon="fa fa-check"
                ctTableFullWidth={true}
                content={
                  // <div className="ct-chart">
                  //   {/* <ChartistGraph
                  //     data={dataBar}
                  //     type="Bar"
                  //     options={optionsBar}
                  //     responsiveOptions={responsiveBar}
                  //   /> */}
                      <div style={{ height: 500, width: 300 }}>
 <ReactWordcloud words={this.props.globalstate.stated.WordsFreq} />
 </div>
                  // </div>
                }
                // legend={
                //   <div className="legend">{this.createLegend(legendBar)}</div>
                // }
              />
            </Col>

            <Col md={8}>
              <Card
                title="Sample Tweets"
                category="Most Recent Tweets Only"
                // stats="Updated 3 minutes ago"
                // statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      {/* <Tasks /> */}
{this.sampleTweets(this.props.globalstate.stated.tweets)}


                    </table>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  
}
}

export default Dashboard;
