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
import { ExportToCsv } from 'export-to-csv';
import Button from "components/CustomButton/CustomButton.jsx";

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import axios from '../axiosInstance';
import Card from "components/Card/Card.jsx";
// import { thArray, tdArray } from "variables/Variables.jsx";
import { observer, inject } from "mobx-react";
@inject('globalstate')
@observer
class TableList extends Component {
  thArray=['ID','Query','Date', 'Actions' ]

componentWillMount(){
  axios.get('/getPreviousQueries').then(result=>{
      // console.log(result.data.result.result);
      this.setState({results:result.data.result.result});
  }).catch(err=>{
console.log(err);
  });
}
equalise(arr){
var result=new Array()
  for(let i=0;i<arr.length;i++){
    var res = arr[i];
    for(var x in arr[i].resultScore){
      res[x] = arr[i].resultScore[x]
    }
    delete res['resultScore']
    result.push(res);
}
 console.log(result);
return result;
}

downloadAll(){
  console.log("this button was pressed");
  const options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: true,
    title: 'AllQueries'+new Date().getUTCDate(),
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };
  const csvExporter = new ExportToCsv(options);
   csvExporter.generateCsv(this.equalise(this.state.results));
//  this.equalise(this.state.results);

}


deleteAll(){
  axios.get('/deleteAll').then(result=>{
this.setState({results:[]});
  }).catch(err=>{
console.log(err.message);
this.setState({showError:true,errorMessage:err.message});
  });

}

closeErrorDialog(){
  this.setState({showError:false,errorMessage:''});
}
deleteSingle(prop){
axios.post('/deleteSingle',{prop}).then(result=>{
  if(result.data.count>=1){
var res = new Array();
for(let i=0;i<this.state.results.length;i++){
  if(this.state.results[i]._id==prop._id){
    continue;
  }else{
    res.push(this.state.results[i]);
  }
}
this.setState({results:res});
  }else{
    this.setState({showError:true,errorMessage:'Some DataBase Problem'});

  }
}).catch(err=>{
  console.log(err.message);
this.setState({showError:true,errorMessage:err.message});
})


}
constructor(props){
  super(props);
  this.downloadAll=this.downloadAll.bind(this);
  this.deleteAll=this.deleteAll.bind(this);
  this.closeErrorDialog=this.closeErrorDialog.bind(this);
  this.deleteSingle=this.deleteSingle.bind(this);
  this.state={
showError:false,
errorMessage:"",
    results:[{
      countFetches: 20,
queryDate: "2020-05-09",
queryWords: "lockdown uk",
reach: 1844,
refreshUrl: "?since_id=1259842023256920064&q=lockdown%20uk&result_type=recent&include_entities=1"
    }]
  }
}

downloadSingle(prop){
console.log(prop);
  const options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: true,
    title: 'SingleQuery'+new Date().getUTCDate(),
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };
  const csvExporter = new ExportToCsv(options);
     csvExporter.generateCsv(this.equalise([prop]));
// this.equalise(prop);
}
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Row>
            <button  style={{color:'#FFF',backgroundColor:'#545454',borderRadius:'5px',border:'1px solid black',marginBottom:20,marginLeft:20}} onClick={this.downloadAll}>Download All</button>
            <button  style={{color:'#FFF',backgroundColor:'#545454',borderRadius:'5px',border:'1px solid black',marginBottom:20,marginLeft:20}} onClick={this.deleteAll}>Delete All</button>
            
            </Row>
              <Card
                title="All Searched Queries"
                category="Important metrics were stored"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {this.thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                        {/* <td><button style={{color:'#FFF',backgroundColor:'#545454',borderRadius:'5px',border:'1px solid black',marginLeft:5}}>Download All</button></td> */}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.results.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {/* {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })} */}
                            <td>{key+1}</td>
                            <td>{prop.queryWords}</td>
                          <td>{prop.queryDate}</td>
                          <td><button style={{color:'#FFF',backgroundColor:'#545454',borderRadius:'5px',border:'1px solid black',marginRight:5}} onClick={()=>{this.downloadSingle(prop)}} >Download</button>
                          <button style={{color:'#FFF',backgroundColor:'#545454',borderRadius:'5px',border:'1px solid black',marginLeft:5 }} onClick={()=>{this.deleteSingle(prop)}}  >Delete</button>
                          </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
             </Col>

            {/* <Col md={12}>
              <Card
                plain
                title="Striped Table with Hover"
                category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {tdArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col> */}
          </Row>
        </Grid>
        {this.showErrorMessageDialog()}
      </div>
    );
  }



  showErrorMessageDialog() {

    return <Dialog
      open={this.state.showError}
      onClose={this.closeErrorDialog}
      aria-labelledby="error-dialog-title"
      aria-describedby="error-dialog-description"
    >
      <DialogTitle id="error-dialog-title"> <p style={{ color: "#FF0000", fontSize: 20 }}>Error</p></DialogTitle>
      <DialogContent>
        <DialogContentText id="error-dialog-description">
          <p style={{ fontSize: 15 }}>{this.state.errorMessage}</p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.closeErrorDialog} color="secondary" style={{ fontSize: 15 }}>
          OK
      </Button>
      </DialogActions>
    </Dialog>
  }

}

export default TableList;
