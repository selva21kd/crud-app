import React, { Component } from 'react'
import { connect } from "react-redux";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, TablePagination,
        InputBase,  } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import './style.css'

import * as actionCreater from "../../../store/actions/actions";


export class StoreListView extends Component {
    constructor(props){
        super(props);
        //Default State Values      
        this.state = {
            pageLoading: false,          //To show and hide loader
            allStores: [],
            stores: [],
            rowsPerPage: 5,
            page: 0,
        }

        //To show form view of the record
        this.clickHandler = this.clickHandler.bind(this);

        //Change Pagination
        this.handleChangePage = this.handleChangePage.bind(this);

        //Change record length per page
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

        //filter Data
        this.filterData = this.filterData.bind(this);
    }

    componentWillMount(){
        this.props.getStores();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.stores){
            this.setState({stores: nextProps.stores, allStores: nextProps.stores});
        }    
    }

    handleChangePage(e){
        this.setState({ page: e.target.value})
    }

    handleChangeRowsPerPage(e){
        this.setState({ rowsPerPage: e.target.value})
    }

    filterData(e){
        var { stores, allStores } = this.state;

        if(e.target.value.trim() !== ''){
            stores = stores.filter((store)=> store.uName.indexOf(e.target.value, 2) === -1);
            this.setState({ stores });
        }else{
            this.setState({ stores: allStores});
        }
    }

    clickHandler(val){
        val.isAdd = false;
        this.props.openForm(val)
    }
    
    deleteRecord(val){
        val.isAdd = true;
        this.props.deleteRecord({ storeId: val.id})
    }

    render() {
        
        const { stores, rowsPerPage, page } = this.state;
       
        return (
            <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan = { 5 } className = "search-bar">
                                    <InputBase placeholder="Search…"  width= "80px" onChange = { this.filterData } inputProps={{ 'aria-label': 'search' }}/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                stores.length !== 0 ?
                                    stores.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((val, index)=>
                                        <TableRow key = { Math.random()}>
                                            <TableCell scope="row">
                                                { index + 1 }
                                            </TableCell>
                                            <TableCell>
                                                { val.uName}
                                            </TableCell>
                                            <TableCell>
                                                { val.status}
                                            </TableCell>
                                            <TableCell>
                                                { val.date}
                                            </TableCell>
                                            <TableCell>
                                                <FontAwesomeIcon icon={ faEdit } onClick = { ()=> this.clickHandler(val) }/>
                                            </TableCell>
                                            <TableCell>
                                                <FontAwesomeIcon icon={ faTrash } onClick = { ()=> this.deleteRecord(val) }/>
                                            </TableCell>
                                        </TableRow>
                                ) 
                                : <TableRow>
                                    <TableCell colSpan = { 5 }>
                                        No Data Found ..!
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={ stores.length }
                    rowsPerPage={ rowsPerPage }
                    page={ page }
                    onChangePage={ this.handleChangePage }
                    onChangeRowsPerPage={ this.handleChangeRowsPerPage }
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        stores: state.globalReducer.stores,
    }
}

const mapDispatchToProps =dispatch =>{
    return {
        getStores: ()=> dispatch(actionCreater.getStores()),
        openForm: (val)=> dispatch(actionCreater.openForm(val)),
        deleteRecord: (val)=> dispatch(actionCreater.deleteRecord(val)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(StoreListView);

