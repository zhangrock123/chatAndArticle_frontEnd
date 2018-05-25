module.exports = (function(){
    var widgetStore = function () { };

    widgetStore.prototype = {
        //cookie 操作
        cookie: {
            /**
             * [获取cookie的正则]
             * @param	name	string
            */
            reg: function (name) {
                if (!name) return null;
                return new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            },
            /**
             * [是否含有某个cookie]
             * @param	name	string
            */
            has: function (name) {
                return !!document.cookie.match(this.reg(name));
            },
            /**
             * [获得某个cookie的值]
             * @param	name	string
            */
            get: function (name) {
                var arr;
                if (arr = document.cookie.match(this.reg(name)))
                    return JSON.parse(unescape(arr[2]));
                else
                    return null;
            },
            /**
             * [设置某个cookie的值]
             * @param	name	string
             * @param	value	string/object 
             * @param	path	string
             * @param	days	string
            */
            set: function (name, value, path, days) {
                if (!name) return;
                var Days = days || 30, exp = new Date(), Path = path ? path : '/';
                exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
                if ('object' == typeof (value))
                    value = JSON.stringify(value);
                document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ';path=' + Path;
            },
            /**
             * [删除某个cookie]
             * @param	name	string
            */
            remove: function (name) {
                this.set(name, '', null, '-1');
            },
            /**
             * [清除所有cookie]
            */
            clear: function () {
                var cookieArr = document.cookie.split(';'), cookieName = '';
                for (var i = 0, len = cookieArr.length; i < len; i++) {
                    cookieName = cookieArr[i].split('=')[0];
                    this.remove(cookieName);
                }
            }
        },
        //localStorage 操作
        localStorage: {
            /**
             * [localStorage是否含有某个值]
             * @param	name	string
            */
            has: function (name) {
                return localStorage.hasOwnProperty(name);
            },
            /**
             * [从localStorage中获取某个值]
             * @param	name	string
            */
            get: function (name) {
                return JSON.parse(localStorage.getItem(name));
            },
            /**
             * [设置localStorage的某个值]
             * @param	name	string
             * @param	value	string/object 
            */
            set: function (name, value) {
                if (!name) return;
                localStorage.setItem(name, JSON.stringify(value));
            },
            /**
             * [删除localStorage的某个值]
             * @param	name	string
            */
            remove: function (name) {
                localStorage.removeItem(name);
            },
            /**
             * [清空localStorage]
            */
            clear: function () {
                localStorage.clear();
            }
        },
        /**
         * [cookie或localStorage中是否含有某个值]
         * @param	name	string
        */
        hasStore: function (name) {
            return this.cookie.has(name) || this.localStorage.has(name);
        },
        /**
         * [从cookie或localStorage中获取某个值]
         * @param	name	string
        */
        getStore: function (name) {
            return this.localStorage.get(name) || this.cookie.get(name);
        },
        /**
         * [cookie或localStorage中设置某个值]
         * @param	name	string
         * @param	value	string/object 
         * @param	path	string
         * @param	days	string
        */
        setStore: function (name, value, path, days) {
            this.cookie.set(name, value, path, days);
            this.localStorage.set(name, value);
        },
        /**
         * [cookie或localStorage中删除某个值]
         * @param	name	string
        */
        removeStore: function (name) {
            this.cookie.remove(name);
            this.localStorage.remove(name);
        },
        /**
         * [清空cookie和localStorage]
        */
        clearStore: function () {
            this.cookie.clear();
            this.localStorage.clear();
        }
    };	
	return new widgetStore();
})();