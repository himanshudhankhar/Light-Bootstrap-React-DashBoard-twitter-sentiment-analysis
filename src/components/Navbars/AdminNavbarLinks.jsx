
import React, { Component } from "react";
import SearchIcon from '@material-ui/icons/Search';

import { NavItem, Nav, NavDropdown, MenuItem} from "react-bootstrap";
import {InputGroup} from 'react-bootstrap/lib/InputGroup'
// import {FormControl} from 'react-bootstrap/lib'
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import axios from '../../axiosInstance';
import Charty from "react-google-charts";
import Typography from '@material-ui/core/Typography';
import { Scrollbars } from 'react-custom-scrollbars';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Modal from '@material-ui/core/Modal';
import Chart from 'react-apexcharts'
import { observer, inject } from "mobx-react";

import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
   
} from "react-bootstrap";

function abs(val){
  if(val<0){
    return -val;
  }
  return val;
}
@inject('globalstate')
class AdminNavbarLinks extends Component {
handleChange(e){
  this.setState({value: e.target.value});
}
handleCloseTimingDialog(){
  this.setState({showTimingdialog:false})
}

openQueriesDialog(){
  this.setState({progressBar:true,countFetches:5});
this.props.globalstate.setProgressBar(true);
  
axios.get(   '/getPreviousQueries').then(response=>{
    console.log(response.data.result.result);
    this.setState({previousResultsDialog:true,previousResults:response.data.result.result.reverse(),progressBar:false,countFetches:3});
  }).catch(err=>{
    this.props.globalstate.setProgressBar(false);
    this.props.globalstate.setError(true,err.message);
    
    // this.showErrorMessage(err.message);
  });
}
showErrorMessage(message){
this.setState({errorDialog:true,errorMessage:message});

}
handleCloseErrorDialog(){
  this.setState({errorDialog:false});
  this.setState({errorMessage:""});
  this.props.globalstate.setError(false,"");
}
handleChangeExp(resultScore,id){
  if(this.state.expanded==id){
    this.setState({expanded:''});
            return;
  }
  console.log(resultScore);
this.setState({resultScore:resultScore,expanded:id});
}

handleClosePreviousResultsDialog(){
  this.setState({
    previousResultsDialog:false
  });
}
  constructor(){
    
      super();
      this.handleClosePreviousResultsDialog=this.handleClosePreviousResultsDialog.bind(this);
      this.handleCloseErrorDialog=this.handleCloseErrorDialog.bind(this);
      this.openQueriesDialog=this.openQueriesDialog.bind(this);
     
      this.openTimingDialog=this.openTimingDialog.bind(this);
      this.handleCloseTimingDialog = this.handleCloseTimingDialog.bind(this);
      this.showErrorMessage=this.showErrorMessage.bind(this);
      this.handleChangeExp =this.handleChangeExp.bind(this);
      this.state = {
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
      }
  showErrorMessageDialog(){

    return   <Dialog
    open={this.props.globalstate.stated.errorDialog}
    onClose={this.handleCloseErrorDialog}
    aria-labelledby="error-dialog-title"
    aria-describedby="error-dialog-description"
  >
    <DialogTitle id="error-dialog-title"> <p style={{color:"#FF0000",fontSize:20}}>Error</p></DialogTitle>
    <DialogContent>
      <DialogContentText id="error-dialog-description">
       <p style={{fontSize:15}}>{this.props.globalstate.stated.errorMessage}</p>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={this.handleCloseErrorDialog} color="secondary" style={{fontSize:15}}>
        OK
      </Button>
    </DialogActions>
  </Dialog>
  }
  
 
  
  submitHandler = () => {
    console.log(process.env);
    let countFetches = document.getElementById('numberOfFetch').value;
    if(countFetches==undefined||countFetches==null||countFetches.length==0||countFetches=='0'){
      alert('Fetches should be greater than 0');
      return;
    }
    countFetches=parseInt(countFetches);
    if(countFetches>20){
      alert('Cannot make more than 20 fetches');
      return;
    }
this.setState({countFetches:countFetches});
this.props.globalstate.setCountFetches(countFetches);
this.props.globalstate.setProgressBar(true);
      this.setState({progressBar: true,submitted: false,showCharts:false,showTimingdialog:false});
   
      var positive = 0
      var negative = 0
      var neutral = 0
      var negative_strong=0
      var positive_strong=0
      var self = this;
      try { 
        axios.get('/ping',{timeout:2000}).then((res)=>{
        
        axios.get( '/search/'+this.state.hashtag, {
      
              params:{
                countFetches:countFetches
              },
               timeout:countFetches*5000            
        }).then(function(response) {
          console.log(response.data.timeline,typeof(response.data.timeline));
      
         

          var data = response.data;
          var timeLine =  data.timeline;
            negative = abs(response.data.negative_strength)
            positive = abs(response.data.positive_strength)
            neutral = abs(response.data.neutral_count)
            positive_strong= abs(data.strong_positive_strength)
            negative_strong= abs(data.strong_negative_strength)
            // console.log(negative,positive,neutral,positive_strong,negative_strong);
         
         let wordsUsed = new Map(Object.entries( data.wordsUsed));
    
         let seriesb=new Array();
         let optionsb=new Array();
         wordsUsed[Symbol.iterator] = function* () {
          yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
      }
      for (let [key, value] of wordsUsed) {     // get data sorted
        // console.log(key + ' ' + value);
        seriesb.push(value);
        optionsb.push(key);
    }
    seriesb.reverse();
    optionsb.reverse();

  var  WordsFreq=new Array();
    for(let i=0;i<Math.min(70,seriesb.length);i++){
WordsFreq.push({
  text:optionsb[i],
  value:seriesb[i]+Math.ceil((seriesb[0]-seriesb[i])*(seriesb[i]/seriesb[0]))
})
    }
        // wordsUsed.forEach((val,key,map)=>{seriesb.push(val);optionsb.push(key);});
        //  console.log('seriesB',seriesb);
        //  console.log('optionsb',optionsb);
         var newState = {
           timeLine:timeLine,
           retweets:data.retweets,
           reach:data.reach,

          WordsFreq:WordsFreq,
           hashtag:self.state.hashtag,
          submitted: true ,
          progressBar: false , showCharts:true,
           series: [negative, positive, neutral , negative_strong , positive_strong] ,
           resultScore:{
            positiveScore:data.positive_count,
            negativeScore:data.negative_count,
            strongPositive:data.strong_positive_count,
            strongNegtive:data.strong_negative_count,
            totalscore:data.total_score_count,
            totalstrength:data.total_score_strength,
            neutral_count:data.neutral_count,
            neutral_strength:data.neutral_strength,
negativeScoreStrength:negative,
positiveScoreStrength:positive,
strongNegativeStrength:negative_strong,
strongPositiveStrength:positive_strong
           },
           tweets:data.texts,
           seriesBar:[
             {data:seriesb}
           ],
           optionsBar:{
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
               categories: optionsb
             }
           },
         };
         self.props.globalstate.setStated(newState);
         self.props.globalstate.setProgressBar(false);
            self.setState(newState);
        }).catch((e)=>{
       
          self.props.globalstate.setProgressBar(false);
          self.props.globalstate.setError(true,e.message);
          console.log(e);
       this.setState({progressBar:false,errorDialog:true,errorMessage:e.message});
        }
      ); 
    }).catch(err=>{
     
        self.props.globalstate.setProgressBar(false);
        self.props.globalstate.setError(true,err.message);
        console.log(err);
        this.setState({progressBar:false,errorDialog:true,errorMessage:err.message});
    });
 
  }
  catch(errors){
    self.props.globalstate.setProgressBar(false);
        self.props.globalstate.setError(true,errors.message);
        console.log(errors);
        this.setState({progressBar:false,errorDialog:true,errorMessage:errors.message});
    
  }
}
  
