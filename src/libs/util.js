var widgetStore=require('./widget-store.js');

exports.hasStore = (name) => {
    return widgetStore.hasStore(name);
};

exports.getStore = (name) => {
    return widgetStore.getStore(name);
};

exports.setStore = (name, val) => {
    return widgetStore.setStore(name, val);
};

exports.removeStore = (name) => {
    return widgetStore.removeStore(name);
};

exports.clearStore = () => {
    return widgetStore.clearStore();
};

exports._extend = () => {
    var _arg = arguments;
    if (!_arg.length) return '';
    var _base = _arg[0];
    if (_arg.length > 1)
        for (var i = 1, len = _arg.length; i < len; i++)
            for (var j in _arg[i])
                _base[j] = _arg[i][j];
    return _base;
}

exports._find = (list, keyName, val) => {
    if (!list) {
        return
    }
    var _r = null;
    for (var i = 0, len = list.length; i < len; i++) {
        if (list[i][keyName] == val) {
            _r = list[i];
            break;
        }
    }
    return _r;
}

// exports._sortBy = (list, keyName) => {
//     var i = list.length, j, _cV;
//     while (i > 0) {
//         for (j = 0; j < i - 1; j++) {
//             if (list[j][keyName] > list[j + 1][keyName]) {
//                 _cV = list[j];
//                 list[j] = list[j + 1];
//                 list[j + 1] = _cV;
//             }
//         }
//         i--;
//     }
//     j = _cV = null;
//     return list;
// }


