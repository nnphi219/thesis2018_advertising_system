import React, { Component } from 'react';
import Request from 'superagent';
import UrlApi from '../share/UrlApi';
import { JsonDateToDate, DateToJsonDate, TransferTimeLogStringToJson, GetDistrictsBasicOnProvince, Transfer_Provice_District_JsonToArray, GetProvinces, TransferTimeLogStringToArrayElement } from '../share/Mapper';
import { RenderInput, RenderSelect, RenderDate } from '../share/InputsRender';
import { KHUNG_GIO } from '../share/constant';
import { ArrayRemoveItem } from '../share/CommonFunction';

const data_tinh_thanh_quan_huyen = require("../../data_sheet/tinh_thanh_quan_huyen.json");

function GetRemainingTimeSlots(array_khung_gio, selectedTimeSlots) {
    return array_khung_gio.filter((timeSlot) =>
        selectedTimeSlots.indexOf(timeSlot) > -1 ? false : true
    );
}

function RenderForm(props) {
    var stateValues = props.stateValues;

    var AdsAreaIdsKeys = [];
    var AdsAreaIdsValues = [];
    var trang_hien_thi = "";
    if (stateValues.AdsAreaIds !== undefined) {
        AdsAreaIdsKeys = stateValues.AdsAreaIds.keys;
        AdsAreaIdsValues = stateValues.AdsAreaIds.values;

        var indexOfAdsAreas = AdsAreaIdsKeys.indexOf(stateValues.loai_dich_vu);

        var adsAreaDetailDescription = [];
        if (indexOfAdsAreas !== -1) {
            trang_hien_thi = stateValues.AdsAreaIds.appliedPageTypeKeys[indexOfAdsAreas].value;

            adsAreaDetailDescription.push(<p key="1" className="margin_zero"> {"Tên dịch vụ: " + stateValues.AdsAreaIds.values[indexOfAdsAreas] + "."}</p>)
            adsAreaDetailDescription.push(<p key="2" className="margin_zero"> {"Loại quảng cáo: " + stateValues.AdsAreaIds.adsTypes[indexOfAdsAreas] + "."}</p>)
        }
    }

    var khung_gio_hien_thi = '2h-4h';
    // var PromotionIdsKeys = stateValues.PromotionIds === undefined ? [] : stateValues.PromotionIds.keys;
    // var PromotionIdsValues = stateValues.PromotionIds === undefined ? [] : stateValues.PromotionIds.values;
    var promotionIdsKeys = [];
    var promotionIdsValues = [];

    var postIdKeys = [];
    var postDetailDescription = "";

    if (stateValues.XSystemPosts !== undefined) {
        postIdKeys = stateValues.XSystemPosts.keys;

        var indexOfPost = postIdKeys.indexOf(stateValues.ma_bai_dang);
        postDetailDescription = "Tiêu đề: " + stateValues.XSystemPosts.titles[indexOfPost];
    }
    var postIdValues = postIdKeys;

    var displayModeDetailDescription = "";

    var selectedTimeSlots = stateValues.selectedTimeSlots;
    var timeSlotTokenFields = selectedTimeSlots.map((timeSlot) => {
        return (
            <div key={timeSlot} className="token">
                <span className="token-label" style={{ maxWidth: "769px" }}>{timeSlot}</span>
                <a name={timeSlot} className="close" tabIndex="-1" onClick={props.OnRemoveTokenField}>×</a>
            </div>
        );
    });
    var remainingTimeSlots = stateValues.remainingTimeSlots.slice();

    var originProvinceCodes = stateValues.originProvinces.codes;
    var originProvinceNames = stateValues.originProvinces.names;

    var districtsOfSelectedProvince = GetDistrictsBasicOnProvince(stateValues.lnt_tinh, stateValues.list_province_district);
    var districtCodes = districtsOfSelectedProvince.codes;
    var districtNames = districtsOfSelectedProvince.names;

    return (
        <div>
            {/* <RenderInput
                nameId={"ma_chien_dich"}
                title={"Mã chiến dịch"}
                type={"text"}
                value={stateValues.ma_chien_dich}
                className={"x_post_campaign--input"}
                OnChangeInput={props.OnChangeInput}
            /> */}
            <div className="post_campaign__info--header">
                Thông tin cơ bản
            </div>
            <div className="post_campaign__info--content">
                <div className="post_campaign__info--content--postid">
                    <div>
                        <label className="fullwidth post_campaign__info--content-title">
                            <p>{"Mã bài đăng"}</p>
                        </label>
                    </div>
                    <div>
                        <div className="float-left">
                            <RenderSelect
                                nameId={"ma_bai_dang"}
                                keys={postIdKeys}
                                values={postIdValues}
                                selectedValue={stateValues.ma_bai_dang}
                                OnChangeSelect={props.OnChangeInput}
                                className={"input--select"}
                            />
                        </div>
                        <div className="float-left post_campaign__info--content-description">
                            {postDetailDescription}
                        </div>
                    </div>
                </div>
                <div className="post_campaign__info--content--adsarea">
                    <label className="fullwidth post_campaign__info--content-title">
                        <p>{"Loại dịch vụ"}</p>
                    </label>
                    <div className="float-left">
                        <div>
                            <RenderSelect
                                nameId={"loai_dich_vu"}
                                keys={AdsAreaIdsKeys}
                                values={AdsAreaIdsValues}
                                selectedValue={stateValues.loai_dich_vu}
                                OnChangeSelect={props.OnChangeInput}
                                className={"input--select"}
                            />
                        </div>
                        <label className="fullwidth post_campaign__info--content-title">
                            <p>{"Trang hiển thị"}</p>
                        </label>
                        <RenderInput
                            nameId={"trang_hien_thi"}
                            type={"text"}
                            value={trang_hien_thi}
                            className={"x_post_campaign--input post_campaign__info--displayedpast"}
                            isReadOnly={1}
                            OnChangeInput={props.OnChangeInput}
                        />
                    </div>
                    <div className="float-left post_campaign__info--content-description">
                        {adsAreaDetailDescription}
                    </div>
                </div>
                <div className="post_campaign__info--content--displaymode">
                    <div>
                        <label className="fullwidth post_campaign__info--content-title">
                            <p>{"Cơ chế hiển thị"}</p>
                        </label>
                    </div>
                    <div>
                        <div className="float-left">
                            <RenderSelect
                                nameId={"co_che_hien_thi"}
                                keys={["doc_quyen", "co_dinh_vi_tri", "chia_se_co_dinh", "ngau_nhien"]}
                                values={["Độc quyền", "Cố định vị trí", "Chia sẻ cố định", "Ngẫu nhiên"]}
                                selectedValue={stateValues.co_che_hien_thi}
                                OnChangeSelect={props.OnChangeInput}
                                className={"input--select"}
                            />
                        </div>
                        <div className="float-left post_campaign__info--content-description">
                            {displayModeDetailDescription}
                        </div>
                    </div>
                </div>
            </div>

            <div className="post_campaign__info--header">
                Cơ chế áp dụng
            </div>
            <div className="post_campaign__info--content">
                <RenderSelect
                    nameId={"tinh_gia_theo"}
                    title={"Tính giá theo"}
                    keys={["ngay", "click", "view"]}
                    values={["Ngày", "Click", "View"]}
                    selectedValue={stateValues.tinh_gia_theo}
                    OnChangeSelect={props.OnChangeInput}
                    className={"input--select"}
                />

                <div key="khung_gio_hien_thi" className="div_property_margin_bottom">
                    <div>
                        <label className="fullwidth">
                            {"Khung giờ hiển thị"}
                        </label>
                    </div>
                    <div>
                        <div className="float-left timeslot_margin_right">
                            <RenderSelect
                                nameId={"time_slot"}
                                keys={remainingTimeSlots}
                                values={remainingTimeSlots}
                                selectedValue={stateValues.time_slot}
                                OnChangeSelect={props.OnChangeInput}
                                className={"pricefactor--select"}
                            />
                        </div>
                        {
                            stateValues.allowAddTimeSlot ?
                                <div className="float-left timeslot_margin_right">
                                    <button type="button" className="btn timeslot_button" onClick={props.OnAddTokenField}>Thêm</button>
                                </div>
                                : null
                        }
                        <div className="float-left pricefactor_tokenfield tokenfield div_property_margin_bottom">
                            {timeSlotTokenFields}
                        </div>
                    </div>
                </div>

                <RenderSelect
                    nameId={"lnt_tinh"}
                    title={"Tỉnh thành"}
                    keys={originProvinceCodes}
                    values={originProvinceNames}
                    selectedValue={stateValues.lnt_tinh}
                    OnChangeSelect={props.OnChangeInput}
                    className={"input--select"}
                />

                {
                    districtCodes.length === 0 ? null
                        :
                        <RenderSelect
                            nameId={"lnt_quan_huyen"}
                            title={"Quận huyện"}
                            keys={districtCodes}
                            values={districtNames}
                            selectedValue={stateValues.lnt_quan_huyen}
                            OnChangeSelect={props.OnChangeInput}
                            className={"input--select"}
                        />
                }

                <RenderDate
                    nameId={"ngay_bat_dau"}
                    title={"Ngày bắt đầu chiến dịch"}
                    className={"input--date"}
                    value={stateValues.ngay_bat_dau}
                    OnchangeDate={props.OnchangeStartDate}
                />

                <RenderInput
                    nameId={"thoi_luong_ap_dung"}
                    title={"Thời lượng áp dụng"}
                    value={stateValues.thoi_luong_ap_dung}
                    type={"number"}
                    className={"x_post_campaign--input"}
                    OnChangeInput={props.OnChangeInput}
                    isReadOnly={1}
                />

                <RenderDate
                    nameId={"end_date"}
                    title={"Ngày kết thúc chiến dịch"}
                    className={"input--date"}
                    value={stateValues.ngay_ket_thuc}
                    OnchangeDate={props.OnchangeEndDate}
                />
            </div>

            <div className="post_campaign__info--header">
                Thành tiền
            </div>
            <div className="post_campaign__info--content">
                <RenderInput
                    nameId={"don_gia_co_ban"}
                    title={"Đơn giá cơ bản trên mỗi khung giờ"}
                    value={stateValues.don_gia_co_ban}
                    type={"text"}
                    className={"x_post_campaign--input"}
                    OnChangeInput={props.OnChangeInput}
                    isReadOnly={1}
                />

                <RenderInput
                    nameId={"thanh_tien"}
                    title={"Thành tiền"}
                    value={stateValues.thanh_tien}
                    type={"number"}
                    className={"x_post_campaign--input"}
                    OnChangeInput={props.OnChangeInput}
                    isReadOnly={1}
                />

                <RenderSelect
                    nameId={"ma_khuyen_mai"}
                    title={"Mã khuyến mãi"}
                    keys={promotionIdsKeys}
                    values={promotionIdsValues}
                    selectedValue={stateValues.ma_khuyen_mai}
                    OnChangeSelect={props.OnChangeInput}
                    className={"input--select"}
                />

                <RenderInput
                    nameId={"tong_cong"}
                    title={"Tổng cộng"}
                    value={stateValues.tong_cong}
                    type={"number"}
                    className={"x_post_campaign--input"}
                    OnChangeInput={props.OnChangeInput}
                    isReadOnly={1}
                />
            </div>

        </div>
    );
}

