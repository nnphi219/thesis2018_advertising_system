'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PostCampaignManagementSchema = new Schema({
    ma_bai_dang: String,
    vi_tri_vung_chia_se: Number,
    loai_dich_vu: String, //Lay tu vung quang cao
    loai_quang_cao: String,
    trang_hien_thi: String,
    co_che_hien_thi: String,
    tinh_gia_theo: String,
    url_redirect: String,
    url_image: String,
    vi_tri: {
        tinh: String,
        quan_huyen: String
    },
    khung_gio_hien_thi: [{
        bat_dau: Number,
        ket_thuc: Number
    }],
    ngay_bat_dau: {
        day: Number,
        month: Number,
        year: Number
    },
    ngay_ket_thuc: {
        day: Number,
        month: Number,
        year: Number
    },
    don_gia_dich_vu: Number,
    ma_khuyen_mai: String,
    gia_tri_tang_them: Number,
    tong_cong: Number,
    trang_thai: Number,
    x_admin_username: String,
    x_user_specific_info: String,
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('PostCampaigns', PostCampaignManagementSchema);