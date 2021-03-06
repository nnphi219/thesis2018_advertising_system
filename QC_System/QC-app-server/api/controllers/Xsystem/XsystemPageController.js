'use strict';

var mongoose = require('mongoose'),
    XsystemPage = mongoose.model('xsystem_pages');

function GetAddedAdsAreas(adsAreas, next) {
    if (adsAreas) {
        var array_adsAreaIds = adsAreas.ma_vung;
        var array_adsAreaNames = adsAreas.ten_vung;
        var array_adsAreaAdsTypes = adsAreas.loai_quang_cao;

        if (typeof (array_adsAreaIds) == 'string') {
            array_adsAreaIds = [adsAreas.ma_vung];
            array_adsAreaNames = [adsAreas.ten_vung];
            array_adsAreaAdsTypes = [adsAreas.loai_quang_cao];
        }

        var arrayJsonAdsAreas = [];

        array_adsAreaIds.forEach((id, index) => {
            arrayJsonAdsAreas.push({
                ma_vung: id,
                ten_vung: array_adsAreaNames[index],
                loai_quang_cao: array_adsAreaAdsTypes[index]
            });
        });

        next(arrayJsonAdsAreas);
    }
    else{
        next([]);
    }


};

exports.list_all_xsystem_pages = function (req, res) {
    let creator = req.user.username;
    let conditionFilter = {
        nguoi_tao: creator
    };
 
    XsystemPage.find(conditionFilter, function (err, pages) {
        if (err)
            res.send(err);
        res.json(pages);
    });
};

exports.read_a_xsystem_page_by_pageId = (req, res) => {
    let creator = req.user.username;
    let pageId = req.params.pageId;
    let conditionFilter = {
        nguoi_tao: creator,
        ma_trang_quang_cao: pageId
    };

    XsystemPage.findOne(conditionFilter, function (err, xSystemPage) {
        if (err)
            res.send(err);
        res.json(xSystemPage);
    });
};

exports.list_all_xsystem_pages_for_qc = function (req, res) {
    XsystemPage.find({}, function (err, pages) {
        if (err)
            res.send(err);

        var pages_for_qc = pages.map((page) => {
            return {
                ma_trang_quang_cao: page.ma_trang_quang_cao,
                ten_trang_quang_cao: page.ten_trang_quang_cao,
                vung_quang_cao: page.vung_quang_cao
            }
        });

        res.json(pages_for_qc);
    });
};

exports.create_a_xsystem_page = function (req, res) {
    var content = req.body;
    let creator = req.user.username;

    GetAddedAdsAreas(content.vung_quang_cao, function (arrayJsonAdsArea) {
        content.vung_quang_cao = arrayJsonAdsArea;

        var new_page = new XsystemPage(content);
        new_page.nguoi_tao = creator;
        new_page.save(function (err, page) {
            if (err)
                res.send(err);
            res.json(page);
        });
    });
};

exports.read_a_xsystem_page = function (req, res) {
    XsystemPage.findById(req.params.pageId, function (err, page) {
        if (err)
            res.send(err);
        res.json(page);
    });
};

exports.read_a_xsystem_page_by_pageId = function (req, res) {
    var username = req.user.username;
    XsystemPage.findOne({ ma_trang_quang_cao: req.params.pageId, nguoi_tao: username }, function (err, page) {
        if (err)
            res.send(err);
        res.json(page);
    });
};

exports.update_a_xsystem_page = function (req, res) {
    var content = req.body;
    
    GetAddedAdsAreas(content.vung_quang_cao, function (arrayJsonAdsArea) {
        content.vung_quang_cao = arrayJsonAdsArea;

        XsystemPage.findOneAndUpdate({ _id: req.params.pageId }, content, { new: true }, function (err, page) {
            if (err)
                res.send(err);
            res.json(page);
        });
    });


};

exports.delete_a_xsystem_page = function (req, res) {
    XsystemPage.remove({
        _id: req.params.pageId
    }, function (err, page) {
        if (err)
            res.send(err);
        res.json({ message: 'page successfully deleted' });
    });
};