class RenderProperties extends Component {
    render() {
        var props = this.props;
        var stateValues = props.stateValues;

        return (
            <div className="x_post_campaign">
                <div>
                    <h2>{"Tạo chiến dịch tin đăng"}</h2>
                </div>
                <div className="x_post_campaign_body">
                    <RenderForm
                        OnChangeInput={props.OnChangeInput}
                        OnchangeStartDate={props.OnchangeStartDate}
                        OnchangeEndDate={props.OnchangeEndDate}
                        OnAddTokenField={props.OnAddTokenField}
                        OnRemoveTokenField={props.OnRemoveTokenField}

                        stateValues={props.stateValues}
                    />
                    <div className="submit">
                        <button className="btn btn-primary">Save</button>
                        <button className="btn btn-primary">Cancel</button>
                    </div>
                </div>
                {/* <div className="vertical_line" style="height: 45px;"></div> */}

                {/* <div className="right_border">
                    <RenderRightForm
                    />
                </div> */}
            </div>
        );
    }
}

class PostCampaignCreatorUpdaterForm extends Component {
    constructor(props) {
        super(props);

        this.OnChangeInput = this.OnChangeInput.bind(this);
        this.OnchangeStartDate = this.OnchangeStartDate.bind(this);
        this.OnchangeEndDate = this.OnchangeEndDate.bind(this);
        this.OnKeyDown = this.OnKeyDown.bind(this);

        this.OnAddTokenField = this.OnAddTokenField.bind(this);
        this.OnRemoveTokenField = this.OnRemoveTokenField.bind(this);
    }

