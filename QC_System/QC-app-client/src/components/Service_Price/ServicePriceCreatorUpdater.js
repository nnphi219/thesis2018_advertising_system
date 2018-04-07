import React, { Component } from 'react';
import Request from 'superagent';
import DatePicker from 'react-date-picker';
import UrlApi from '../share/UrlApi';
import './service_price.css';
import { JsonDateToDate, DateToJsonDate } from '../share/Mapper';
import { RenderInput, RenderSelect, RenderRadioButon, RenderDate } from '../share/InputsRender';

class RenderLeftForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var ma_dich_vu_ap_dung = this.props.stateValues.ma_dich_vu_ap_dung === undefined ? "" : this.props.stateValues.ma_dich_vu_ap_dung;
        var AdsAreaIdsKeys = this.props.stateValues.AdsAreaIds === undefined ? [] : this.props.stateValues.AdsAreaIds.keys;
        var AdsAreaIdsValues = this.props.stateValues.AdsAreaIds === undefined ? [] : this.props.stateValues.AdsAreaIds.values;

        var classNamePriceId = this.props.stateValues.ma_gia === "" ? "input--required" : "";
        return (
            <div key="left" className="serviceprice_information_left">
                <h2>Thông tin giá dịch vụ</h2>
                <div>
                    <RenderSelect
                        nameId={"ma_dich_vu_ap_dung"}
                        title={"Mã dịch vụ quảng cáo"}
                        keys={AdsAreaIdsKeys}
                        values={AdsAreaIdsValues}
                        selectedValue={ma_dich_vu_ap_dung}
                        OnChangeSelect={this.props.OnChangeSelect}
                        className={"serviceprice--select"}
                    />
                    <div>
                        <label key={"ma_gia"} className="fullwidth">
                            {"Nhập mã giá"}
                            <input type="text" key={"ma_gia"} name={"ma_gia"} value={this.props.stateValues.ma_gia} onChange={this.props.OnChangeInput} className={`serviceprice--input ${classNamePriceId}` } />
                        </label>
                    </div>
                    <div>
                        <div className="">
                            <label className="fullwidth">
                                {"Thời điểm đấu giá"}
                                <div>
                                    <DatePicker name="start_date" value={this.props.stateValues.start_date} onChange={this.props.OnchangeStartDate} className="input-date" />
                                </div>
                            </label>
                        </div>
                    </div>
                    <RenderRadioButon
                        nameId={"co_thoi_diem_ket_thuc"}
                        title={"Có thời điểm kết thúc"}
                        keys={servicePriceInputs.co_thoi_diem_ket_thuc.keys}
                        values={servicePriceInputs.co_thoi_diem_ket_thuc.values}
                        selectedValue={this.props.stateValues.co_thoi_diem_ket_thuc}
                        OnChangeRadioButton={this.props.OnChangeRadioButton}
                        className={"input-radio"}
                    />
                    <div>
                        <div className="">
                            <label className="fullwidth">
                                {"Thời điểm kết thúc"}
                                <div>
                                    <DatePicker name="end_date" value={this.props.stateValues.end_date} onChange={this.props.OnchangeEndDate} className="input-date" />
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

class RenderRightForm extends Component {
    render() {
        var loai_co_che = this.props.stateValues.loai_co_che === undefined ? "" : this.props.stateValues.loai_co_che;
        return (
            <div key="right" className="serviceprice_information_right">
                <h2>Thông số giá</h2>
                <div>
                    <div>
                        <label className="fullwidth" >
                            {"Cơ chế hiển thị"}
                            <select name={"loai_co_che"} key={"loai_co_che"} value={loai_co_che} onChange={this.props.OnChangeSelect} className="serviceprice--select">
                                <option value={"doc_quyen"} >{"Độc quyền"}</option>
                                <option value={"co_dinh_vi_tri"} >{"Cố định vị trí"}</option>
                                <option value={"chia_se_co_dinh"} >{"Chia sẻ cố định"}</option>
                                <option value={"ngau_nhien"} >{"Ngẫu nhiên"}</option>
                            </select>
                        </label>
                    </div>
                    <RenderRadioButon
                        nameId={"loai_gia"}
                        title={"Mô hình giá"}
                        keys={servicePriceInputs.loai_gia.keys}
                        values={servicePriceInputs.loai_gia.values}
                        selectedValue={this.props.stateValues.loai_gia}
                        OnChangeRadioButton={this.props.OnChangeRadioButton}
                        className={"input-radio"}
                    />
                    <div>
                        <label className="fullwidth">
                            {"Giá (VND)"}
                        </label>
                        <input type="number" key={"gia_tri"} name={"gia_tri"} value={this.props.stateValues.gia_tri} onChange={this.props.OnChangeInput} className="serviceprice--input" />
                    </div>
                    <div>
                        <label className="fullwidth">
                            {"Số ngày áp dụng"}
                        </label>
                        <input type="number" key={"so_ngay_ap_dung"} name={"so_ngay_ap_dung"} value={this.props.stateValues.so_ngay_ap_dung} onChange={this.props.OnChangeInput} className="serviceprice--input" />
                    </div>
                    <div>
                        <label className="fullwidth">
                            {"Số lượng click / view tối đa"}
                        </label>
                        <input type="number" key={"so_click_tren_view"} name={"so_click_tren_view"} value={this.props.stateValues.so_click_tren_view} onChange={this.props.OnChangeInput} className="serviceprice--input" />
                    </div>

                </div>
            </div>
        );
    }

}

class RenderProperties extends Component {
    render() {
        return (
            <div>
                <RenderLeftForm
                    OnChangeInput={this.props.OnChangeInput}
                    OnChangeSelect={this.props.OnChangeSelect}
                    OnChangeRadioButton={this.props.OnChangeRadioButton}
                    OnchangeStartDate={this.props.OnchangeStartDate}
                    OnchangeEndDate={this.props.OnchangeEndDate}

                    stateValues={this.props.stateValues}
                />

                <RenderRightForm
                    OnChangeInput={this.props.OnChangeInput}
                    OnChangeSelect={this.props.OnChangeSelect}
                    OnChangeRadioButton={this.props.OnChangeRadioButton}
                    stateValues={this.props.stateValues}
                />
            </div>
        );
    }
}

class ServicePriceCreatorUpdaterForm extends Component {
    constructor(props) {
        super(props);

        this.OnChangeInput = this.OnChangeInput.bind(this);
        this.OnChangeSelect = this.OnChangeSelect.bind(this);
        this.OnChangeRadioButton = this.OnChangeRadioButton.bind(this);

        this.OnchangeStartDate = this.OnchangeStartDate.bind(this);
        this.OnchangeEndDate = this.OnchangeEndDate.bind(this);
    }

    OnchangeStartDate(date) {
        var jsonState = { "start_date": date }
        this.props.UpdateState(jsonState);
    }

    OnchangeEndDate(date) {
        var jsonState = { "end_date": date }
        this.props.UpdateState(jsonState);
    }

    OnChangeInput(e) {
        var jsonState = { [e.target.name]: e.target.value };
        this.props.UpdateState(jsonState);
    }

    OnChangeSelect(e) {
        var name = e.target.name;
        var value = e.target.value;

        this.props.UpdateState({ [name]: value });
    }

    OnChangeRadioButton(e) {
        this.props.UpdateState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className='popup_inner serviceprice_createform_size div_scroll_bar'>
                <h1>{this.props.titleForm}</h1>
                <RenderProperties
                    OnChangeInput={this.OnChangeInput}
                    OnChangeSelect={this.OnChangeSelect}
                    OnChangeRadioButton={this.OnChangeRadioButton}
                    OnchangeStartDate={this.OnchangeStartDate}
                    OnchangeEndDate={this.OnchangeEndDate}

                    stateValues={this.props.stateValues}
                />
                <div className="submit">
                    <button className="btn btn-primary" onClick={this.props.handleSubmit}>Save</button>
                    <button className="btn btn-primary" onClick={this.props.handleClosePopup}>Cancel</button>
                </div>
            </div>
        );
    }
}

