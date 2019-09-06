import i18n from '../../i18n/i18n';
const vfilter = {
    setSub: function (a) {
        if(a[1]){
            let b = a[0] - a[1];
            let c = (b / a[1] *100).toFixed(2);
            return c+'%';
        }else {
            return ''
        }
    },
    setSub1: function (a) {
        if(a[1]){
            var r1,r2,m,n;
            try{r1=a[0].toString().split(".")[1].length}catch(e){r1=0}
            try{r2=a[1].toString().split(".")[1].length}catch(e){r2=0}
            m=Math.pow(10,Math.max(r1,r2));
            //动态控制精度长度
            n=(r1=r2)?r1:r2;
            return ((a[0]*m-a[1]*m)/m).toFixed(n);

        }else {
            return '';
        }
    },
    getName: function (name) {
        return (name.split('_'))[0];
    },
    sq: function (val) {
        return val?val:'未授权'
    },
    getType(type){
        let s ;
        switch (type) {
            case 1:s = i18n.t('message.sedan');
                break;
            case 2:s = i18n.t('message.vans');
                break;
            case 3:s = i18n.t('message.trailer');
                break;
            case 4:s = i18n.t('message.headstock');
                break;
            case 5:s = i18n.t('message.truck')
        }
        return s
    },
    //是否报废
    scrap(val){
        if(val == -2){
            return i18n.t('message.noscrapping')
        }else {
            return i18n.t('message.scrapping')
        }
    },
    getStatus(status){
        let s ;
        switch (status) {
            case 0:s = i18n.t('message.inactivated');
                break;
            case 1:s = i18n.t('message.online');
                break;
            case -1:s = i18n.t('message.offline');
                break;
            case -2 : s = i18n.t('message.scrapping');
                break;
            default: s = ''
        }
        return s
    },
    getTow(nb){
        return nb.toFixed(2)
    },
    formatDate(now)   {
        if(now && now!=0){
            let tiem = new Date(now*1000);
            var   year=tiem.getFullYear();
            var   month=tiem.getMonth()+1;
            var   date=tiem.getDate();
            var   hour=tiem.getHours();
            var   minute=tiem.getMinutes();
            var   second=tiem.getSeconds();
            return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;
        }else {
            return ''
        }

    },
    getIntDate(int){
        if(int && int > 0){
            let year = parseInt(int / 10000) > 9 ? '20' + parseInt(int / 10000) : '200' + parseInt(int / 10000);
            let month = parseInt(int % 10000 / 100) > 9 ? parseInt(int % 10000 / 100) : '0' + parseInt(int % 10000 / 100);
            let date = parseInt(int % 100 / 1) > 9 ? parseInt(int % 100 / 1) : '0' + parseInt(int % 100 / 1);
            return year+'-'+month+'-'+date
        }else {
            return ''
        }
    },
    getIntDate2(int){
        if(int && int > 0){
            let year = parseInt(int / 10000)
            let month = parseInt(int % 10000 / 100) > 9 ? parseInt(int % 10000 / 100) : '0' + parseInt(int % 10000 / 100);
            let date = parseInt(int % 100 / 1) > 9 ? parseInt(int % 100 / 1) : '0' + parseInt(int % 100 / 1);
            return year+'-'+month+'-'+date
        }else {
            return ''
        }
    },
    getIntTime2(int){
        if(int){
            let hour = parseInt(int % 1000000 / 10000) > 9 ? parseInt(int % 1000000 / 10000) : '0' + parseInt(int % 1000000 / 10000);
            let min = parseInt(int % 10000 / 100) > 9 ? parseInt(int % 10000 / 100) : '0' + parseInt(int % 10000 / 100);
            let sec = parseInt(int % 100) > 9 ? parseInt(int % 100) : '0' + parseInt(int % 100)
            return hour + ':' + min + ':' + sec
        }else {
            return ''
        }
    },
    getIntTime(int){
        if(int){
            let year = parseInt(int / 10000000000) > 9 ? '20' + parseInt(int / 10000000000) : '200' + parseInt(int / 10000000000);
            let month = parseInt(int % 10000000000 / 100000000) > 9 ? parseInt(int % 10000000000 / 100000000) : '0' + parseInt(int % 10000000000 / 100000000);
            let date = parseInt(int % 100000000 / 1000000) > 9 ? parseInt(int % 100000000 / 1000000) : '0' + parseInt(int % 100000000 / 1000000);
            let hour = parseInt(int % 1000000 / 10000) > 9 ? parseInt(int % 1000000 / 10000) : '0' + parseInt(int % 1000000 / 10000);
            let min = parseInt(int % 10000 / 100) > 9 ? parseInt(int % 10000 / 100) : '0' + parseInt(int % 10000 / 100);
            let sec = parseInt(int % 100) > 9 ? parseInt(int % 100) : '0' + parseInt(int % 100)
            return year+'-'+month+'-'+date+' '+ hour + ':' + min + ':' + sec
        }else {
            return ''
        }
    },
    getspeed(nb){
        if(nb){
            return nb.toFixed(0)
        }else {
            return nb
        }
    },
    getvol(vol){
        if(vol>3.4){
            return parseInt((vol-3.4)/0.8*100)+'%'
        }else {
            return '0%'
        }
    },
    getnewvol(vol){
        if(vol){
            return Math.floor(vol*10)/10
        }else {
            return vol
        }
    },
    geterrorStat(stat){
        let s ;
        switch (stat) {
            case 0 : s = i18n.t('message.newRecord');
                break;
            case 1 : s = i18n.t('message.notified');
                break;
            case 2 : s = i18n.t('message.processed');
                break;
            case 3 : s = i18n.t('message.allData');
                break;
            case -1 : s = i18n.t('message.invalidRecords');
                break;
        }
        return s
    },
    errStatus(val){
        let s ;
        switch (val) {
            case 0 : s = i18n.t('message.newRecord');
                break;
            case 1 : s = i18n.t('message.notified');
                break;
            case 2 : s = i18n.t('message.processed');
                break;
            case -1 : s = i18n.t('message.invalidRecords');
                break;
        }
        return s
    },
    //报警错误类别
    geterrorType(val){
        let type;
        val = val + ''
        switch (val) {
            case '1':
                type = i18n.t('message.leakRapid');
                break;
            case '2':
                type = i18n.t('message.leakSlowly');
                break;
            case '3':
                type = i18n.t('message.temperatureHigh');
                break;
            case '4':
                type = i18n.t('message.pressureHigh');
                break;
            case '5':
                type = i18n.t('message.pressureLow');
                break;
            case '6':
                type = i18n.t('message.transmitterLoss');
                break;
            case '7':
                type = i18n.t('message.voltageLow');
                break;
            default:
                type = ''
        }
        return type;
    },
    //保留小数点后一位
    getfloorNb(nb){
        if(nb){
           return Math.floor(nb * 100) / 100
        }else {
            return 0;
        }
    },
    secondToDate(second_time) {
        var time = parseInt(second_time) + "秒";
        if( parseInt(second_time )> 60){

            var second = parseInt(second_time) % 60;
            var min = parseInt(second_time / 60);
            time = min + "分" + second + "秒";

            if( min > 60 ){
                min = parseInt(second_time / 60) % 60;
                var hour = parseInt( parseInt(second_time / 60) /60 );
                time = hour + "小时" + min + "分" + second + "秒";
            }
        }
        return time;
    }
};
export default vfilter;