    OnKeyDown(event) {
        if (event.keyCode === 27) {
            //Do whatever when esc is pressed
            this.props.handleClosePopup();
        }
    }

    OnChangeInput(e) {
        var name = e.target.name;
        var value = e.target.value;
        var jsonState = { [name]: value };

        if (name === "khung_gio_hien_thi") {
            value = TransferTimeLogStringToJson(value);
        }

        if (name === "loai_dich_vu") {
            let stateValues = this.props.stateValues;
            var adsAreaKeys = stateValues.AdsAreaIds.keys;
            var appliedPageTypeKeys = stateValues.AdsAreaIds.appliedPageTypeKeys;
            var indexOfValueInKeys = adsAreaKeys.indexOf(value);

            var appliedPageType = appliedPageTypeKeys[indexOfValueInKeys];
            jsonState.trang_hien_thi = appliedPageType;

            jsonState.co_che_hien_thi = stateValues.co_che_hien_thi;
            jsonState.updateBasicUnitPrice = true;
        }

        if (name === "co_che_hien_thi") {
            let stateValues = this.props.stateValues;

            jsonState.loai_dich_vu = stateValues.loai_dich_vu;
            jsonState.updateBasicUnitPrice = true;
        }

        this.props.UpdateState(jsonState);
    }

    OnchangeStartDate(date) {
        var jsonState = { "ngay_bat_dau": date }
        this.props.UpdateState(jsonState);
        let ngay_ket_thuc = new Date();
        let thoi_luong_ap_dung = this.props.stateValues.thoi_luong_ap_dung;
        ngay_ket_thuc.setDate(this.props.stateValues.ngay_ket_thuc.getDate() + parseInt(thoi_luong_ap_dung, 10));
        this.OnchangeEndDate(ngay_ket_thuc);
    }