class ServicePriceCreatorUpdater extends Component {
    constructor(props) {
        super(props);

        var jsonState = {};
        this.state = this.SetInitState(jsonState);
        this.GetAdsAreaIdInfos();
    }

    GetAdsAreaIdInfos() {
        var $this = this;
        Request.get(UrlApi.GetAdsAreaInfo)
            .then((res) => {
                var _ids = [];
                var keys = [];
                var values = [];

                res.body.map((adsArea) => {
                    _ids.push(adsArea._id);
                    keys.push(adsArea.ma_dich_vu);
                    values.push(adsArea.ten_hien_thi);
                });

                var jsonAdsAreaIds = {
                    AdsAreaIds: {
                        _ids: _ids,
                        keys: keys,
                        values: values
                    },
                    
                };
                if(this.props.modeAction === "create"){
                    jsonAdsAreaIds.ma_dich_vu_ap_dung = keys[0];
                }
                
                $this.setState(jsonAdsAreaIds);
            });
    }

    SetInitState(jsonState) {
        if (this.props.modeAction === "create") {
            jsonState.ma_gia = "";
            jsonState.loai_co_che = "doc_quyen";
            jsonState.loai_gia = "CPD";
            jsonState.gia_tri = 0;
            jsonState.so_ngay_ap_dung = 0;
            jsonState.so_click_tren_view = 0;

            var today = new Date();

            jsonState.start_date = today;
            jsonState.end_date = today;
            jsonState.co_thoi_diem_ket_thuc = 1;
        }
        else {
            var editContents = this.props.editContents;

            jsonState.ma_gia = editContents.ma_gia;
            jsonState.ma_dich_vu_ap_dung = editContents.ma_dich_vu_ap_dung;
            jsonState.loai_co_che = editContents.loai_co_che;
            jsonState.loai_gia = editContents.loai_gia;
            jsonState.gia_tri = editContents.gia_tri;
            jsonState.so_ngay_ap_dung = editContents.so_luong_don_vi_ap_dung.so_ngay_ap_dung;
            jsonState.so_click_tren_view = editContents.so_luong_don_vi_ap_dung.so_click_tren_view;
            jsonState.start_date = JsonDateToDate(editContents.start_date);

            if (editContents.end_date === undefined || editContents.end_date === "") {
                jsonState.co_thoi_diem_ket_thuc = 0;
                jsonState.end_date = new Date();
            }
            else {
                jsonState.co_thoi_diem_ket_thuc = 1;
                jsonState.end_date = JsonDateToDate(editContents.end_date);
            }
        }
        return jsonState;
    }

