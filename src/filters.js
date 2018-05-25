exports.tagSplit = (val) => {
    if(val){
        if(/,/g.test(val)){
            var tagArr=val.split(','), res='';
            tagArr.forEach(function(v){
                res+=spanWarp(v);
            })
            return res;
        }else{
            return spanWarp(val);
        }
    }else{
        return '';
    }
    
    function spanWarp(v){
        return '<span>'+v+'</span>'
    }
}

exports.timeSplit = (val) => {
    if(!val) return val || '';
    return val.split(' ')[0];
}

exports.requestStatus = (val) => {
    var res='';
    var color='';
    switch(val*1){
        case 1:
            res='未处理';
            color='text-highGray';
            break;
        case 2: 
            res='已接受';
            color='text-green';            
            break;
        case 3:
            res='已拒绝';
            color='text-hotRed';            
            break;
    }
    return '<span class="'+color+'">'+res+'</span>';
}

exports.noPhoto = (val) => {
    if(val){
        return 'background-image:url('+val+');';
    }
    return '';
}