    OnchangeEndDate(date) {

        let ngay_bat_dau = this.props.stateValues.ngay_bat_dau;
        let thoi_luong = new Date(date - ngay_bat_dau).getDate();

        if (parseInt(date.getTime() - ngay_bat_dau.getTime(), 10) >= 0) {
            var jsonState = { "ngay_ket_thuc": date, "thoi_luong_ap_dung": thoi_luong };
            this.props.UpdateState(jsonState);
        }

        // this.props.UpdateState({"thoi_luong_ap_dung": new Date(date - ngay_bat_dau).getDate()});
    }

    OnAddTokenField(e) {
        var stateValues = this.props.stateValues;
        var selectedCurrentTimeSlot = stateValues.time_slot;

        if (selectedCurrentTimeSlot === null) {
            e.preventDefault();
            return;
        }

        var selectedTimeSlots = stateValues.selectedTimeSlots.slice();
        var array_khung_gio = stateValues.array_khung_gio.slice();

        var jsonState = {};
        if (selectedCurrentTimeSlot === "all") {
            selectedTimeSlots = ["all"];
            jsonState.allowAddTimeSlot = false;
        }
        else {
            selectedTimeSlots.push(selectedCurrentTimeSlot);
        }

        var remainingTimeSlots = GetRemainingTimeSlots(array_khung_gio, selectedTimeSlots);

        jsonState.selectedTimeSlots = selectedTimeSlots;
        jsonState.remainingTimeSlots = remainingTimeSlots;
        jsonState.time_slot = remainingTimeSlots.length > 0 ? remainingTimeSlots[0] : null;

        this.props.UpdateState(jsonState);
    }

