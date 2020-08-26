var t = 0;

Page({
    data: {
        bookList: [],
        returnBooks: [],
        checkStyle: "icon"
    },
    onShow: function() {
        var t = this, o = getApp().globalData.userInfo;
        wx.request({
            url: getApp().globalData.url + "/BookManagement/restBook",
            data: {
                userid: o.nickName
            },
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(o) {
                var e = o.data;
                console.log(e);
                for (var a = 0; a < e.length; a++) e[a].checkStyle = "icon", console.log("第" + a + "本书" + e[a].approval), 
                e[a].approval = parseInt(e[a].approval);
                t.setData({
                    bookList: e
                });
            }
        });
    },
    onHide: function() {
        this.setData({
            returnBooks: [],
            checkStyle: "icon"
        }), t = 0;
    },
    changeStatus: function(o) {
        var e = this.data, a = e.bookList, c = e.returnBooks, n = o.target.dataset.index, s = o.target.dataset.item;
        a[n].checkStyle = "icon" == s.checkStyle ? "icon-active" : "icon", "icon" == s.checkStyle ? (t++, 
        c.push(s)) : (t--, c.forEach(function(t, o) {
            t.isbncode == s.isbncode && c.splice(o, 1);
        })), t == a.length ? this.setData({
            checkStyle: "icon-active"
        }) : this.setData({
            checkStyle: "icon"
        }), this.setData({
            bookList: a,
            returnBooks: c
        });
    },
    allCheck: function() {
        var t = this, o = this.data, e = o.checkStyle, a = o.bookList, c = o.returnBooks;
        this.setData({
            checkStyle: "icon" == e ? "icon-active" : "icon"
        }, function() {
            a.forEach(function(o, e) {
                "icon" == t.data.checkStyle ? (o.checkStyle = "icon", c = []) : (o.checkStyle = "icon-active", 
                c[e] = o);
            }), t.setData({
                bookList: a,
                returnBooks: c
            });
        });
    },
    giveBack: function() {
        for (var t = this.data, o = t.bookList, e = t.returnBooks, a = this, c = [], n = [], s = 0; s < e.length; s++) n[s] = e[s].isbncode;
        console.log(n), wx.request({
            url: getApp().globalData.url + "/BookManagement/returnBook",
            data: {
                param: n
            },
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                if (console.log(t.data), t.data.success) {
                    wx.showToast({
                        title: "待审核",
                        icon: "success",
                        duration: 2e3
                    }), a.onShow(), o.forEach(function(t, o) {
                        "icon-active" == t.checkStyle && c.push(o);
                    });
                    var e = 0;
                    c.forEach(function(t) {
                        o.splice(t - e, 1), e++;
                    }), a.setData({
                        bookList: o,
                        returnBooks: []
                    });
                } else wx.showToast({
                    title: "还书失败",
                    icon: "success",
                    duration: 2e3
                });
            }
        });
    }
});