    handleUpdateState(jsonState) {
        this.setState(jsonState);
    }

    GetModelStateJson() {
        var state = this.state;

        var startDateJson = DateToJsonDate(state.start_date);
        var endDateJson = parseInt(state.co_thoi_diem_ket_thuc) === 1 ? DateToJsonDate(state.end_date) : null;

        var servicePriceContent = {
            ma_dich_vu_ap_dung: state.ma_dich_vu_ap_dung,
            ma_gia: state.ma_gia,
            start_date: startDateJson,
            end_date: endDateJson,
            loai_co_che: state.loai_co_che,
            loai_gia: state.loai_gia,
            gia_tri: state.gia_tri,
            so_luong_don_vi_ap_dung: {
                so_ngay_ap_dung: state.so_ngay_ap_dung
            }
        };

        var so_click_tren_view = parseInt(state.so_click_tren_view);

        if (so_click_tren_view > 0) {
            servicePriceContent.so_luong_don_vi_ap_dung.so_click_tren_view = so_click_tren_view
        }

        return servicePriceContent;
    }

    CreateServicePrice() {
        var servicePriceContent = this.GetModelStateJson();

        var $this = this;
        Request.post(UrlApi.ServicePrice)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(servicePriceContent)
            .end(function (err, res) {
                $this.props.closeCreatorUpdaterPopup();
                $this.props.resetContentState();
            });
    }

    EditServicePrice() {
        var servicePriceContent = this.GetModelStateJson();

        var url = UrlApi.ServicePrice + "/" + this.props.editContents._id;
        var $this = this;
        Request.put(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(servicePriceContent)
            .end(function (err, res) {
                $this.props.closeCreatorUpdaterPopup();
                $this.props.resetContentState();
            });
    }

    handleSubmit() {

        if (this.props.modeAction === "create") {
            this.CreateServicePrice();
        }
        else {
            this.EditServicePrice();
        }
    }

    render() {
        var titleForm = this.props.modeAction === "create" ? "Tạo giá dịch vụ" : "Chỉnh sửa giá dịch vụ";
        return (
            <div className='popup'>
                <ServicePriceCreatorUpdaterForm
                    titleForm={titleForm}
                    stateValues={this.state}
                    handleClosePopup={this.props.closeCreatorUpdaterPopup}
                    handleSubmit={this.handleSubmit.bind(this)}
                    UpdateState={this.handleUpdateState.bind(this)}
                />
            </div>
        );
    }
}

var servicePriceInputs = {
    loai_gia: {
        values: ["CPD", "CPC", "CPM"],
        keys: ["CPD", "CPC", "CPM"]
    },
    co_thoi_diem_ket_thuc: {
        values: ["Có", "Không"],
        keys: [1, 0]
    }
};

export default ServicePriceCreatorUpdater;