    OnRemoveTokenField(e) {
        var stateValues = this.props.stateValues;
        var removedTimeSlot = e.target.name;
        var selectedTimeSlots = stateValues.selectedTimeSlots.slice();
        var array_khung_gio = stateValues.array_khung_gio.slice();
        var jsonState = {};

        if (removedTimeSlot === "all") {
            jsonState.allowAddTimeSlot = true;
        }

        ArrayRemoveItem(selectedTimeSlots, removedTimeSlot);
        var remainingTimeSlots = GetRemainingTimeSlots(array_khung_gio, selectedTimeSlots);

        jsonState.selectedTimeSlots = selectedTimeSlots;
        jsonState.remainingTimeSlots = remainingTimeSlots;
        jsonState.time_slot = remainingTimeSlots.length > 0 ? remainingTimeSlots[0] : null;

        this.props.UpdateState(jsonState);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.OnKeyDown, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.OnKeyDown, false);
    }

    render() {
        var props = this.props;
        return (
            <RenderProperties
                OnChangeInput={this.OnChangeInput}
                OnchangeStartDate={this.OnchangeStartDate}
                OnchangeEndDate={this.OnchangeEndDate}
                OnAddTokenField={this.OnAddTokenField}
                OnRemoveTokenField={this.OnRemoveTokenField}

                stateValues={props.stateValues}
            />
        );
    }
}

class XPostCampaign extends Component {
    constructor(props) {
        super(props);

        var urlParams = new URLSearchParams(window.location.search);
        var modeAction = urlParams.get('modeAction');
        var XAdminUsername = urlParams.get('AdminUserAuthenticate');
        var USerOfXSysyemAccessToken = urlParams.get('userAccessToken');

        var jsonState = {
            modeAction,
            XAdminUsername,
            USerOfXSysyemAccessToken,
            selectedTimeSlots: [],
            allowAddTimeSlot: true
        };

        this.state = this.SetInitState(jsonState, modeAction);

        this.handleUpdateState = this.handleUpdateState.bind(this);
    }

    componentDidMount() {
        var modeAction = this.state.modeAction;
        var XAdminUsername = this.state.XAdminUsername;
        var USerOfXSysyemAccessToken = this.state.USerOfXSysyemAccessToken;
        var jsonSetInfosOfUser = {};

        var $this = this;
        this.GetInfosByUsernameOfQCSystem(jsonSetInfosOfUser, XAdminUsername, modeAction)
            .then((jsonSetInfosOfUser) => {
                return this.GetPostsOfXsystemByUserToken(jsonSetInfosOfUser, jsonSetInfosOfUser.XsystemUrlApi, USerOfXSysyemAccessToken, modeAction);
            }).then((jsonSetInfosOfUser) => {
                return $this.GetBasicPriceByAreaAndDisplayedMode(jsonSetInfosOfUser, $this.state.co_che_hien_thi, XAdminUsername, USerOfXSysyemAccessToken);
            }).then((jsonSetInfosOfUser) => {
                $this.setState(jsonSetInfosOfUser);
            });
    }

