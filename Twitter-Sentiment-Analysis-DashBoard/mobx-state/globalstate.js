import {observable,action} from 'mobx';
mobx.configure({ enforceActions: "observed" });
export default class GlobalState{


 @observable stated =  {
        expanded:"",
        resultScore:{
positiveScore:1,
negativeScore:1,
strongPositive:1,
strongNegtive:1,
totalscore:5,
        },
        previousResults:[],
        previousResultsDialog:false,
        errorMessage:"",
        errorDialog:false,
        countFetches:1,
        showTimingdialog:false,
        tweetsCount:1,
        height:window.innerHeight,
        width:window.innerWidth,
        showCharts:false,
          hashtag: "",
          submitted: false,
          progressBar: false,
          options: {
              colors: ['#FF4500', '#46bfbd', '#FDB45C','#f2050a','#17e825'],
              labels: ['Negative', 'Positive', 'Neutral','Strong Negative','Strong Positive'],
              plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true
                  }
                }
              }
            }
          },
          series: [20,20,20,20,20],
          tweets: new Array(),
          hashtag_desc: "",

          seriesBar: [{
            data: [448, 448, 448]
          }],
          optionsBar: {
            chart: {
              type: 'bar',
              height: 1000,
              width:1000
            },
            plotOptions: {
              bar: {
                horizontal: true,
              }
            },
            dataLabels: {
              enabled: true
            },
            xaxis: {
              categories: ['Angry', 'Happy', 'Sad'
              ],
            }
          },
        
        
        };


       @action setStated = function(newStated){
           stated=newStated;
       }



}
