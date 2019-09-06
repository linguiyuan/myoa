import zhLocale from 'element-ui/lib/locale/lang/zh-CN' //引入element语言包
const cn = {
    message: {
        syName:'智能轮胎管理系统',
        ms:'管理系统',
        remember:'记住密码',
        add:'添加',
        revise:'修改',
        delete:'删除',
        index:'索引',
        vpc:'车牌',
        vm:'车型',
        vin:'车架',
        driver:'司机',
        phone:'电话',
        deviceCode:'设备号',
        fleetName:'车队',
        receiverId:'接收器ID',
        status:'状态',
        authenticationCode:'鉴权码',
        totalKm:'总公里(km)',
        totalDays:'总天数',
        latestTime:'最后通讯时间',
        details:'详情',
        preserve:'保存 ',
        date:'日期选择',
        all:'全部',
        leakRapid:'急漏气',
        leakSlowly:'慢漏气',
        temperatureHigh:'温度高',
        pressureHigh:'气压高',
        pressureLow:'气压低',
        transmitterLoss:'发射器失联',
        voltageLow:'发射器电池电压低',
        alarmType:'报警类别',
        sensorId:'传感器id',
        voltage:'电压',
        pressure:'气压',
        temperature:'温度',
        alarmGps:'报警定位',
        sedan:'小车',
        vans:'大车',
        trailer:'挂车',
        headstock:'车头',
        truck:'整车',
        online:'在线',
        offline:'离线',
        inactivated:'未激活',
        confirm:'确认',
        cancel:'取消',
        reset:'重置',
        scrapping:'作废',
        noscrapping:'不作废',
        allData:'全部数据',
        newRecord:'新纪录',
        notified:'已通知',
        processed:'已处理',
        invalidRecords:'无效报警记录(如重复报警)',
        tips:'提示',
        tipsText1:'此操作将删除该车辆, 是否继续?',
        tipsText2:'此操作将删除该小组所有信息, 是否继续?',
        modelTips:'请选择车型',
        success:'成功',
        pAddteam:'请输入车队名',
        addTeam:'添加车队',
        search:'搜索',
        replace:'更换设备',
        replace1:'更换设备',
        replace2:'请输入新的设备号',
        replace3:'更换的日期时间',
        reason:"原因",
        scrapChange:'设备报废更改',
        scrapChange1:'报废更改的日期时间',
        operate:'操作',
        manage:'管理',
        server:'服务器ip',
        newServer:'新服务器ip',
        serverPort:'服务器端口',
        newServerport:'新服务器端口',
        tpdi:'轮胎压力传递间隔(秒)',
        gpsti:'轮胎压力传递间隔（秒）',
        hardwareNb:'硬件版本号',
        softwareNb:'软件版本号',
        projectCode:'项目代码',
        brack:'返回',
        electricity:'电量',
        time:'时间',
        kmtime:'公里/小时',
        location:'定位',
        speed:'速度',
        vehicleMileage:'车辆总里程',
        receiverMileage:'接收器总里程',
        mileage:'里程',
        wheelPosition:'轮位',
        brand:'品牌',
        model:'型号',
        tireCode:'胎号',
        installer:'安装人员',
        installerTime:'安装人员',
        treadDepth:'花纹深度',
        devinfoTips:'此操作将删除轮胎数据,是否继续?',
        cardid:'卡号',



        loginPage:{
            userName: '用户名',
            passWord: '密码',
            login:'登录',
            inputTip1:'请输入用户名',
            inputTip2:'请输入密码'
        },
        sidebar:{
            fleets:'车队与车辆',
            devices:'设备列表',
            tiresManage:'轮胎管理',
            brand:'品牌规格',
            tiresList:'轮胎列表',
            generalStatistics:'综合统计',
            kilometers1:"里程统计(图)",
            kilometers2:"里程统计(表)",
            alarmsStatistics:'报警统计(表)',
            abnormal:"异常统计",
            alarmsManagement:"报警管理",
            accountsManagement:"账号管理",
            systemSetting:"系统管理",
            companyManagement:"公司管理",
            devicesRegistration:"设备入库",
            devicesAssign:"设备分配",
            clearData:"清除数据",
            devicesCategorychange:"设备类型",
            devicesDiary:"设备日志",
            setserver:'服务器ip',
            remoteUpgrade:'远程升级',
            devinfoTips:'此操作将删除该轮位数据, 是否继续?'
        }
    },
    ...zhLocale
}
export default cn;