    GetBasicPriceByAreaAndDisplayedMode(jsonState, displayedMode, XAdminUsername, USerOfXSysyemAccessToken) {
        return Request.get(UrlApi.GetServicePriceByAreaIdAndDisplayMode)
            .set('Username', XAdminUsername)
            .set('adsareaId', jsonState.loai_dich_vu)
            .set('displayMode', displayedMode)
            .set('xsystem-auth', USerOfXSysyemAccessToken)
            .then((res) => {
                var servicePrice = res.body;
                if (servicePrice !== undefined && servicePrice !== null) {
                    jsonState.don_gia_co_ban = servicePrice.gia_tri;
                    jsonState.appliedServicePriceId = servicePrice.ma_gia;
                }
                else {
                    jsonState.don_gia_co_ban = 0;
                    jsonState.appliedServicePriceId = null;
                }

                return jsonState;
            });
    }

    CalculatedIntoMoney(jsonState) {
        var stateValues = this.state;

        var appliedServicePriceId = stateValues.appliedServicePriceId;
        var lnt_tinh = stateValues.lnt_tinh;
        var lnt_quan_huyen = stateValues.lnt_quan_huyen;
        var vi_tri = {
            tinh: lnt_tinh,
            quan_huyen: lnt_quan_huyen
        }

        var start_date = DateToJsonDate(stateValues.ngay_bat_dau);
        var end_date = DateToJsonDate(stateValues.ngay_ket_thuc);

        var totalAffectValue = 0;

        var selectedTimeSlots = stateValues.selectedTimeSlots.slice();

        var array_bat_dau = [];
        var array_ket_thuc = [];
        selectedTimeSlots.forEach(timeSlot => {
            TransferTimeLogStringToArrayElement(timeSlot, array_bat_dau, array_ket_thuc)
        });
        var khung_gio = {
            bat_dau: array_bat_dau,
            ket_thuc: array_ket_thuc
        };
    
        var content = {
            selectedTimeSlots: khung_gio,
            vi_tri: vi_tri,
            appliedServicePriceId: appliedServicePriceId,
            start_date: start_date,
            end_date: end_date,
            Username: stateValues.XAdminUsername,
            'xsystem-auth': stateValues.USerOfXSysyemAccessToken
        };

        var $this = this;
        Request.post(UrlApi.PriceFactorCalculateTotalAffectValue)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(content)
            .end((err, res) => {
                console.log(res);
            });
    }

    GetAdsAreaInfos(jsonSetInfosOfUser, adsAreas, modeAction) {
        var _ids = [];
        var keys = [];
        var values = [];
        var appliedPageTypeKeys = [];
        var adsTypes = [];

        adsAreas.forEach((adsArea) => {
            _ids.push(adsArea._id);
            keys.push(adsArea.ma_dich_vu);
            values.push(adsArea.ten_hien_thi);
            appliedPageTypeKeys.push(adsArea.loai_trang_ap_dung);
            adsTypes.push(adsArea.loai_quang_cao.value);
        });

        jsonSetInfosOfUser.AdsAreaIds = {
            _ids,
            keys,
            values,
            appliedPageTypeKeys,
            adsTypes
        };

        if (modeAction === "create") {
            jsonSetInfosOfUser.loai_dich_vu = keys[0];
            jsonSetInfosOfUser.trang_hien_thi = appliedPageTypeKeys[0];
        }

        return jsonSetInfosOfUser;
    }

    GetPostsOfXsystemByUserToken(jsonSetInfosOfUser, XsystemUrlApi, USerOfXSysyemAccessToken, modeAction) {
        return Request.get(XsystemUrlApi + "/getPostByUserToken")
            .set('xsystem-auth', USerOfXSysyemAccessToken)
            .then((res) => {
                var _ids = [];
                var keys = [];
                var titles = [];

                var xSystemPosts = res.body;

                xSystemPosts.forEach((xSystemPost) => {
                    _ids.push(xSystemPost._id);
                    keys.push(xSystemPost.ma_bai_dang);
                    titles.push(xSystemPost.tieu_de);
                });

                jsonSetInfosOfUser.XSystemPosts = {
                    _ids,
                    keys,
                    titles
                };

                if (modeAction === "create") {
                    jsonSetInfosOfUser.ma_bai_dang = keys[0];
                }

                return jsonSetInfosOfUser;
            });
    }

