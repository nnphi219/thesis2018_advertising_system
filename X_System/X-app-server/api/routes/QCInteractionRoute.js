'use strict';
var { authenticateQCSystem } = require('../../middleware/authenticate');
var CommonVariable = require('../../share/CommonVariable');

const _ = require('lodash');
const rp = require('request-promise');

var mongoose = require('mongoose'),
    Post = mongoose.model('Posts');


module.exports = function (app) {
    var postController = require('../controllers/PostController');
    var userController = require('../controllers/UserController');

    app.route('/getPostByUserToken')
        .get(authenticateQCSystem, postController.list_all_posts);

    app.route('/checkXUserauthenticate')
        .get(authenticateQCSystem, (req, res) => {
            let email = req.user.email;

            let resValue = {
                'x_user_specific_info': email
            };

            res.send(resValue);
        });

    app.route('/GetPostsByPostIds')
        .post(postController.get_posts_by_PostIds);

    app.route('/getPostsBasicOnAppliedPage/:appliedPageId')
        .get(async (req, res) => {
            // Get post marketing from QC system
            let appliedPageId = req.params.appliedPageId;

            let postDisplay;
            try {
                postDisplay = await rp({
                    method: 'POST',
                    uri: "http://localhost:8080/GetPostsBasicOnAppliedPageAndXAdminUsername",
                    body: {
                        trang_ap_dung_id: appliedPageId,
                        x_admin_username: CommonVariable.UsernameOnQcSystem,
                        password: CommonVariable.PasswordOnQcSystem
                    },
                    json: true // Automatically parses the JSON string in the response
                });
            } catch (err) {
                console.log("--------------------")
                // console.log(err)
            }
         
            let danh_sach_vung = postDisplay["danh_sach_vung"]

            let resExample = {
                danh_sach_vung: danh_sach_vung
            }
            for (let i in danh_sach_vung) {
                let vung = danh_sach_vung[i]
                if (postDisplay[vung].type === "banner") {
                    resExample[vung] = postDisplay[vung]
                }
                else {
                    let postcampaignsid = postDisplay[vung].postcampaignsid;
                    var posts = new Array();
                    for (i in postcampaignsid) {
                        let post;
                        try {
                            post = await Post.findById(postcampaignsid[i]).exec();
                            posts.push(post);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    resExample[vung] = {
                        type: "tin_rao",
                        content: {
                            posts: posts
                        }
                    }
                }
            }
            res.send(resExample)
        });

    app.route('/getPostsBasicOnAppliedPage_seeddata/:appliedPageId')
        .get((req, res) => {
            let appliedPageId = req.params.appliedPageId;
            let resExample = {};

            if (appliedPageId === 'trang_rao_vat') {
                resExample = {
                    tin_rao_vat: {
                        type: 'tin_rao_vat',
                        contents: {
                            posts: ['bai_dang_1', 'bai_dang_2']
                        }
                    }
                }
            }
            else {
                resExample = {
                    vung_trai_1: {
                        type: 'banner',
                        content: {
                            banner_type: "image",
                            resource_url: "http://localhost:8080/uploads/20180307092548-7fa8.jpg",
                            link_page_url: "http://localhost:8080/uploads/20180307092548-7fa8.jpg"
                        }
                    },
                    vung_trai_2: {
                        type: 'banner',
                        content: {
                            banner_type: "image",
                            resource_url: "http://localhost:8080/uploads/20180424160229-6f91.jpg",
                            link_page_url: "http://localhost:8080/uploads/20180424160229-6f91.jpg"
                        }
                    },
                    vung_phai_1: {
                        type: 'banner',
                        content: {
                            banner_type: "image",
                            resource_url: "http://localhost:8080/uploads/20180426115906-0b71.jpg",
                            link_page_url: "http://localhost:8080/uploads/20180426115906-0b71.jpg"
                        }
                    },
                    vung_tren_cung: {
                        type: 'tin_rao',
                        content: {
                            posts: []
                        }
                    }
                };
            }

            var options = {
                uri: 'http://localhost:8081/marketing',
                json: true // Automatically parses the JSON string in the response
            };

            rp(options)
                .then(function (res) {
                    resExample.vung_tren_cung.content.posts = res
                    res.send(resExample)
                })
                .catch(function (err) {
                    res.send(resExample)
                });

        });


};