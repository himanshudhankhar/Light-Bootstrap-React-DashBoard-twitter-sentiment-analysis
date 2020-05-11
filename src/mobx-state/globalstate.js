const {observable,action} = require('mobx');
export default class GlobalState{


 @observable stated =  {
   timeLine:{
   centroids: [1589158854866, 1589161161273, 1589156371284, 1589160614575, 1589159734744, 1589154381988, 1589157677623],
    negatives:   [309, 250, 166, 62, 102, 133, 0],
    positives:   [200, 154, 168, 66, 62, 36, 0]
   },
retweets:0,
reach:0,
 WordsFreq: [
    {
      text: 'told',
      value: 64,
    },
    {
      text: 'mistake',
      value: 11,
    },
    {
      text: 'thought',
      value: 16,
    },
    {
      text: 'bad',
      value: 17,
    },
    {
      text: 'correct',
      value: 10,
    },
    {
      text: 'day',
      value: 54,
    },
    {
      text: 'prescription',
      value: 12,
    },
    {
      text: 'time',
      value: 77,
    },
    {
      text: 'thing',
      value: 45,
    },
    {
      text: 'left',
      value: 19,
    },
    {
      text: 'pay',
      value: 13,
    },
    {
      text: 'people',
      value: 32,
    },
    {
      text: 'month',
      value: 22,
    },
    {
      text: 'again',
      value: 35,
    },
    {
      text: 'review',
      value: 24,
    },
    {
      text: 'call',
      value: 38,
    },
    {
      text: 'doctor',
      value: 70,
    },
    {
      text: 'asked',
      value: 26,
    },
    {
      text: 'finally',
      value: 14,
    },
    {
      text: 'insurance',
      value: 29,
    },
    {
      text: 'week',
      value: 41,
    },
    {
      text: 'called',
      value: 49,
    },
    {
      text: 'problem',
      value: 20,
    },
    {
      text: 'going',
      value: 59,
    },
    {
      text: 'help',
      value: 49,
    },
    {
      text: 'felt',
      value: 45,
    },
    {
      text: 'discomfort',
      value: 11,
    },
    {
      text: 'lower',
      value: 22,
    },
    {
      text: 'severe',
      value: 12,
    },
    {
      text: 'free',
      value: 38,
    },
    {
      text: 'better',
      value: 54,
    },
    {
      text: 'muscle',
      value: 14,
    },
    {
      text: 'neck',
      value: 41,
    }],

  countFetches:5,
  progressBar:false,
        expanded:"",
        resultScore:{
positiveScore:1,
negativeScore:1,
strongPositive:1,
strongNegtive:1,
totalscore:5,
          negativeScoreStrength:1,
          positiveScoreStrength:1,
          strongNegativeStrength:1,
          strongPositiveStrength:1
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
          hashtag: "Random",
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


       @action setStated(newStated){
           this.stated=newStated;
       }
@action setCountFetches(count){
  this.stated.countFetches=count;
}

@action setProgressBar(val){
  this.stated.progressBar=val;
}

@action setError(val,message){
  this.stated.errorDialog=val;
  this.stated.errorMessage=message;
}


}