    GetInfosByUsernameOfQCSystem(jsonSetInfosOfUser, XAdminUsername, modeAction) {
        return Request.get(UrlApi.GetInfosByUserName)
            .set('Username', XAdminUsername)
            .then((res) => {
                var infos = res.body;
                var user = infos.user;

                jsonSetInfosOfUser.XsystemUrlApi = user.UrlApi;

                jsonSetInfosOfUser = this.GetAdsAreaInfos(jsonSetInfosOfUser, infos.adsAreaInfos, modeAction);

                return jsonSetInfosOfUser;
            });
    }

    GetPromotionIdInfos() {
        var $this = this;
        Request.get(UrlApi.GetPromotionIdInfos)
            .then((res) => {
                var _ids = [];
                var keys = [];
                var values = [];

                res.body.forEach((promotion) => {
                    _ids.push(promotion._id);
                    keys.push(promotion.ma_khuyen_mai);
                    values.push(promotion.mo_ta);
                });

                var jsonPromotionIds = {
                    PromotionIds: {
                        _ids: _ids,
                        keys: keys,
                        values: values
                    },

                };
                if (this.props.modeAction === "create") {
                    jsonPromotionIds.ma_khuyen_mai = keys[0];
                }

                $this.setState(jsonPromotionIds);
            });
    }

    SetInitState(jsonState, modeAction) {
        var array_khung_gio = KHUNG_GIO.slice();

        jsonState.list_province_district = Transfer_Provice_District_JsonToArray(data_tinh_thanh_quan_huyen);
        jsonState.originProvinces = GetProvinces(jsonState.list_province_district);

        jsonState.array_khung_gio = array_khung_gio
        if (modeAction === "create") {
            jsonState.ma_bai_dang = "";
            // jsonState.loai_dich_vu = "";
            jsonState.co_che_hien_thi = "doc_quyen";

            jsonState.tinh_gia_theo = "ngay";

            jsonState.lnt_tinh = "";
            jsonState.lnt_quan_huyen = "";
            jsonState.time_slot = array_khung_gio[0];

            // jsonState.khung_gio_hien_thi = {
            //     bat_dau: 2,
            //     ket_thuc: 4
            // }
            jsonState.thoi_luong_ap_dung = 1;

            var today = new Date();
            let tomorrow = new Date();
            tomorrow.setDate(today.getDate() + jsonState.thoi_luong_ap_dung);
            jsonState.ngay_bat_dau = (today);
            jsonState.ngay_ket_thuc = (tomorrow);
            jsonState.thanh_tien = 0;
            jsonState.tong_cong = 0;
            jsonState.ma_khuyen_mai = "";

            jsonState.remainingTimeSlots = array_khung_gio;
            jsonState.time_slot = array_khung_gio[0];
        }
        else {
            var editContents = this.props.editContents;

            jsonState.ma_bai_dang = editContents.ma_bai_dang;
            jsonState.ma_khuyen_mai = editContents.ma_khuyen_mai;
            jsonState.co_che_hien_thi = editContents.co_che_hien_thi;
            jsonState.tinh_gia_theo = editContents.tinh_gia_theo;
            jsonState.don_gia_co_ban = editContents.don_gia_co_ban;
            jsonState.thanh_tien = editContents.thanh_tien;
            jsonState.tong_cong = editContents.tong_cong;

            jsonState.start_date = JsonDateToDate(editContents.start_date);
            jsonState.end_date = JsonDateToDate(editContents.end_date);

            var loai_nhan_to = editContents.loai_nhan_to;
            if (loai_nhan_to !== undefined && loai_nhan_to !== null) {
                if (loai_nhan_to.thoi_luong !== undefined && loai_nhan_to.thoi_luong !== null) {
                    jsonState.lnt_thoi_luong = loai_nhan_to.thoi_luong;
                }
                jsonState.khung_gio_hien_thi = loai_nhan_to.khung_gio;
                if (loai_nhan_to.vi_tri !== undefined && loai_nhan_to.vi_tri !== null) {
                    jsonState.lnt_tinh = loai_nhan_to.vi_tri.tinh;
                    jsonState.lnt_quan_huyen = loai_nhan_to.vi_tri.quan_huyen;
                }
            }
        }

        return jsonState;
    }