  inputHandler = (e) => {
      this.setState({hashtag: e.target.value});
  }
  
  showAnalysis = () => {
      // if(this.state.submitted == true){
          return(
              <div class="row">
              <div class="col-sm-4">
                  <Chart options={this.state.options} series={this.state.series} type="donut" width="420" />
              </div>
              <div class="offset-sm-1 col-sm-7">
              <h1 class="heading_desc">{this.state.hashtag_desc}</h1>
              <br /><br />
              </div>
              </div>  
          );
      // }
  }

  showBarGraph(){
    console.log('here',this.state.optionsBar,this.state.seriesBar);
    let height = 1500;
    height=Math.ceil( this.state.seriesBar[0].data.length * (1500/64) );
    console.log('height calculated',height,this.state.seriesBar[0].data.length,(1500/64));
    return(
      <div class="col">
         <div class="offset-sm-1 col-sm-7">
      <h4 class="heading_desc">Sentimental Words</h4>
      <br /><br />
      </div>
      <div class="col-sm-4">
         
      <Chart options={this.state.optionsBar} series={this.state.seriesBar} type="bar" height={ height} width={1000}/>

      </div>
     
      </div>  
  );


  }
  
  showLoadingBar = () => {
      // if(this.state.progressBar){
        if(this.props.globalstate.stated.progressBar==true){
          return(
           
     
<div style={{width:window.innerWidth,height:window.innerHeight,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
              <div class="text-center" >
                  <img src={require('./loading_bar.gif')} width="50"/>
                  {/* <Loader
       type="Puff"
       color="#00BFFF"
       height={100}
       width={100}
       //3 secs

    /> */}
                  <h2  style={{color:'#59C7E8'}}>Please Wait...</h2>
  <h3  style={{color:'#59C7E8'}}>Count for { Math.ceil(this.props.globalstate.stated.countFetches*1.5)}</h3>
              </div>
              </div>
          );
      }
  }
     
  openTimingDialog(){
    var hashtag  = document.getElementById('search-text').value;
    this.setState({hashtag});
    if(hashtag==undefined||hashtag==null||hashtag.length==0){
      alert('Please enter some words to make query!!');
      return;
    }
      this.setState({showTimingdialog:true});
  }


  render() {
   if(this.props.comp=='Dashboard'){
    return (
       <div style={{display:"flex",flexDirection:"row",paddingTop:10,paddingBottom:10,fontSize:30}}>
        
            {/* <p className="hidden-lg hidden-md">Dashboard</p> */}
           
 <FormControl fullWidth style={{fontSize:15}}  >  
           
           <TextField id="search-text" label="Search HashTags" variant="outlined" color='#3E3E3E' 
          
            inputProps={{
              style: {fontSize: 15} 
            }}

            inputLabelProps={{style:{fontSize:15}}}
       
           />

      
        </FormControl> 
       
        <Button variant="contained" color="primary" style={{marginLeft:20,paddingLeft:8,paddingRight:8,backgroundColor:'#3E3E3E',width:100,fontSize:13}} onClick={this.openTimingDialog}> <SearchIcon style={{width:20,height:20}}/> Search</Button>
        <Dialog onClose={this.handleCloseTimingDialog} aria-labelledby="Tweets Count" open={this.state.showTimingdialog} style={{height:800}}>
      <DialogTitle id="title-dialog-timing"> <p style={{fontSize:20}}>Number of Batches of 100 Tweets to Fetch</p></DialogTitle>
      <DialogContent>
      <Scrollbars style={{width:500,height:150}}>
          <DialogContentText style={{fontSize:11}}>
          
            Standard Search Api (Free Version) is used for fetching tweets each fetch gives atmost 100 tweets and takes around 1 sec for each batch fetched (considering analysis also).
            Number of tweets analysed solely depends on the number of tweets provided by twitter and the query you entered. Twitter can provide less tweets also considering the traffic on twitter servers because this is a free version of twiiter api so less priority is given to this api fetches.
         
          </DialogContentText>
          <TextField
             inputProps={{
              style: {fontSize: 15} 
            }}
            autoFocus
            margin="dense"
            id="numberOfFetch"
            label="Number of Fetch"
            type="number"
             width={160}
          />
             </Scrollbars>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseTimingDialog} color="primary" style={{fontSize:15}}>
            Cancel
          </Button>
          <Button onClick={this.submitHandler} color="primary" style={{fontSize:15}}>
            Fetch
          </Button>
        </DialogActions>
      </Dialog>
      {this.showErrorMessageDialog()}
                  {/* {this.showPreviousQueriesDialog()} */}
                  <Modal
        open={this.props.globalstate.stated.progressBar==true && this.state.progressBar==true }
        style={{height:100,width:100}}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
     <p>{this.showLoadingBar()}</p>
      </Modal>
      </div>
  
    );
   }else{
  return <div/>   
    }
  }








  showPreviousQueriesDialog(){

    return <Dialog
    open={this.state.previousResultsDialog}
    fullWidth={true}
    onClose={this.handleClosePreviousResultsDialog}
    aria-labelledby="previous-dialog-title"
    aria-describedby="previous-dialog-description"
  >
    <DialogTitle id="previous-dialog-title">Previous Queries</DialogTitle>
    <DialogContent>
    <Scrollbars style={{width:500,height:450}}>
      <DialogContentText id="alert-dialog-description">
      
        {this.state.previousResults.length==0?this.showNoPreviousResult() :   this.state.previousResults.map((previous) => {return this.getpreviousResultTemplate(previous) } )}
       
      </DialogContentText>
      </Scrollbars>
    </DialogContent>
    <DialogActions>
       
      <Button onClick={this.handleClosePreviousResultsDialog} color="primary" variant="contained">
        Close
      </Button>
    </DialogActions>
  </Dialog>
  }
  
  showNoPreviousResult(){
    return <div style={{display:"flex",flexDirection:"column" , color:"#00aced"}}>
  <h3>No Previous Queries Present</h3>
    </div>
  }
  getpreviousResultTemplate(previous){
  // console.log(previous);
    return <ExpansionPanel TransitionProps={{ unmountOnExit: true }} expanded={this.state.expanded==previous._id}  onChange={()=>{this.handleChangeExp(previous.resultScore,previous._id)}}>
    <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography ><b>Query: </b> {previous.queryWords} <b>Date: </b> {previous.queryDate}  </Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
     {this.showPieChart(previous.resultScore,previous.queryWords)}
    </ExpansionPanelDetails>
  </ExpansionPanel>
  
  }
  
  showPieChart(resultScore,queryWords){
    resultScore=this.state.resultScore
  if(resultScore.positiveScore==0 && resultScore.negativeScore==0 && resultScore.strongPositive==0 && resultScore.strongNegative==0 && resultScore.totalscore==0){
    return <div style={{color:'red'}}>
  No results were fetched for this query at that time.
  May be due to some error occured at that time.
    </div>
  }
  
    return(
      <div class="row" style={{width:600,height:400}}>
      <div class="col-sm-12">
              <Charty
            chartType="PieChart"
            width="100%"
            height="400px"
          data = {[
            ["Sentiment", "Percentage"],
            ["Negative", abs(resultScore.negativeScoreStrength)],
            ["Positive",  abs(resultScore.positiveScoreStrength)],
            ["Neutral", abs(resultScore.totalscore - resultScore.strongPositive - resultScore.strongNegtive -resultScore.positiveScore-resultScore.negativeScore)],
            ["Strong Positive",   abs(resultScore.strongPositiveStrength)],
            ["Strong Negative", abs(resultScore.strongNegativeStrength)] // CSS-style declaration
          ]}
            options = {{
              title : "Sentiments",
              pieHole: 0.4,
              is3D: false}
            }
          
          />
      </div>
     
      </div>  
  );
  }
  







}

export default AdminNavbarLinks;
