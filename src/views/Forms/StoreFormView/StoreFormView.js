import React, { Component } from 'react'
import { ButtonToggle, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from "react-redux";
import * as actionCreater from "../../../store/actions/actions";

export class StoreFormView extends Component {
    constructor(props){
        super(props);
        this.state = {
            pageLoading: false,
            id: props.formVal.id,
            uName: props.formVal.uName,
            shopName: props.formVal.shopName,
            status: props.formVal.status,
            date: props.formVal.date,
            isAdd: props && props.formVal.isAdd ? props && props.formVal.isAdd : false,
        }

        //handle Change
        this.handleChange = this.handleChange.bind(this);

        //Submit Form
        this.submitForm = this.submitForm.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.formVal){
            
            this.setState({
                id: nextProps.formVal.id,
                uName: nextProps.formVal.uName,
                shopName: nextProps.formVal.shopName,
                status: nextProps.formVal.status,
                date: nextProps.formVal.date,
                isAdd: nextProps.formVal.isAdd,
            })
        }else{
            this.setState({ isAdd: true})
        }
    }
    
    handleChange(e){

        this.setState({ [e.target.name] : e.target.value});
    }

    submitForm(){
        const { id, uName, shopName, status, isAdd } = this.state;
        if(isAdd === true || Object.keys(this.props.formVal).length === 0){
            this.props.addStore({
                uName: uName,
                shopName: shopName,
                status: status
            });
        }else{
            this.props.updateStore({
                id: id,
                uName: uName,
                shopName: shopName,
                status: status
            });
        }
        this.props.reloadPage();
        
    }

    render() {

        var { id, uName, shopName, status, date, isAdd } = this.state;

        console.log("Form Value         ", this.state)
        return (
            <Form>
                <FormGroup>
                    <Label for="Name">Name</Label>
                    <Input type="text" name="uName" id="uName" value = { uName ? uName : ''} readOnly = { isAdd ? isAdd : false}  onChange = { this.handleChange }/>
                </FormGroup>

                <FormGroup>
                    <Label for="shopName">Shop Name</Label>
                    <Input type="text" name="shopName" id="shopName" value = { shopName ? shopName : '' } onChange = { this.handleChange } />
                </FormGroup>

                <FormGroup>
                    <Label for="status">Text Area</Label>
                    <Input type="textarea" name="status" id="status" value = { status ? status : '' } onChange = { this.handleChange } />
                </FormGroup>

                <ButtonToggle color="success" onClick = { ()=> this.submitForm() }>Submit</ButtonToggle>
            </Form>
        )
    }
}


const mapDispatchToProps =dispatch =>{
    return {
        updateStore: (val)=> dispatch(actionCreater.updateStore(val)),
        addStore: (val)=> dispatch(actionCreater.addStore(val)),
        reloadPage: ()=> dispatch(actionCreater.reloadPage()),
    }
  }

export default connect(null, mapDispatchToProps)(StoreFormView);