    handleUpdateState(jsonState) {
        if (jsonState.updateBasicUnitPrice) {
            jsonState.updateBasicUnitPrice = false;
            var $this = this;
            this.GetBasicPriceByAreaAndDisplayedMode(jsonState, jsonState.co_che_hien_thi, this.state.XAdminUsername)
                .then((jsonState) => {
                    $this.setState(jsonState);
                });
        }
        else {
            this.CalculatedIntoMoney(jsonState);
            this.setState(jsonState);
        }
    }

    GetModelStateJson() {
        var state = this.state;

        var startDateJson = DateToJsonDate(state.ngay_bat_dau);
        var endDateJson = DateToJsonDate(state.ngay_ket_thuc);

        var loai_nhan_to = {
            khung_gio: state.khung_gio_hien_thi
        };
        if (state.lnt_thoi_luong !== undefined && state.lnt_thoi_luong !== null && parseInt(state.lnt_thoi_luong, 10) !== 0) {
            loai_nhan_to.thoi_luong = state.lnt_thoi_luong;
        }

        var postCampaignContent = {
            ma_chien_dich: state.ma_chien_dich,
            ma_bai_dang: state.ma_bai_dang,
            loai_dich_vu: state.loai_dich_vu,
            trang_hien_thi: state.trang_hien_thi,
            co_che_hien_thi: state.co_che_hien_thi,
            tinh_gia_theo: state.tinh_gia_theo,
            vi_tri: state.vi_tri,
            khung_gio_hien_thi: state.khung_gio_hien_thi,
            ngay_bat_dau: startDateJson,
            ngay_ket_thuc: endDateJson,
            don_gia_co_ban: state.don_gia_co_ban,
            thanh_tien: state.thanh_tien,
            ma_khuyen_mai: state.ma_khuyen_mai,
            tong_cong: state.tong_cong,
            dang_kich_hoat: 1
        };

        if (state.lnt_tinh !== undefined && state.lnt_tinh !== null && state.lnt_tinh !== "") {
            var vi_tri = {};
            vi_tri.tinh = state.lnt_tinh;
            if (state.lnt_quan_huyen !== undefined && state.lnt_quan_huyen !== null && state.lnt_quan_huyen !== "") {
                vi_tri.quan_huyen = state.lnt_quan_huyen;
            }

            postCampaignContent["vi_tri"] = vi_tri;
        }

        return postCampaignContent;
    }

    CreatePostCampaign() {
        var postCampaignContent = this.GetModelStateJson();

        var $this = this;
        Request.post(UrlApi.PostCampaignManagement)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(postCampaignContent)
            .end(function (err, res) {
                $this.props.closeCreatorUpdaterPopup();
                $this.props.resetContentState();
            });
    }

    EditPostCampaign() {
        var postCampaignContent = this.GetModelStateJson();

        var url = UrlApi.PostCampaignManagement + "/" + this.props.editContents._id;
        var $this = this;
        Request.put(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(postCampaignContent)
            .end(function (err, res) {
                $this.props.closeCreatorUpdaterPopup();
                $this.props.resetContentState();
            });
    }

    handleSubmit() {
        if (this.props.modeAction === "create") {
            this.CreatePostCampaign();
        }
        else {
            this.EditPostCampaign();
        }
    }

    render() {
        return (
            <PostCampaignCreatorUpdaterForm
                stateValues={this.state}

                UpdateState={this.handleUpdateState}
            />
        );
    }
}

export default XPostCampaign;