import React, { Component } from 'react';
import Request from 'superagent';

import RenderHeader from '../share/RenderHeader';
import DeleteForm from '../share/DeleteForm';
import { HeaderForm2 } from '../share/HeaderForm/HeaderForm';
import RenderEditDeleteButton from '../share/RenderEditDeleteButton';
import PromotionCreatorUpdater, { PromotionCreator, PromotionEditor } from './PromotionCreatorUpdater';
import './promotion_management.css';

import UrlApi, { UrlRedirect } from '../share/UrlApi';
import { BrowserRouter, Route } from 'react-router-dom';

function RenderRow(props) {
    var status = (props.trContent.trang_thai === 1) ? "Kích hoạt" : "Đã hủy";

    var muc_gia_ap_dung = props.trContent.muc_gia_ap_dung;
    var ratesApply = muc_gia_ap_dung.gia_tri.toString() + (parseInt(muc_gia_ap_dung.loai_gia, 10) === 1 ? " %" : " VND");

    return (
        <tr>
            <td>{props.trContent.ma_khuyen_mai}</td>
            <td>{props.trContent.mo_ta_khuyen_mai}</td>
            <td>{ratesApply}</td>
            <td>{status}</td>
            <td>
                <RenderEditDeleteButton
                    nameId={props.trContent._id}
                    handleEditClick={props.handleEditClick}
                    handleDeleteClick={props.handleDeleteClick}
                    handleActiveClick={props.handleActiveClick}

                    trang_thai={props.trContent.trang_thai}
                />
            </td>
        </tr>
    );
}

function RenderBody(props) {
    var rows = [];
    props.tbody.forEach((element, id) => {
        rows.push(
            <RenderRow
                trContent={element}
                key={id}
                handleEditClick={props.handleEditClick}
                handleDeleteClick={props.handleDeleteClick}
                handleActiveClick={props.handleActiveClick}
            />
        );
    });

    return (
        <tbody>
            {rows}
        </tbody>
    );
}

class PromotionManagementContents extends Component {

    render() {
        var theaderPromotion = {
            keys: [],
            values: ["Mã khuyến mãi", "Mô tả khuyến mãi", "Mức giá áp dụng", "Trạng thái"]
        };

        return (
            <div className="table-content">
                <table className="table table-striped">
                    <RenderHeader theader={theaderPromotion} />
                    <RenderBody
                        tbody={this.props.tbodyContents}
                        handleEditClick={this.props.handleEditClick}
                        handleDeleteClick={this.props.handleDeleteClick}
                        handleActiveClick={this.props.handleActiveClick}
                    />
                </table>
            </div>
        );
    }
}

class Promotion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ModeAction: "",
            EditContents: null,
            ShowCreatorUpdaterPopup: false,
            ShowDeletePopup: false,
            tbodyContents: []
        };

        this.handleShowCreatorUpdaterPopup = this.handleShowCreatorUpdaterPopup.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleCloseDeletePop = this.handleCloseDeletePop.bind(this);
        this.handleResetContentsState = this.handleResetContentsState.bind(this);
        this.handleClosePopup = this.handleClosePopup.bind(this);
        this.handleActiveClick = this.handleActiveClick.bind(this);

        this._onKeyDown = this._onKeyDown.bind(this);
    }

    componentDidMount() {
        this.getPromotions();
    }

    _onKeyDown(e) {
        if (e.key === "Escape") {
            this.setState({
                ShowCreatorUpdaterPopup: false,
                ShowDeletePopup: false
            });
        }
    }

    componentWillMount() {
        document.addEventListener("keydown", this._onKeyDown);
    }

    componentWillUnmount() {
        document.addEventListener("keydown", this._onKeyDown);
    }

    getPromotions() {
        Request.get(UrlApi.PromotionManagement)
            .set('x-auth', localStorage.getItem('x-auth'))
            .then((res) => {
                this.setState({
                    tbodyContents: res.body
                });
            });
    }

    handleShowCreatorUpdaterPopup() {
        this.setState({
            ShowCreatorUpdaterPopup: !this.state.ShowCreatorUpdaterPopup,
            ModeAction: "create"
        });
    }

    handleEditClick(event) {
        window.location.href = UrlRedirect.PromotionEditor + `/${event.target.name}`;
    }

    handleActiveClick(event) {
        console.log("dwadawdw");
        var url = UrlApi.PromotionManagement + "/" + event.target.name;
        var $this = this;
        var updatePromotionJson = {
            trang_thai: parseInt(event.target.id, 10) === 1 ? 0 : 1
        };

        Request.put(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('x-auth', localStorage.getItem('x-auth'))
            .send(updatePromotionJson)
            .end(function (err, res) {
                $this.getPromotions();
            });
    }

    handleDeleteClick(event) {
        let selectedItemId = event.target.name;
        let selectedItem = this.state.tbodyContents.find((content) => content._id === selectedItemId);
        this.setState({
            ShowDeletePopup: !this.state.ShowDeletePopup,
            SelectedItemId: selectedItemId,
            selectedItemValue: selectedItem.ma_khuyen_mai
        });
    }

    handleCloseDeletePop() {
        this.setState({
            ShowDeletePopup: !this.state.ShowDeletePopup
        });
    }

    handleResetContentsState() {
        this.getPromotions();
    }

    handleClosePopup() {
        this.setState({
            ShowCreatorUpdaterPopup: !this.state.ShowCreatorUpdaterPopup
        });
    }

    render() {
        return (
            <div className="right_col">
                <div className="row tile_count" >
                    <HeaderForm2
                        title={"Quản lý khuyến mãi"}
                        buttonTitle={"Khuyến mãi"}
                        linkTo={UrlRedirect.PromotionCreator} />
                </div>
                <div className="row">
                    <div id="page-wrapper">
                        <div className="row">
                            <div>
                                <PromotionManagementContents
                                    tbodyContents={this.state.tbodyContents}
                                    handleEditClick={this.handleEditClick}
                                    handleDeleteClick={this.handleDeleteClick}
                                    handleActiveClick={this.handleActiveClick}
                                />

                                {
                                    this.state.ShowCreatorUpdaterPopup ?
                                        <PromotionCreatorUpdater
                                            modeAction={this.state.ModeAction}
                                            editContents={this.state.EditContents}
                                            resetContentState={this.handleResetContentsState}
                                            closeCreatorUpdaterPopup={this.handleShowCreatorUpdaterPopup}
                                        />
                                        : null
                                }

                                {
                                    this.state.ShowDeletePopup ?
                                        <DeleteForm
                                            url={UrlApi.PromotionManagement}
                                            SelectedItemId={this.state.SelectedItemId}
                                            selectedItemValue={this.state.selectedItemValue}
                                            closeDeletePopup={this.handleCloseDeletePop}
                                            resetContentState={this.handleResetContentsState}
                                        />
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class PromotionManagement extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact={true} path={UrlRedirect.Promotions} component={Promotion} />
                    <Route exact={true} path={UrlRedirect.PromotionCreator} component={PromotionCreator} />
                    <Route exact={true} path={UrlRedirect.PromotionEditor + "/:id"} component={PromotionEditor} />
                </div>
            </BrowserRouter>
        );
    }
}

export default PromotionManagement;