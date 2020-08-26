var t = void 0;

Page({
    data: {
        bookname: "",
        isbncode: "",
        author: "",
        Pubcomp: "",
        Pubdate: "",
        bookcode: "",
        menu_cur: 1,
        booklist: [],
        isShowState: !1,
        isShowApproval: !1
    },
    onLoad: function(a) {
        t = this;
    },
    changeMenuAdd: function(a) {
        console.log(a.target.dataset.type), t.setData({
            menu_cur: a.target.dataset.type
        });
    },
    changeMenuState: function(a) {
        console.log(a.target.dataset.type), t.setData({
            menu_cur: a.target.dataset.type
        }), wx.request({
            url: getApp().globalData.url + "/BookManagement/queryBorrowBookState",
            data: {
                success: 0
            },
            header: {
                "content-type": "application/json"
            },
            method: "get",
            success: function(a) {
                a.data && t.setData({
                    isShowState: !0
                }), t.setData({
                    booklist: a.data
                });
            }
        });
    },
    changeMenuApproval: function(a) {
        console.log(a.target.dataset.type), t.setData({
            menu_cur: a.target.dataset.type
        }), wx.request({
            url: getApp().globalData.url + "/BookManagement/bookApproval",
            data: {
                success: 0
            },
            header: {
                "content-type": "application/json"
            },
            method: "get",
            success: function(a) {
                a.data && t.setData({
                    isShowApproval: !0
                }), t.setData({
                    booklist: a.data
                });
            }
        });
    },
    changeMenuExit: function(a) {
        console.log(a.target.dataset.type), console.log(void 0), t.setData({
            menu_cur: a.target.dataset.type
        });
    },
    approvalBook: function(a) {
        a.target.dataset.index;
        var o = a.target.dataset.item;
        console.log(o), wx.request({
            url: getApp().globalData.url + "/BookManagement/approvalBook",
            data: {
                bookname: o.bookname
            },
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                console.log(a.data), a.data.success ? (wx.showToast({
                    title: "审核成功",
                    icon: "success",
                    duration: 2e3
                }), t.onShow()) : wx.showToast({
                    title: "审核失败",
                    icon: "success",
                    duration: 2e3
                });
            }
        });
    },
    formSubmit: function(t) {
        var a = 1, o = this, e = t.detail.value;
        console.log(e);
        for (var n in e) if (!e[n]) {
            a = 0, wx.showToast({
                title: "数据框不能为空",
                icon: "none",
                duration: 500
            });
            break;
        }
        a && wx.request({
            url: getApp().globalData.url + "/BookManagement/restoreBook",
            data: {
                bookname: e.bookname,
                isbncode: e.isbncode,
                author: e.author,
                Pubcomp: e.Pubcomp,
                Pubdate: e.Pubdate,
                bookcode: e.bookcode
            },
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                t.data ? (wx.showToast({
                    title: "添加成功",
                    icon: "success",
                    duration: 500
                }), o.setData({
                    bookname: "",
                    isbncode: "",
                    author: "",
                    Pubcomp: "",
                    Pubdate: "",
                    bookcode: ""
                }), setTimeout(function() {
                    wx.navigateTo({
                        url: getApp().globalData.url + "/BookManagement/restoreBook"
                    });
                }, 2e3)) : wx.showToast({
                    title: "添加失败",
                    icon: "none",
                    duration: 500
                });
            }
        });
    },
    exitBtnOnClick: function() {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    onReady: function() {},
    onShow: function() {
        console.log("lengjucnhegn"), 2 == t.data.menu_cur ? wx.request({
            url: getApp().globalData.url + "/BookManagement/queryBorrowBookState",
            data: {
                success: 0
            },
            header: {
                "content-type": "application/json"
            },
            method: "get",
            success: function(a) {
                if (a.data) {
                    t.setData({
                        isShow: !0
                    });
                    for (var o = 0; o < a.data.length; o++) a.data[o].success = parseInt(a.data[o].success);
                }
                t.setData({
                    booklist: a.data
                }), a.data && t.setData({
                    isShowState: !0
                });
            }
        }) : 3 == t.data.menu_cur && wx.request({
            url: getApp().globalData.url + "/BookManagement/bookApproval",
            data: {
                success: 0
            },
            header: {
                "content-type": "application/json"
            },
            method: "get",
            success: function(a) {
                if (a.data) {
                    t.setData({
                        isShowApproval: !0
                    });
                    for (var o = 0; o < a.data.length; o++) a.data[o].success = parseInt(a.data[o].success);
                }
                t.setData({
                    booklist: a.data
                }), a.data && t.setData({
                    isShow: !0
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});