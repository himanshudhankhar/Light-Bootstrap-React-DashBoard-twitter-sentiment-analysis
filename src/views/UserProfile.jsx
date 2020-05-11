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
import axios from '../axiosInstance';
import React, { Component } from "react";
import Modal from '@material-ui/core/Modal';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { observer, inject } from "mobx-react";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import avatar from "assets/img/faces/face-3.jpg";
@inject('globalstate')
@observer
class UserProfile extends Component {
  showErrorMessageDialog() {

    return <Dialog
      open={this.props.globalstate.stated.errorDialog}
      onClose={this.handleCloseErrorDialog}
      aria-labelledby="error-dialog-title"
      aria-describedby="error-dialog-description"
    >
      <DialogTitle id="error-dialog-title"> <p style={{ color: "#FF0000", fontSize: 20 }}>Error</p></DialogTitle>
      <DialogContent>
        <DialogContentText id="error-dialog-description">
          <p style={{ fontSize: 15 }}>{this.props.globalstate.stated.errorMessage}</p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleCloseErrorDialog} color="secondary" style={{ fontSize: 15 }}>
          OK
      </Button>
      </DialogActions>
    </Dialog>
  }



  handleSubmit() {
    var apikey = document.getElementById("api").value;
    var apisecret = document.getElementById("apikey").value;
    var accesstoken = document.getElementById("accesstoken").value;
    var accesstokensecret = document.getElementById("accesstokensecret").value;

    this.setState({ opensubmit: false })
    if (apikey == undefined || apikey == null || apikey.length == 0) {
      alert('Please enter a api key');
      return;
    }

    if (apisecret == undefined || apisecret == null || apisecret.length == 0) {
      alert('Please enter a api secret');
      return;
    }
    if (accesstoken == undefined || accesstoken == null || accesstoken.length == 0) {
      alert('Please enter a access token');
      return;
    }
    if (accesstokensecret == undefined || accesstokensecret == null || accesstokensecret.length == 0) {
      alert('Please enter a access token');
      return;
    }

    this.props.globalstate.setProgressBar(true); this.setState({ progressBar: true });
    axios.post( '/updateKeys', { apikey, apisecret, accesstoken, accesstokensecret }).then((res) => {
      this.props.globalstate.setProgressBar(false); this.setState({ progressBar: false });
      this.setState({apikey,apisecret,accesstoken,accesstokensecret});
    }).catch(err => {
      this.props.globalstate.setProgressBar(false); this.setState({ progressBar: false });
      this.props.globalstate.setError(true, err.message);
    });


  }
componentWillMount(){
axios.get('/getKeys').then(res=>{
   var keys = res.data.keys;
  this.props.globalstate.setProgressBar(false); this.setState({ progressBar: false });
      this.setState({ apikey:keys.apikey,apisecret:keys.apisecret,accesstoken:keys.accesstoken,accesstokensecret:keys.accesstokensecret});
}).catch(err=>{
  this.props.globalstate.setProgressBar(false); this.setState({ progressBar: false });
      this.props.globalstate.setError(true, err.message);
});
}




  handleCloseErrorDialog() {
    this.props.globalstate.setError(false, '');
  }

  openSubmitDialog() {
    this.setState({ opensubmit: true });
  }
  handleCloseSubmit() {
    this.setState({ opensubmit: false })
  }
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseErrorDialog = this.handleCloseErrorDialog.bind(this);
    this.openSubmitDialog = this.openSubmitDialog.bind(this);
    this.handleCloseSubmit = this.handleCloseSubmit.bind(this);
    this.state = {
      opensubmit: false,
      progressBar: false, apikey: '', apisecret: '', accesstoken: '', accesstokensecret: ''
    }
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={10}>
              <Card
                title="Edit Twitter API's and tokens"
                content={
                  <form>
                    <FormGroup controlId="api">
                      <ControlLabel>API</ControlLabel>
                      <FormControl type="text" placeholder="API" defaultValue="IsGQbsw5LdCjidg6FOC7bwk2j" />
                    </FormGroup>
                    <FormGroup controlId="apikey">
                      <ControlLabel>API KEY</ControlLabel>
                      <FormControl type="text" placeholder="API KEY" defaultValue="S0C9pSupoBxEWWccviCBbxGwCZvxl0xpG6J2rcFa8aOicYH5Eq" />
                    </FormGroup>
                    <FormGroup controlId="accesstoken">
                      <ControlLabel>ACCESS TOKEN</ControlLabel>
                      <FormControl type="text" placeholder="ACCESS TOKEN" defaultValue="934430645060648960-TEu3UU6bFy4O9Ob63HvdsyLOLKAwDNp" />
                    </FormGroup>
                    <FormGroup controlId="accesstokensecret">
                      <ControlLabel>ACCESS TOKEN SECRET</ControlLabel>
                      <FormControl type="text" placeholder="ACCESS TOKEN SECRET" defaultValue="ER1HvrTtIgffIQW7iYHMg00h4fMaRxW7GBPh2iweooitp" />
                    </FormGroup>



                    <Button bsStyle="info" pullRight fill onClick={this.openSubmitDialog}>
                      Update Tokens
                    </Button>
                    <Modal
                      open={this.props.globalstate.stated.progressBar == true && this.state.progressBar == true}
                      style={{ height: 100, width: 100 }}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                    >
                      <p>{this.showLoadingBar()}</p>
                    </Modal>
                    {this.showErrorMessageDialog()}
                    <Dialog
                      open={this.state.opensubmit}
                      onClose={this.handleCloseSubmit}
                      aria-labelledby="error-dialog-title"
                      aria-describedby="error-dialog-description"
                    >
                      <DialogTitle id="error-dialog-title"> <p style={{ color: "#FF0000", fontSize: 20 }}>CONFIRMATION</p></DialogTitle>
                      <DialogContent>
                        <DialogContentText id="error-dialog-description">
                          <p style={{ fontSize: 15 }}>It is an irreversible step. Do you confirm to change token keys.</p>
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleCloseSubmit} color="secondary" style={{ fontSize: 15 }}>
                          CANCEL
      </Button>
                        <Button onClick={this.handleSubmit} color="secondary" style={{ fontSize: 15 }}>
                          CONFIRM
      </Button>
                      </DialogActions>
                    </Dialog>
                    <div className="clearfix" />

                  </form>
                }
              />
            </Col>
            {/* <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={avatar}
                name="Mike Andrew"
                userName="michael24"
                description={
                  <span>
                    "Lamborghini Mercy
                    <br />
                    Your chick she so thirsty
                    <br />
                    I'm in that two seat Lambo"
                  </span>
                }
                socials={
                  <div>
                    <Button simple>
                      <i className="fa fa-facebook-square" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-twitter" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-google-plus-square" />
                    </Button>
                  </div>
                }
              />
            </Col> */}
          </Row>
        </Grid>
      </div>
    );
  }


  showLoadingBar = () => {
    // if(this.state.progressBar){
    if (this.props.globalstate.stated.progressBar == true) {
      return (


        <div style={{ width: window.innerWidth, height: window.innerHeight, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div class="text-center" >
            <img src={require('../components/Navbars/loading_bar.gif')} width="50" />
            {/* <Loader
     type="Puff"
     color="#00BFFF"
     height={100}
     width={100}
     //3 secs

  /> */}
            <h2 style={{ color: '#59C7E8' }}>Please Wait...</h2>
            <h3 style={{ color: '#59C7E8' }}>Count for {Math.ceil(this.props.globalstate.stated.countFetches * 1.5)}</h3>
          </div>
        </div>
      );
    }
  }
}

export default UserProfile;
