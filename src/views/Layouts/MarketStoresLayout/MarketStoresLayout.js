import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Button } from 'reactstrap';
import { StoreListView, StoreFormView } from "../../Forms";
import * as actionCreater from "../../../store/actions/actions";

export class MarketStoresLayout extends Component {

    constructor(props){
        super(props);

        this.state = {
            enableForm: false,
            formVal: {},
        }

        this.createRecord = this.createRecord.bind(this);
    }

    componentDidMount(){
        console.log("Component Did Mount        ", this.props)
    }

    componentWillReceiveProps(nextProps){
        this.setState({ formVal: nextProps.formVal, enableForm: nextProps.enableForm});
    }

    createRecord(){
        this.props.enableForm({
                                id: '',
                                uName: '',
                                status: '',
                                shopName: '',
                                isAdd: false
                });
    }

    render() {
        const { enableForm, formVal  } = this.state;

        return (
            <main style = {{ padding: '100px'}}>
                <Container>
                    <Row>
                        <Col xs="6">
                            <StoreListView />
                        </Col>
                        <Col xs="6">
                            <StoreFormView formVal = { formVal } />
                        </Col> 
                    </Row>
                </Container>
            </main>    
        )
    }
}

const mapStateToProps = (state) => {
    return {
        formVal: state.globalReducer.formVal,
        enableForm: state.globalReducer.enableForm,
    }
}

const mapDispatchToProps =dispatch =>{
    return {
        enableForm: (val)=> dispatch(actionCreater.enableForm(val)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(MarketStoresLayout);
