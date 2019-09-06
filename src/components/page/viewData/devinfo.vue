<template>
    <div id="devinfo">
        <i class="el-icon-back brack" @click='brack'>{{$t('message.brack')}}</i>
        <div class="infobox">
            <div class="box_l">
                <div class="textInfo">
                    <p>
                        <span><i class='fontFamily myiconchepai'></i>{{$t('message.fleetName')}}:</span>
                        <em>{{textInfo.team}}</em>
                    </p>
                    <p>
                        <span><i class='fontFamily myiconchepai'></i>{{$t('message.vpc')}}:</span>
                        <em>{{textInfo.plateno}}</em>
                    </p>
                    <p>
                        <span><i class='fontFamily myiconchepai'></i>{{$t('message.vin')}}:</span>
                        <em>{{textInfo.frame}}</em>
                    </p>
                    <p>
                        <span><i class='fontFamily myiconchepai'></i>{{$t('message.driver')}}:</span>
                        <em>{{textInfo.driver}}</em>
                    </p>
                    <p>
                        <span><i class='fontFamily myiconhuabanfuben'></i>{{$t('message.receiverId')}}:</span>
                        <em>{{textInfo.rid}}</em>
                    </p>
                    <p>
                        <span><i class='fontFamily myiconhuabanfuben'></i>{{$t('message.electricity')}}:</span>
                        <em>{{textInfo.vol | getvol}}</em>
                    </p>
                    <p>
                        <span><i class='fontFamily myiconchexing'></i>{{$t('message.vm')}}:</span>
                        <em>{{textInfo.type | getType}}</em>
                    </p>
                    <p>
                        <span><i class='fontFamily myiconshebeizhuangtai'></i>{{$t('message.status')}}:</span>
                        <em>{{textInfo.status | getStatus}}</em>
                    </p>
                    <p>
                        <span><i class='fontFamily myiconshijian'></i>{{$t('message.time')}}:</span>
                        <em>{{textInfo.lt | formatDate}}</em>
                    </p>
                    <p>
                        <span><i class='fontFamily myiconGroup-'></i>{{$t('message.speed')}}:</span>
                        <em>{{textInfo.ll.speed>0?textInfo.ll.speed:0 | getspeed}}{{$t('message.kmtime')}}</em>
                    </p>
                    <p>
                        <span><i class='fontFamily myiconweizhi'></i>{{$t('message.location')}}:</span>
                        <em>{{textInfo.position}}</em>
                    </p>
                    <p>
                        <span><i class='fontFamily myiconguijitu'></i>{{$t('message.vehicleMileage')}}:</span>
                        <em>{{textInfo.vehiclemileage?parseInt(textInfo.vehiclemileage):0}} km</em>
                    </p>
                    <p>
                        <span><i class='fontFamily myiconguijitu'></i>{{$t('message.receiverMileage')}}:</span>
                        <em>{{textInfo.receivermileage?parseInt(textInfo.receivermileage):0}} km</em>
                    </p>
                </div>
                <div class="map">
                    <div class="dateBox">
                        <span style='color: #606266'>{{$t('message.mileage')}}: {{tracksData.km}} km</span>
                        <el-date-picker
                            v-model="myDate"
                            type="date"
                            value-format="timestamp"
                            @change='dateChange'
                            size='mini'
                            :clearable=false
                            :placeholder="$t('message.date')">
                        </el-date-picker>
                    </div>
                    <div id="map"></div>
                    <div class="trackMsg" v-show='tracksData.msgShow'>{{tracksData.msg}}</div>
                </div>
            </div>
            <div class="box_c" v-if='inResize '>
                <div class='carBox1' v-if="textInfo.type == 1">
                    <div class="tirebox">
                        <div :class="['tire',{'active':tires['2']['sn'] == ac?true:false}]"
                             v-show="tires['2']['sn'] == 2" @click="getData(tires['2'])">
                            <span class="snTip">2</span>
                            <span><i class='fontFamily myicondaqiyali'></i>{{tires['2']['pres']}}<em>Bar</em></span>
                            <span><i class='fontFamily myicontemperature'></i>{{tires['2']['temp']}}<em>℃</em></span>
                            <!--<span><i class='fontFamily myicondianliang'></i>{{tires['2']['vol']}}v</span>-->
                        </div>
                        <div :class="['tire','ti',{'active':tires['1']['sn'] == ac?true:false}]"
                             v-show="tires['1']['sn'] == 1" @click="getData(tires['1'])">
                            <span class="snTip">1</span>
                            <span><i class='fontFamily myicondaqiyali'></i>{{tires['1']['pres']}}<em>Bar</em></span>
                            <span><i class='fontFamily myicontemperature'></i>{{tires['1']['temp']}}<em>℃</em></span>
                            <!--<span><i class='fontFamily myicondianliang'></i>{{tires['1']['vol']}}v</span>-->
                        </div>
                    </div>
                    <div class="tirebox">
                        <div :class="['tire',{'active':tires['4']['sn'] == ac?true:false}]"
                             v-show="tires['4']['sn'] == 4" @click="getData(tires['4'])">
                            <span class="snTip">4</span>
                            <span><i class='fontFamily myicondaqiyali'></i>{{tires['4']['pres']}}<em>Bar</em></span>
                            <span><i class='fontFamily myicontemperature'></i>{{tires['4']['temp']}}<em>℃</em></span>
                            <!--<span><i class='fontFamily myicondianliang'></i>{{tires['4']['vol']}}v</span>-->
                        </div>
                        <div :class="['tire1',{'active':tires['5']['sn'] == ac?true:false}]"
                             v-show="tires['5']['sn'] == 5" @click="getData(tires['5'])">
                            <span class="snTip">5</span>
                            <span><i
                                class='fontFamily myicondaqiyali'></i>{{tires['5']['pres']?tires['5']['pres']:''}}<em>Bar</em></span>
                            <span><i class='fontFamily myicontemperature'></i>{{tires['5']['temp']}}<em>℃</em></span>
                            <!--<span><i class='fontFamily myicondianliang'></i>{{tires['5']['vol']}}v</span>-->
                        </div>
                        <div :class="['tire','ti',{'active':tires['3']['sn'] == ac?true:false}]"
                             v-show="tires['3']['sn'] == 3" @click="getData(tires['3'])">
                            <span class="snTip">3</span>
                            <span><i class='fontFamily myicondaqiyali'></i>{{tires['3']['pres']}}<em>Bar</em></span>
                            <span><i class='fontFamily myicontemperature'></i>{{tires['3']['temp']}}<em>℃</em></span>
                            <!--<span><i class='fontFamily myicondianliang'></i>{{tires['3']['vol']}}v</span>-->
                        </div>
                    </div>
                </div>
                <div class="carBox2" v-else-if="textInfo.type == 2 || textInfo.type == 4 ">
                    <div class="tireBox">
                        <div class="tirebox">
                            <div class="tire" v-show='false'></div>
                            <div :class="['tire',{'active':tires['2']['sn'] == ac?true:false}]"
                                 v-show="tires['2']['sn'] == 2" @click="getData(tires['2'])">
                                <span class="snTip">2</span>
                                <span><i class='fontFamily myicondaqiyali'></i>{{tires['2']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['2']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['2']['vol']}}v</span>-->
                            </div>
                        </div>
                        <div class="tirebox">
                            <div :class="['tire',{'active':tires['1']['sn'] == ac?true:false}]"
                                 v-show="tires['1']['sn'] == 1" @click="getData(tires['1'])">
                                <span class="snTip">1</span>
                                <span><i class='fontFamily myicondaqiyali'></i>{{tires['1']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['1']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['1']['vol']}}v</span>-->
                            </div>
                            <div class="tire" v-show='false'></div>
                        </div>
                    </div>
                    <div class="tireBox">
                        <div class="tirebox">
                            <div :class="['tire',{'active':tires['6']['sn'] == ac?true:false}]"
                                 v-show="tires['6']['sn'] == 6" @click="getData(tires['6'])">
                                <span class="snTip">6</span>
                                <span><i class='fontFamily myicondaqiyali'></i>{{tires['6']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['6']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['6']['vol']}}v</span>-->
                            </div>
                            <div class="tire" v-show='false'></div>
                        </div>
                        <div class="tirebox">
                            <div class="tire" v-show='false'></div>
                            <div :class="['tire',{'active':tires['3']['sn'] == ac?true:false}]"
                                 v-show="tires['3']['sn'] == 3" @click="getData(tires['3'])">
                                <span class="snTip">3</span>
                                <span><i class='fontFamily myicondaqiyali'></i>{{tires['3']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['3']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['3']['vol']}}v</span>-->
                            </div>
                        </div>
                    </div>
                    <div class="tireBox">
                        <div class="tirebox">
                            <div :class="['tire',{'active':tires['10']['sn'] == ac?true:false}]"
                                 v-show="tires['10']['sn'] == 10" @click="getData(tires['10'])">
                                <span class="snTip">10</span>
                                <span><i
                                    class='fontFamily myicondaqiyali'></i>{{tires['10']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['10']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['10']['vol']}}v</span>-->
                            </div>
                            <div :class="['tire',{'active':tires['9']['sn'] == ac?true:false}]"
                                 v-show="tires['9']['sn'] == 9" @click="getData(tires['9'])">
                                <span class="snTip">9</span>
                                <span><i class='fontFamily myicondaqiyali'></i>{{tires['9']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['9']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['9']['vol']}}v</span>-->
                            </div>
                        </div>
                        <div class="tirebox">
                            <div :class="['tire',{'active':tires['8']['sn'] == ac?true:false}]"
                                 v-show="tires['8']['sn'] == 8" @click="getData(tires['8'])">
                                <span class="snTip">8</span>
                                <span><i class='fontFamily myicondaqiyali'></i>{{tires['8']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['8']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['8']['vol']}}v</span>-->
                            </div>
                            <div :class="['tire',{'active':tires['7']['sn'] == ac?true:false}]"
                                 v-show="tires['7']['sn'] == 7" @click="getData(tires['7'])">
                                <span class="snTip">7</span>
                                <span><i class='fontFamily myicondaqiyali'></i>{{tires['7']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['7']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['7']['vol']}}v</span>-->
                            </div>
                        </div>
                    </div>
                    <div class="tireBox">
                        <div class="tirebox">
                            <div :class="['tire',{'active':tires['14']['sn'] == ac?true:false}]"
                                 v-show="tires['14']['sn'] == 14" @click="getData(tires['14'])">
                                <span class="snTip">14</span>
                                <span><i
                                    class='fontFamily myicondaqiyali'></i>{{tires['14']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['14']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['14']['vol']}}v</span>-->
                            </div>
                            <div :class="['tire',{'active':tires['13']['sn'] == ac?true:false}]"
                                 v-show="tires['13']['sn'] == 13" @click="getData(tires['13'])">
                                <span class="snTip">13</span>
                                <span><i
                                    class='fontFamily myicondaqiyali'></i>{{tires['13']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['13']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['13']['vol']}}v</span>-->
                            </div>
                        </div>
                        <div class="tire1">
                            <div :class="['tire2',{'active':tires['5']['sn'] == ac?true:false}]"
                                 v-show="tires['5']['sn'] == 5" @click="getData(tires['5'])">
                                <span class="snTip">5</span>
                                <span><i class='fontFamily myicondaqiyali'></i>{{tires['5']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['5']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['5']['vol']}}v</span>-->
                            </div>
                        </div>
                        <div class="tirebox">
                            <div :class="['tire',{'active':tires['12']['sn'] == ac?true:false}]"
                                 v-show="tires['12']['sn'] == 12" @click="getData(tires['12'])">
                                <span class="snTip">12</span>
                                <span><i
                                    class='fontFamily myicondaqiyali'></i>{{tires['12']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['12']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['12']['vol']}}v</span>-->
                            </div>
                            <div :class="['tire',{'active':tires['11']['sn'] == ac?true:false}]"
                                 v-show="tires['11']['sn'] == 11" @click="getData(tires['11'])">
                                <span class="snTip">11</span>
                                <span><i
                                    class='fontFamily myicondaqiyali'></i>{{tires['11']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['11']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['11']['vol']}}v</span>-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carBox3" v-else-if="textInfo.type == 3">
                    <div class="tireBox">
                        <div class="tirebox">
                            <div :class="['tire',{'active':tires['4']['sn'] == ac?true:false},tires['4']['errClass']]"
                                 v-show="tires['4']['sn'] == 4" @click="getData(tires['4'])">
                                <span class="snTip">4</span>
                                <span><i class='fontFamily myicondaqiyali'></i>{{tires['4']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['4']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['4']['vol']}}v</span>-->
                            </div>
                            <div :class="['tire',{'active':tires['3']['sn'] == ac?true:false},tires['3']['errClass']]"
                                 v-show="tires['3']['sn'] == 3" @click="getData(tires['3'])">
                                <span class="snTip">3</span>
                                <span><i class='fontFamily myicondaqiyali'></i>{{tires['3']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['3']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['3']['vol']}}v</span>-->
                            </div>
                        </div>
                        <div class="tirebox">
                            <div :class="['tire',{'active':tires['2']['sn'] == ac?true:false},tires['2']['errClass']]"
                                 v-show="tires['2']['sn'] == 2" @click="getData(tires['2'])">
                                <span class="snTip">2</span>
                                <span><i class='fontFamily myicondaqiyali'></i>{{tires['2']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['2']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['2']['vol']}}v</span>-->
                            </div>
                            <div :class="['tire',{'active':tires['1']['sn'] == ac?true:false},tires['1']['errClass']]"
                                 v-show="tires['1']['sn'] == 1" @click="getData(tires['1'])">
                                <span class="snTip">1</span>
                                <span><i class='fontFamily myicondaqiyali'></i>{{tires['1']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['1']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['1']['vol']}}v</span>-->
                            </div>
                        </div>
                    </div>
                    <div class="tireBox">
                        <div class="tirebox">
                            <div :class="['tire',{'active':tires['8']['sn'] == ac?true:false},tires['8']['errClass']]"
                                 v-show="tires['8']['sn'] == 8" @click="getData(tires['8'])">
                                <span class="snTip">8</span>
                                <span><i class='fontFamily myicondaqiyali'></i>{{tires['8']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['8']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['8']['vol']}}v</span>-->
                            </div>
                            <div :class="['tire',{'active':tires['7']['sn'] == ac?true:false},tires['7']['errClass']]"
                                 v-show="tires['7']['sn'] == 7" @click="getData(tires['7'])">
                                <span class="snTip">7</span>
                                <span><i class='fontFamily myicondaqiyali'></i>{{tires['7']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['7']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['7']['vol']}}v</span>-->
                            </div>
                        </div>
                        <div class="tirebox">
                            <div :class="['tire',{'active':tires['6']['sn'] == ac?true:false},tires['6']['errClass']]"
                                 v-show="tires['6']['sn'] == 6" @click="getData(tires['6'])">
                                <span class="snTip">6</span>
                                <span><i class='fontFamily myicondaqiyali'></i>{{tires['6']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['6']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['6']['vol']}}v</span>-->
                            </div>
                            <div :class="['tire',{'active':tires['5']['sn'] == ac?true:false},tires['5']['errClass']]"
                                 v-show="tires['5']['sn'] == 5" @click="getData(tires['5'])">
                                <span class="snTip">5</span>
                                <span><i class='fontFamily myicondaqiyali'></i>{{tires['5']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['5']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['5']['vol']}}v</span>-->
                            </div>
                        </div>
                    </div>
                    <div class="tireBox">
                        <div class="tirebox">
                            <div :class="['tire',{'active':tires['12']['sn'] == ac?true:false},tires['12']['errClass']]"
                                 v-show="tires['12']['sn'] == 12" @click="getData(tires['12'])">
                                <span class="snTip">12</span>
                                <span><i
                                    class='fontFamily myicondaqiyali'></i>{{tires['12']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['12']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['12']['vol']}}v</span>-->
                            </div>
                            <div :class="['tire',{'active':tires['11']['sn'] == ac?true:false},tires['11']['errClass']]"
                                 v-show="tires['11']['sn'] == 11" @click="getData(tires['11'])">
                                <span class="snTip">11</span>
                                <span><i
                                    class='fontFamily myicondaqiyali'></i>{{tires['11']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['11']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['11']['vol']}}v</span>-->
                            </div>
                        </div>
                        <div class="tire1">
                            <div
                                :class="['tire2',{'active':tires['15']['sn'] == ac?true:false},tires['15']['errClass']]"
                                v-show="tires['15']['sn'] == 15" @click="getData(tires['15'])">
                                <span class="snTip">15</span>
                                <span><i
                                    class='fontFamily myicondaqiyali'></i>{{tires['15']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['15']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['15']['vol']}}v</span>-->
                            </div>
                        </div>
                        <div class="tirebox">
                            <div :class="['tire',{'active':tires['10']['sn'] == ac?true:false},tires['10']['errClass']]"
                                 v-show="tires['10']['sn'] == 10" @click="getData(tires['10'])">
                                <span class="snTip">10</span>
                                <span><i
                                    class='fontFamily myicondaqiyali'></i>{{tires['10']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['10']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['10']['vol']}}v</span>-->
                            </div>
                            <div :class="['tire',{'active':tires['9']['sn'] == ac?true:false},tires['9']['errClass']]"
                                 v-show="tires['9']['sn'] == 9" @click="getData(tires['9'])">
                                <span class="snTip">9</span>
                                <span><i class='fontFamily myicondaqiyali'></i>{{tires['9']['pres']}}<em>Bar</em></span>
                                <span><i
                                    class='fontFamily myicontemperature'></i>{{tires['9']['temp']}}<em>℃</em></span>
                                <!--<span><i class='fontFamily myicondianliang'></i>{{tires['9']['vol']}}v</span>-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carBox4" v-else-if='textInfo.type == 5'>
                    <div class="carBox2">
                        <div class="tireBox">
                            <div class="tirebox">
                                <div class="tire" v-show='false'></div>
                                <div :class="['tire',{'active':tires1['2']['sn'] == ac?true:false}]"
                                     v-show="tires1['2']['sn'] == 2" @click="getData(tires1['2'])">
                                    <span class="snTip">2</span>
                                    <span><i class='fontFamily myicondaqiyali'></i>{{tires1['2']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires1['2']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['2']['vol']}}v</span>-->
                                </div>
                            </div>
                            <div class="tirebox">
                                <div :class="['tire',{'active':tires1['1']['sn'] == ac?true:false}]"
                                     v-show="tires1['1']['sn'] == 1" @click="getData(tires1['1'])">
                                    <span class="snTip">1</span>
                                    <span><i class='fontFamily myicondaqiyali'></i>{{tires1['1']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires1['1']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['1']['vol']}}v</span>-->
                                </div>
                                <div class="tire" v-show='false'></div>
                            </div>
                        </div>
                        <div class="tireBox">
                            <div class="tirebox">
                                <div :class="['tire',{'active':tires1['6']['sn'] == ac?true:false}]"
                                     v-show="tires1['6']['sn'] == 6" @click="getData(tires1['6'])">
                                    <span class="snTip">6</span>
                                    <span><i class='fontFamily myicondaqiyali'></i>{{tires1['6']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires1['6']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['6']['vol']}}v</span>-->
                                </div>
                                <div class="tire" v-show='false'></div>
                            </div>
                            <div class="tirebox">
                                <div class="tire" v-show='false'></div>
                                <div :class="['tire',{'active':tires1['3']['sn'] == ac?true:false}]"
                                     v-show="tires1['3']['sn'] == 3" @click="getData(tires1['3'])">
                                    <span class="snTip">3</span>
                                    <span><i class='fontFamily myicondaqiyali'></i>{{tires1['3']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires1['3']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['3']['vol']}}v</span>-->
                                </div>
                            </div>
                        </div>
                        <div class="tireBox">
                            <div class="tirebox">
                                <div :class="['tire',{'active':tires1['10']['sn'] == ac?true:false}]"
                                     v-show="tires1['10']['sn'] == 10" @click="getData(tires1['10'])">
                                    <span class="snTip">10</span>
                                    <span><i
                                        class='fontFamily myicondaqiyali'></i>{{tires1['10']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires1['10']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['10']['vol']}}v</span>-->
                                </div>
                                <div :class="['tire',{'active':tires1['9']['sn'] == ac?true:false}]"
                                     v-show="tires1['9']['sn'] == 9" @click="getData(tires1['9'])">
                                    <span class="snTip">9</span>
                                    <span><i class='fontFamily myicondaqiyali'></i>{{tires1['9']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires1['9']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['9']['vol']}}v</span>-->
                                </div>
                            </div>
                            <div class="tirebox">
                                <div :class="['tire',{'active':tires1['8']['sn'] == ac?true:false}]"
                                     v-show="tires1['8']['sn'] == 8" @click="getData(tires1['8'])">
                                    <span class="snTip">8</span>
                                    <span><i class='fontFamily myicondaqiyali'></i>{{tires1['8']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires1['8']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['8']['vol']}}v</span>-->
                                </div>
                                <div :class="['tire',{'active':tires1['7']['sn'] == ac?true:false}]"
                                     v-show="tires1['7']['sn'] == 7" @click="getData(tires1['7'])">
                                    <span class="snTip">7</span>
                                    <span><i class='fontFamily myicondaqiyali'></i>{{tires1['7']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires1['7']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['7']['vol']}}v</span>-->
                                </div>
                            </div>
                        </div>
                        <div class="tireBox">
                            <div class="tirebox">
                                <div :class="['tire',{'active':tires1['14']['sn'] == ac?true:false}]"
                                     v-show="tires1['14']['sn'] == 14" @click="getData(tires1['14'])">
                                    <span class="snTip">14</span>
                                    <span><i
                                        class='fontFamily myicondaqiyali'></i>{{tires1['14']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires1['14']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['14']['vol']}}v</span>-->
                                </div>
                                <div :class="['tire',{'active':tires1['13']['sn'] == ac?true:false}]"
                                     v-show="tires1['13']['sn'] == 13" @click="getData(tires1['13'])">
                                    <span class="snTip">13</span>
                                    <span><i
                                        class='fontFamily myicondaqiyali'></i>{{tires1['13']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires1['13']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['13']['vol']}}v</span>-->
                                </div>
                            </div>
                            <div class="tire1">
                                <div :class="['tire2',{'active':tires1['5']['sn'] == ac?true:false}]"
                                     v-show="tires1['5']['sn'] == 5" @click="getData(tires1['5'])">
                                    <span class="snTip">5</span>
                                    <span><i class='fontFamily myicondaqiyali'></i>{{tires1['5']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires1['5']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['5']['vol']}}v</span>-->
                                </div>
                            </div>
                            <div class="tirebox">
                                <div :class="['tire',{'active':tires1['12']['sn'] == ac?true:false}]"
                                     v-show="tires1['12']['sn'] == 12" @click="getData(tires1['12'])">
                                    <span class="snTip">12</span>
                                    <span><i
                                        class='fontFamily myicondaqiyali'></i>{{tires1['12']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires1['12']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['12']['vol']}}v</span>-->
                                </div>
                                <div :class="['tire',{'active':tires1['11']['sn'] == ac?true:false}]"
                                     v-show="tires1['11']['sn'] == 11" @click="getData(tires1['11'])">
                                    <span class="snTip">11</span>
                                    <span><i
                                        class='fontFamily myicondaqiyali'></i>{{tires1['11']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires1['11']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['11']['vol']}}v</span>-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carBox3">
                        <div class="tireBox">
                            <div class="tirebox">
                                <div :class="['tire',{'active':tires2['4']['sn'] == ac?true:false},tires2['4']['errClass']]"
                                     v-show="tires2['4']['sn'] == 4" @click="getData(tires2['4'])">
                                    <span class="snTip">4</span>
                                    <span><i class='fontFamily myicondaqiyali'></i>{{tires2['4']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires2['4']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['4']['vol']}}v</span>-->
                                </div>
                                <div :class="['tire',{'active':tires2['3']['sn'] == ac?true:false},tires2['3']['errClass']]"
                                     v-show="tires2['3']['sn'] == 3" @click="getData(tires2['3'])">
                                    <span class="snTip">3</span>
                                    <span><i class='fontFamily myicondaqiyali'></i>{{tires2['3']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires2['3']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['3']['vol']}}v</span>-->
                                </div>
                            </div>
                            <div class="tirebox">
                                <div :class="['tire',{'active':tires2['2']['sn'] == ac?true:false},tires2['2']['errClass']]"
                                     v-show="tires2['2']['sn'] == 2" @click="getData(tires2['2'])">
                                    <span class="snTip">2</span>
                                    <span><i class='fontFamily myicondaqiyali'></i>{{tires2['2']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires2['2']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['2']['vol']}}v</span>-->
                                </div>
                                <div :class="['tire',{'active':tires2['1']['sn'] == ac?true:false},tires2['1']['errClass']]"
                                     v-show="tires2['1']['sn'] == 1" @click="getData(tires2['1'])">
                                    <span class="snTip">1</span>
                                    <span><i class='fontFamily myicondaqiyali'></i>{{tires2['1']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires2['1']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['1']['vol']}}v</span>-->
                                </div>
                            </div>
                        </div>
                        <div class="tireBox">
                            <div class="tirebox">
                                <div :class="['tire',{'active':tires2['8']['sn'] == ac?true:false},tires2['8']['errClass']]"
                                     v-show="tires2['8']['sn'] == 8" @click="getData(tires2['8'])">
                                    <span class="snTip">8</span>
                                    <span><i class='fontFamily myicondaqiyali'></i>{{tires2['8']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires2['8']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['8']['vol']}}v</span>-->
                                </div>
                                <div :class="['tire',{'active':tires2['7']['sn'] == ac?true:false},tires2['7']['errClass']]"
                                     v-show="tires2['7']['sn'] == 7" @click="getData(tires2['7'])">
                                    <span class="snTip">7</span>
                                    <span><i class='fontFamily myicondaqiyali'></i>{{tires2['7']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires2['7']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['7']['vol']}}v</span>-->
                                </div>
                            </div>
                            <div class="tirebox">
                                <div :class="['tire',{'active':tires2['6']['sn'] == ac?true:false},tires2['6']['errClass']]"
                                     v-show="tires2['6']['sn'] == 6" @click="getData(tires2['6'])">
                                    <span class="snTip">6</span>
                                    <span><i class='fontFamily myicondaqiyali'></i>{{tires2['6']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires2['6']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['6']['vol']}}v</span>-->
                                </div>
                                <div :class="['tire',{'active':tires2['5']['sn'] == ac?true:false},tires2['5']['errClass']]"
                                     v-show="tires2['5']['sn'] == 5" @click="getData(tires2['5'])">
                                    <span class="snTip">5</span>
                                    <span><i class='fontFamily myicondaqiyali'></i>{{tires2['5']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires2['5']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['5']['vol']}}v</span>-->
                                </div>
                            </div>
                        </div>
                        <div class="tireBox">
                            <div class="tirebox">
                                <div :class="['tire',{'active':tires2['12']['sn'] == ac?true:false},tires2['12']['errClass']]"
                                     v-show="tires2['12']['sn'] == 12" @click="getData(tires2['12'])">
                                    <span class="snTip">12</span>
                                    <span><i
                                        class='fontFamily myicondaqiyali'></i>{{tires2['12']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires2['12']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['12']['vol']}}v</span>-->
                                </div>
                                <div :class="['tire',{'active':tires2['11']['sn'] == ac?true:false},tires2['11']['errClass']]"
                                     v-show="tires2['11']['sn'] == 11" @click="getData(tires2['11'])">
                                    <span class="snTip">11</span>
                                    <span><i
                                        class='fontFamily myicondaqiyali'></i>{{tires2['11']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires2['11']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['11']['vol']}}v</span>-->
                                </div>
                            </div>
                            <div class="tire1">
                                <div
                                    :class="['tire2',{'active':tires2['15']['sn'] == ac?true:false},tires2['15']['errClass']]"
                                    v-show="tires2['15']['sn'] == 15" @click="getData(tires2['15'])">
                                    <span class="snTip">15</span>
                                    <span><i
                                        class='fontFamily myicondaqiyali'></i>{{tires2['15']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires2['15']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['15']['vol']}}v</span>-->
                                </div>
                            </div>
                            <div class="tirebox">
                                <div :class="['tire',{'active':tires2['10']['sn'] == ac?true:false},tires2['10']['errClass']]"
                                     v-show="tires2['10']['sn'] == 10" @click="getData(tires2['10'])">
                                    <span class="snTip">10</span>
                                    <span><i
                                        class='fontFamily myicondaqiyali'></i>{{tires2['10']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires2['10']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['10']['vol']}}v</span>-->
                                </div>
                                <div :class="['tire',{'active':tires2['9']['sn'] == ac?true:false},tires2['9']['errClass']]"
                                     v-show="tires2['9']['sn'] == 9" @click="getData(tires2['9'])">
                                    <span class="snTip">9</span>
                                    <span><i class='fontFamily myicondaqiyali'></i>{{tires2['9']['pres']}}<em>Bar</em></span>
                                    <span><i
                                        class='fontFamily myicontemperature'></i>{{tires2['9']['temp']}}<em>℃</em></span>
                                    <!--<span><i class='fontFamily myicondianliang'></i>{{tires['9']['vol']}}v</span>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else></div>
            </div>
            <div class="box_r">
                <div class="tireInfo">
                    <div class="title"><span>{{$t('message.details')}}</span>
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click='reviseInfo'>{{btnTxt}}
                        </el-button>
                    </div>
                    <p>
                        <span>{{$t('message.wheelPosition')}}:</span>
                        <input type="text" :disabled='xg' v-model='tireInfo.sn'>
                    </p>
                    <p>
                        <span>{{$t('message.brand')}}:</span>
                        <el-select
                            v-model="tireInfo.brand"
                            placeholder=""
                            class='selInput'
                            :disabled='xg'
                            @change='brandChange'>
                            <el-option
                                v-for="item in brandlist"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p>
                        <span>{{$t('message.model')}}:</span>
                        <el-select v-model="tireInfo.model" placeholder="" class='selInput' :disabled='xg'>
                            <el-option
                                v-for="item in modellist"
                                :key="item.model"
                                :label="item.model"
                                :value="item.model">
                            </el-option>
                        </el-select>
                    </p>
                    <p>
                        <span>{{$t('message.tireCode')}}:</span>
                        <input type="text" :disabled='hTno' v-model='tireInfo.tno'>
                    </p>
                    <p>
                        <span>{{$t('message.mileage')}}(km):</span>
                        <input type="text" :disabled='xg' v-model='tireInfo.mileage'>
                    </p>
                    <p>
                        <span>{{$t('message.installer')}}:</span>
                        <input type="text" :disabled='xg' v-model='tireInfo.operator'>
                    </p>
                    <div class='tesu'>
                        <span class='sp'>{{$t('message.installerTime')}}:</span>
                        <el-date-picker
                            v-model='tireInfo.operatetime'
                            type="datetime"
                            value-format="timestamp"
                            :placeholder="$t('message.date')">
                        </el-date-picker>
                    </div>
                    <p v-for='(item,index) in tireInfo.depths' :key='index'>
                        <span>{{$t('message.treadDepth')}}{{index+1}}:</span>
                        <input type="text" :disabled='xg' v-model='tireInfo.depths[index]'>
                        <i class='add_ipt' @click='addDepthIpt' v-if='index == 0'>+</i>
                        <i class='add_ipt' @click='dleDepthIpt(index)' v-else>-</i>

                    </p>
                    <p style='display: none;'>{{tireInfo.cardid}}</p>
                </div>
                <el-date-picker
                    v-model="myDate"
                    type="date"
                    value-format="timestamp"
                    @change='dateChange'
                    size='mini'
                    :clearable=false
                    placeholder="选择日期">
                </el-date-picker>
                <div class="line">
                    <div id="lineBox" ref='myChart'></div>
                    <div class="lineTipMsg" v-show='lineTip'>{{lineTipMsg}}</div>
                </div>
            </div>
        </div>
        <div class="ysdataBox" ref='ysdataBox' v-show='ysdatabox'>
            <p class='title'><span>{{$t('message.details')}}</span><i class="el-icon-circle-close" @click='boxClose'></i></p>
            <div class="tagBox">
                <el-tag
                    closable
                    v-for="(tag,index) in ysTires"
                    :key="index"
                    type='warning'
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                    {{$t('message.time')}}:&nbsp;{{tag.t | getIntTime}}<br>{{$t('message.cardid')}}:&nbsp;{{tag.cardid}}<br>{{$t('message.sensorId')}}:&nbsp;{{tag.sid}}<br>{{$t('message.pressure')}}:&nbsp;{{tag.pres}}&nbsp;bar<br>{{$t('message.temperature')}}:&nbsp;{{tag.temp}}&nbsp;℃<br>{{$t('message.voltage')}}:&nbsp;{{tag.vol | getnewvol}}&nbsp;v <br>{{$t('message.mileage')}}:&nbsp;{{tag.mileage}}&nbsp;km
                </el-tag>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'devinfo',
        data() {
            return {
                paramsrid: sessionStorage.getItem('devinfoRid'),
                textInfo: {
                    ll: {
                        t: ''
                    },
                    type: 1,
                    position: '',
                },
                btnTxt: this.$t('message.revise'),
                xg: true,
                hTno:false,
                bdmap: '',//地图实例
                myDate: new Date(),//历史轨迹时间
                tires: {
                    1: {
                        sn: '',
                        pres: '',
                        temp: '',
                        vol: '',
                    },
                    2: {
                        sn: '',
                        pres: '',
                        temp: '',
                        vol: '',
                    },
                    3: {
                        sn: '',
                        pres: '',
                        temp: '',
                        vol: '',
                    },
                    4: {
                        sn: '',
                        pres: '',
                        temp: '',
                        vol: '',
                    },
                    5: {
                        sn: '',
                        pres: '',
                        temp: '',
                        vol: '',
                    },
                    6: {
                        sn: '',
                        pres: '',
                        temp: '',
                        vol: '',
                    },
                    7: {
                        sn: '',
                        pres: '',
                        temp: '',
                        vol: '',
                    },
                    8: {
                        sn: '',
                        pres: '',
                        temp: '',
                        vol: '',
                    },
                    9: {
                        sn: '',
                        pres: '',
                        temp: '',
                        vol: '',
                    },
                    10: {
                        sn: '',
                        pres: '',
                        temp: '',
                        vol: '',
                    },
                    11: {
                        sn: '',
                        pres: '',
                        temp: '',
                        vol: '',
                    },
                    12: {
                        sn: '',
                        pres: '',
                        temp: '',
                        vol: '',
                    },
                    13: {
                        sn: '',
                        pres: '',
                        temp: '',
                        vol: '',
                    },
                    14: {
                        sn: '',
                        pres: '',
                        temp: '',
                        vol: '',
                    },
                    15: {
                        sn: '',
                        pres: '',
                        temp: '',
                        vol: '',
                    },
                },
                tires1:{},
                tires2:{},
                ac: '',
                cardid:'',
                tireInfo: {
                    cardid:'',
                    sn: '',
                    brand:'',
                    model:'',
                    tno:'',
                    mileage: '',
                    operator:'',
                    operatetime:new Date(),
                    depths:['']
                },
                brandlist: [],//品牌
                modellist: [],//规格
                tracksData: {
                    list: [],
                    km: 0,
                    msg: '',
                    msgShow: false,
                },
                lineOptions: {
                    visualMap: [
                        {
                            show: false,
                            type: 'continuous',
                            seriesIndex: 0,
                            min: 0,
                            max: 400
                        },
                        {
                            show: false,
                            type: 'continuous',
                            seriesIndex: 1,
                            dimension: 0,
                            min: 0,
                            max: 400
                        }
                    ],
                    title: {
                        show: 'false'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: [
                        {
                            // name: '时间',
                            data: [],
                            boundaryGap: false
                        },
                        {
                            // name: '时间',
                            data: [],
                            gridIndex: 1,
                            boundaryGap: false
                        }
                    ],
                    yAxis: [
                        {
                            name: this.$t('message.pressure'),
                            nameTextStyle: {
                                fontSize: 10,
                            }
                        },
                        {
                            name: this.$t('message.temperature'),
                            gridIndex: 1,
                            nameTextStyle: {
                                fontSize: 10
                            }
                        }
                    ],
                    dataZoom: [
                        // {
                        //     startValue: '2014-06-01'
                        // },
                        // {
                        //     type: 'slider',
                        //     show:false
                        // },
                        // {
                        //     type: 'slider',
                        //     show:false
                        // }
                    ],
                    grid: [
                        {
                            // width:'100%',
                            height: 90,
                            top: 30,
                            left: 26,
                            tooltip: {
                                textStyle: {
                                    fontSize: 10
                                }
                            }
                        },
                        {
                            // width:'100%',
                            height: 90,
                            bottom: 20,
                            left: 26,
                            tooltip: {
                                textStyle: {
                                    fontSize: 10
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: this.$t('message.pressure'),
                            type: 'line',
                            // showSymbol: false,
                            data: [],
                            lineStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: 'red' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'yellow' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                }
                            },

                        },
                        {
                            name: this.$t('message.temperature'),
                            type: 'line',
                            // showSymbol: false,
                            data: [],
                            lineStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: 'red' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'yellow' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                }
                            },
                            xAxisIndex: 1,
                            yAxisIndex: 1
                        },

                    ]
                },
                lineOption: {
                    visualMap: [
                        {
                            show: false,
                            type: 'continuous',
                            seriesIndex: 0,
                            min: 0,
                            max: 400
                        },
                        {
                            show: false,
                            type: 'continuous',
                            seriesIndex: 1,
                            dimension: 0,
                            min: 0,
                            max: 400
                        }
                    ],
                    title: {
                        show: 'false'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: [
                        {
                            // name: '时间',
                            data: [],
                            boundaryGap: false
                        },
                        {
                            // name: '时间',
                            data: [],
                            gridIndex: 1,
                            boundaryGap: false
                        }
                    ],
                    yAxis: [
                        {
                            name: this.$t('message.pressure'),
                            nameTextStyle: {
                                fontSize: 10,
                            }
                        },
                        {
                            name: this.$t('message.temperature'),
                            gridIndex: 1,
                            nameTextStyle: {
                                fontSize: 10
                            }
                        }
                    ],
                    dataZoom: [
                        // {
                        //     startValue: '2014-06-01'
                        // },
                        // {
                        //     type: 'slider',
                        //     show:false
                        // },
                        // {
                        //     type: 'slider',
                        //     show:false
                        // }
                    ],
                    grid: [
                        {
                            // width:'100%',
                            height: 90,
                            top: 30,
                            left: 26,
                            tooltip: {
                                textStyle: {
                                    fontSize: 10
                                }
                            }
                        },
                        {
                            // width:'100%',
                            height: 90,
                            bottom: 20,
                            left: 26,
                            tooltip: {
                                textStyle: {
                                    fontSize: 10
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: this.$t('message.pressure'),
                            type: 'line',
                            // showSymbol: false,
                            data: [],
                            lineStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: 'red' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'yellow' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                }
                            },

                        },
                        {
                            name: this.$t('message.temperature'),
                            type: 'line',
                            // showSymbol: false,
                            data: [],
                            lineStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: 'red' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'yellow' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                }
                            },
                            xAxisIndex: 1,
                            yAxisIndex: 1
                        },

                    ]
                },
                myPersChart: '',
                lineTipMsg: '',
                lineTip: false,
                tireTiptext: this.$t('message.success'),
                ysData: [],
                ysTires: [],
                x: '',
                y: '',
                ysdatabox: false,
                inResize:true,
                lang:{
                    lat:'',
                    lng:'',
                }
            }
        },
        watch:{
            menuTree(){
                this.inResize= false
                this.$nextTick(()=>{
                    this.inResize = true
                })
            }
        },
        created() {
            // this.paramsrid = this.$route.params.rid
            this.getTextInfo();
            this.getBrandlist()
        },
        mounted() {
            this.setBdMpa();
            this.setTrack(this.myDate);
            this.myPersChart = this.$echarts.init(this.$refs.myChart);
            this.myPersChart.setOption(this.lineOption);
        },
        methods: {
            //获取设备信息
            getTextInfo() {
                let vm = this;
                vm.$axios({
                    method: 'post',
                    url: window.$g_Api + '/api/data/laststatus',
                    data: {
                        receiver: vm.paramsrid
                    }
                })
                    .then(function (res) {
                        vm.textInfo =  {
                            ll: {
                                t: ''
                            },
                            type: 1,
                            position: ''}
                        if (res.data.errcode == 0) {
                            vm.lang = {
                                lat:res.data.ll.lat,
                                lng:res.data.ll.lng,
                            }
                            vm.$axios({
                                method: 'post',
                                url:'http://geo.smartu365.com/api/coder',
                                // url: 'https://bird.ioliu.cn/v1/?url=http://api.map.baidu.com/geocoder/v2/?location=' + res.data.ll.lat + ',' + res.data.ll.lng + '&output=json&pois=0&ak=aGf0sLjv7DOonc61fINdATGez2d3O8xB',
                                data:{
                                    lat:res.data.ll.lat,
                                    lng:res.data.ll.lng,
                                }
                            })
                                .then(function (data) {
                                    vm.textInfo = res.data;
                                    vm.textInfo.position = data['data']['result']['formatted_address'] ? data['data']['result']['formatted_address'] : '';
                                })
                                .catch(function (err) {
                                    vm.textInfo = res.data;
                                    vm.textInfo.position = ''
                                });
                        } else {
                            vm.textInfo = {}
                        }
                        let lp = res.data.lp;
                        vm.ysData = lp;
                        let arr = [];
                        let narr = []
                        for (let i = 0, len = lp.length; i < len; i++) {
                            if (lp[i]['temp'] != 0 || lp[i]['pres'] != 0) {
                                narr.push(lp[i]);
                            } else {
                                continue
                            }
                        }
                        arr = narr;
                        vm.ac = arr[0].sn;
                        vm.getData({
                            sid:arr[0].sid,
                            sn:arr[0].sn,
                            cardid:arr[0].cardid,
                            ng:true
                        })
                        // vm.getlines(vm.ac,vm.myDate)
                        // vm.getTireInfo(arr[0].sid);
                        vm.tires = {
                            1: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            2: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            3: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            4: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            5: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            6: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            7: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            8: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            9: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            10: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            11: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            12: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            13: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            14: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            15: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                        }
                        vm.tires1 = {
                            1: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            2: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            3: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            4: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            5: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            6: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            7: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            8: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            9: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            10: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            11: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            12: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            13: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            14: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            15: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            }
                        };
                        vm.tires2 = {
                            1: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            2: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            3: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            4: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            5: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            6: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            7: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            8: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            9: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            10: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            11: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            12: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            13: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            14: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            },
                            15: {
                                sn: '',
                                pres: '',
                                temp: '',
                                vol: '',
                            }
                        };
                        if(res.data.type == 5){
                            for (let i = 0, len = arr.length; i < len; i++) {
                                arr[i].pres = arr[i].pres.toFixed(1);
                                arr[i].temp = arr[i].temp.toFixed(0);
                                arr[i].vol = arr[i].vol.toFixed(1);
                                arr[i].sid = arr[i].sid ? arr[i].sid : '';
                                if(arr[i].cardid == 0){
                                    vm.tires1[arr[i]['sn'] + ''] = arr[i];
                                }else {
                                    vm.tires2[arr[i]['sn'] + ''] = arr[i];
                                }
                            }
                        }else {
                            for (let i = 0, len = arr.length; i < len; i++) {
                                arr[i].pres = arr[i].pres.toFixed(1);
                                arr[i].temp = arr[i].temp.toFixed(0);
                                arr[i].vol = arr[i].vol.toFixed(1);
                                arr[i].sid = arr[i].sid ? arr[i].sid : '';
                                if(vm.tires[arr[i]['sn'] + ''].sid){
                                    if(vm.tires[arr[i]['sn'] + ''].t<arr[i].t){
                                        vm.tires[arr[i]['sn'] + ''] = arr[i]
                                    }
                                }else {
                                    vm.tires[arr[i]['sn'] + ''] = arr[i];
                                }
                            }
                        }
                    })
                    .catch(function (err) {
                    });
                // vm.inResize  = false;
                // vm.$nextTick(t => {
                //     vm.inResize = true;
                //
                // })
            },
            //设置地图1
            setBdMpa() {
                this.bdmap = new BMap.Map("map");// 创建Map实例
                // vm.bdmap.setMapStyle({style:'dark'})
                this.bdmap.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
                this.bdmap.enableScrollWheelZoom(true);
            },
            getData(obj) {
                this.ac = obj.sn
                this.cardid = obj.cardid
                this.getlines(obj.sn,this.myDate,obj.cardid)
                this.getTireInfo(obj.sid,obj.sn,obj.ng)
            },
            //时间转换
            getNowDate(t) {
                let myDate = new Date(t);
                let y = (myDate.getFullYear() + '').slice(2);
                let m = myDate.getMonth() + 1;
                let d = myDate.getDate();
                m = m < 10 ? '0' + m : m;
                d = d < 10 ? '0' + d : d;
                return y + '' + m + '' + d
            },
            //历史轨迹
            setTrack(date) {
                let vm = this;
                vm.$axios({
                    method: 'post',
                    url: window.$g_Api + '/api/data/track',
                    data: {
                        receiver: sessionStorage.getItem('devinfoRid'),
                        date: vm.getNowDate(date),
                    }
                })
                    .then(function (res) {
                        vm.bdmap.clearOverlays();
                        if (res.data.errcode == 0) {
                            console.log(1111);

                            let tracks = res.data.tracks || false;
                            vm.tracksData = {
                                list: [],
                                km: res['data']['mileage'] ? (res['data']['mileage']).toFixed(2) : '',
                                msg: '',
                                msgShow: false
                            };
                            if (tracks.length == 1) {
                                let myIcon1 = new BMap.Icon('./static/img/zd.png', new BMap.Size(24, 32));
                                let marker1 = new BMap.Marker(new BMap.Point(tracks[0].lng, tracks[0].lat), {icon: myIcon1}); // 创建点
                                vm.bdmap.addOverlay(marker1);
                                vm.bdmap.centerAndZoom(new BMap.Point(tracks[0].lng, tracks[0].lat), 12);
                            } else {
                                let arrlist = []
                                for (let i = 0, len = tracks.length; i < len; i++) {
                                    if (i != 0 && tracks[i]['lng'] == tracks[i - 1]['lng'] && tracks[i]['lat'] == tracks[i - 1]['lat']) {
                                        continue;
                                    } else {
                                        arrlist.push(new BMap.Point(tracks[i]['lng'], tracks[i]['lat']))
                                    }
                                }
                                ;
                                let v = vm.bdmap.getViewport(arrlist);
                                vm.bdmap.centerAndZoom(v.center, v.zoom);

                                function draw_line_direction(weight) {
                                    let icons = new BMap.IconSequence(
                                        new BMap.Symbol('M0 -5 L-5 -2 L0 -4 L5 -2 Z', {
                                            scale: weight / 10,
                                            strokeWeight: 1,
                                            rotation: 0,
                                            fillColor: 'white',
                                            fillOpacity: 1,
                                            strokeColor: 'white'
                                        }), '100%', '3%', false);
                                    return icons;
                                }

                                let polyline = new BMap.Polyline(arrlist, {
                                    enableEditing: false,//是否启用线编辑，默认为false
                                    enableClicking: true,//是否响应点击事件，默认为true
                                    strokeColor: "#0075c7",
                                    strokeWeight: '6',//折线的宽度，以像素为单位
                                    strokeOpacity: 0.9,//折线的透明度，取值范围0 - 1
                                    icons: [draw_line_direction(6)]
                                    // icons: [icons]
                                });   //创建折线
                                let myIcon = new BMap.Icon('./static/img/qd.png', new BMap.Size(24, 32));
                                let myIcon1 = new BMap.Icon('./static/img/zd.png', new BMap.Size(24, 32));
                                let marker = new BMap.Marker(new BMap.Point(arrlist[0].lng, arrlist[0].lat), {icon: myIcon}); // 创建点
                                let marker1 = new BMap.Marker(new BMap.Point(arrlist[arrlist.length - 1].lng, arrlist[arrlist.length - 1].lat), {icon: myIcon1}); // 创建点
                                vm.bdmap.addOverlay(marker);
                                vm.bdmap.addOverlay(marker1);
                                vm.bdmap.addOverlay(polyline);          //增加折线
                            }
                        }else if(res.data.errcode == 1005){
                            let myIcon1 = new BMap.Icon('./static/img/zd.png', new BMap.Size(24, 32));
                            let marker1 = new BMap.Marker(new BMap.Point(vm.lang.lng, vm.lang.lat), {icon: myIcon1}); // 创建点
                            vm.bdmap.addOverlay(marker1);
                            vm.bdmap.centerAndZoom(new BMap.Point(vm.lang.lng, vm.lang.lat), 12);
                        } else {
                            vm.tracksData = {
                                list: [],
                                km: 0,
                                msg: res.data.msg,
                                msgShow: true,
                            }
                        }

                    })
                    .catch(function (err) {
                    });
            },
            //选择日期
            dateChange() {
                this.setTrack(this.myDate);
                this.getlines(this.ac, this.myDate,this.cardid);
            },
            getlines(sn,t,cardid) {
                let vm = this;
                vm.ysTires = [];
                for (let i = 0, len = vm.ysData.length; i < len; i++) {
                    if (vm.ysData[i].sn == sn && vm.textInfo.type == 5 && vm.ysData[i].cardid == cardid) {
                        vm.ysTires.push(vm.ysData[i])
                    } else if(vm.ysData[i].sn == sn && vm.textInfo.type != 5){
                        vm.ysTires.push(vm.ysData[i])
                    }else{
                        continue
                    }
                }
                vm.$axios({
                    method: 'post',
                    url: window.$g_Api + '/api/data/sensordatahistory2',
                    data: {
                        // sensor: sid,
                        receiver: sessionStorage.getItem('devinfoRid'),
                        sn: sn,
                        date: vm.getNowDate(t),
                        cardid:cardid
                    }
                })
                    .then(function (res) {
                        let tyreData = {
                            time: [],
                            temp: [],
                            pres: []
                        };
                        if (res.data.errcode != 0) {
                            [vm.lineOption.xAxis[0].data, vm.lineOption.xAxis[1].data] = [[], []];
                            [vm.lineOption.series[0].data, vm.lineOption.series[1].data] = [[], []];
                            vm.lineTip = true;
                            vm.lineTipMsg = res.data.msg;
                        } else {
                            vm.lineTip = false;
                            let tiresData = res.data.datas;
                            let newtime, temp, pres;
                            for (let i = 0, len = tiresData.length; i < len; i++) {
                                if (tiresData[i].temp != 0 && tiresData[i].pres != 0) {
                                    let hour = parseInt(tiresData[i].time / 10000) > 9 ? parseInt(tiresData[i].time / 10000) : '0' + parseInt(tiresData[i].time / 10000);
                                    let min = parseInt(tiresData[i].time % 10000 / 100) > 9 ? parseInt(tiresData[i].time % 10000 / 100) : '0' + parseInt(tiresData[i].time % 10000 / 100);
                                    let sec = parseInt(tiresData[i].time % 100) > 9 ? parseInt(tiresData[i].time % 100) : '0' + parseInt(tiresData[i].time % 100);
                                    newtime = hour + ':' + min + ':' + sec
                                    tyreData.time.push(newtime);
                                    tyreData.temp.push(tiresData[i].temp);
                                    tyreData.pres.push((tiresData[i].pres).toFixed(1));
                                }
                            }
                            [vm.lineOption.xAxis[0].data, vm.lineOption.xAxis[1].data] = [tyreData.time, tyreData.time];
                            [vm.lineOption.series[0].data, vm.lineOption.series[1].data] = [tyreData.pres, tyreData.temp];
                        }
                        vm.myPersChart.setOption(vm.lineOption)
                    })
                    .catch(function (err) {
                    });
            },
            getTireInfo(sid,sn,ng=false) {
                let vm = this;
                if(vm.textInfo.type == 5){
                    vm.$axios({
                        method:'post',
                        url:window.$g_Api+'/api/mileage/sensor',
                        data:{
                            sid:sid
                        }
                    })
                        .then(function(res){
                            res.data.mileage?vm.ysTires[0].mileage = parseInt(res.data.mileage):vm.ysTires[0].mileage = 0
                        })
                        .catch(function(err){
                            vm.ysTires[0].mileage = 0;
                        });
                }else{
                    for(let i = 0 ,len = vm.ysTires.length ; i < len; i++){
                        vm.$axios({
                            method:'post',
                            url:window.$g_Api+'/api/mileage/sensor',
                            data:{
                                sid:vm.ysTires[i].sid
                            }
                        })
                            .then(function(res){
                                res.data.mileage?vm.ysTires[i].mileage = parseInt(res.data.mileage):vm.ysTires[i].mileage = 0
                            })
                            .catch(function(err){
                                vm.ysTires[i].mileage = 0;
                            });
                    }
                }
                vm.$axios({
                    method: 'post',
                    url: window.$g_Api + '/api/data/tireinfo',
                    data: {
                        sid: sid
                    }
                })
                    .then(function (res) {
                        if(res.data.errcode == 0){
                            if(!res.data.depths || res.data.depths.length<1){
                                res.data.depths = ['']
                            }
                            if(res.data.tno){
                                vm.hTno = true;
                            }else {
                                vm.hTno = false;
                            }
                            if(res.data.operatetime == 0){
                                res.data.operatetime = ''
                            }
                            vm.tireInfo = res.data;
                            vm.tireInfo.mileage = res.data.mileage?parseInt(res.data.mileage):0;
                            console.log(vm.tireInfo);
                        }else {
                            vm.tireInfo = {
                                cardid:'',
                                sn: '',
                                brand:'',
                                model:'',
                                tno:'',
                                mileage: '',
                                operator:'',
                                operatetime:'',
                                depths:['']
                            }
                        }
                    })
                    .catch(function (err) {
                    });
                if(ng){

                }else {
                    vm.x = event.pageX;
                    vm.y = event.pageY
                    if(sn < 5){
                        vm.$refs.ysdataBox.style.top = vm.y + 50 + 'px';
                        vm.$refs.ysdataBox.style.left = vm.x - 100 + 'px';
                    }else {
                        vm.$refs.ysdataBox.style.top = vm.y - 210 + 'px';
                        vm.$refs.ysdataBox.style.left = vm.x - 100 + 'px';
                    }
                    vm.ysdatabox = true;
                }
            },
            //获取传感器里程
            getSensor(sid,res){
                let vm = this;
                vm.$axios({
                    method:'post',
                    url:window.$g_Api+'/api/mileage/sensor',
                    data:{
                        sid:sid
                    }
                })
                    .then(function(res1){
                        res.data.errcode == 0 ? vm.tireInfo = res.data : vm.tireInfo = {
                            depth: 0,
                            mileage: 0,
                            sn: '',
                        };
                        vm.tireInfo.mileage = res1.data.mileage?parseInt(res1.data.mileage):0;
                    })
                    .catch(function(err){
                        res.data.errcode == 0 ? vm.tireInfo = res.data : vm.tireInfo = {
                            depth: 0,
                            mileage: 0,
                            sn: '',
                        };
                        // vm.tireInfo.mileage = res1.data.mileage?parseInt(res1.data.mileage):0;
                    });
            },
            //返回brack
            brack() {
                this.$router.go(-1)
            },
            //修改轮胎信息
            reviseInfo() {
                let vm = this;
                if (vm.xg) {
                    vm.xg = false;
                    vm.btnTxt = '保存';
                } else {

                    vm.$axios({
                        method: 'post',
                        url: window.$g_Api + '/api/tire/set',
                        data: {
                            cid:sessionStorage.getItem('companyid'),
                            tid:sessionStorage.getItem('teamid'),
                            rid: vm.paramsrid,
                            cardid: vm.tireInfo.cardid,
                            sn: vm.tireInfo.sn,
                            model: vm.tireInfo.model,
                            tno: vm.tireInfo.tno,
                            brand:vm.tireInfo.brand,
                            mileage:vm.tireInfo.mileage,
                            operator:vm.tireInfo.operator,
                            operatetime:vm.tireInfo.operatetime,
                            depths:vm.tireInfo.depths.join(','),
                        },
                        // headers:
                        //     {
                        //         'Content-Type': 'text/plain'
                        //     },
                    })
                        .then(function (res) {
                            if (res.data.errcode == 0) {
                                vm.$message.success(vm.$t('message.success'))
                                vm.xg = true;
                                vm.btnTxt = vm.$t('message.revise');
                            } else {
                                vm.$message.error(res.data.msg);
                            }
                        })
                        .catch(function (err) {
                        });
                }
            },
            //获取轮胎品牌列表
            getBrandlist() {
                let vm = this;
                vm.$axios({
                    method: 'post',
                    url: window.$g_Api + '/api/tire/brandlist',
                    data:{
                        cid:sessionStorage.getItem('companyid')
                    }
                })
                    .then(function (res) {
                        res.data.errcode == 0 ? vm.brandlist = res.data.tirebrands : vm.brandlist = [];
                    })
                    .catch(function (err) {
                    });
            },
            //获取某品牌下的所有规格列表
            getModellist(id) {
                let vm = this;
                vm.$axios({
                    method: 'post',
                    url: window.$g_Api + '/api/tire/modellist',
                    data: {
                        brandid: id,
                        cid:sessionStorage.getItem('companyid')
                    }
                })
                    .then(function (res) {
                        res.data.errcode == 0 ? vm.modellist = res.data.tiremodels : vm.modellist = [];
                    })
                    .catch(function (err) {
                    });
            },
            //品牌改变,获取某品牌下的所有规格列表
            brandChange(id) {
                this.getModellist(id);
            },
            //增加花纹深度输入框
            addDepthIpt(){
                this.tireInfo.depths.push('')
            },
            //删除花纹深度输入框
            dleDepthIpt(index){
                this.tireInfo.depths.splice(index,1)
            },
            //删除指定原始数据
            handleClose(tag) {
                let vm = this;
                vm.$confirm(vm.$t('message.devinfoTips'), vm.$t('message.tips'), {
                    confirmButtonText: vm.$t('message.confirm'),
                    cancelButtonText: vm.$t('message.cancel'),
                    type: 'warning'
                }).then(() => {
                    vm.$axios({
                        method: 'post',
                        url: window.$g_Api + '/api/receiver/removesn',
                        data: {
                            rid: vm.paramsrid,
                            cardid: tag.cardid,
                            sn: tag.sn
                        }
                    })
                        .then(function (res) {
                            if (res.data.errcode == 0) {
                                vm.ysTires.splice(vm.ysTires.indexOf(tag), 1);
                                vm.getTextInfo()
                                vm.ysdatabox = false;
                                vm.$message({
                                    type: 'success',
                                    message: vm.$t('message.success')
                                });
                                // vm.getTireInfo(tag.sn);
                            } else {
                                vm.$message.error(res.data.msg)
                            }
                        })
                        .catch(function (err) {
                            vm.$message.error(err)
                        });

                }).catch(() => {

                });

            },
            //鼠标移入显示信息框
            boxClose() {
                this.ysdatabox = false;
            },
        }
    }
</script>

<style lang="scss" type="text/scss">
    #devinfo {
        width: 100%;
        height: auto;
        position: relative;
        .infobox {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: flex-start;
            overflow: auto;
        }

        .brack {
            position: absolute;
            top: 10px;
            right: 25px;
            color: #409EFF;
            &:hover {
                cursor: pointer;
            }
        }

        .box_l {
            width: auto;
            height: auto;
            display: flex;
            justify-content: flex-start;
            flex-direction: column;

            .textInfo {
                width: auto;
                height: auto;
                /*overflow: auto;*/
                padding: 0 10px;
                padding-top: 10px;
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                margin-bottom: 10px;

                p {
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;

                    span {
                        display: inline-block;
                        min-width: 150px;
                        color: #555555;

                        i {
                            /*margin-right: 10px;*/
                        }
                    }

                    em {
                        display: block;
                        flex: 1;
                        color: #E6A23C;
                    }
                }
            }

            .map {
                width: 400px;
                height: 400px;
                overflow: hidden;
                padding: 5px;
                padding-top: 0px;
                background: rgb(253, 246, 236);
                position: relative;

                .dateBox {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                }

                .el-input {
                    color: #409EFF;
                    width: 100px !important;
                    height: 20px;
                    line-height: 20px;
                }

                .el-input__inner {
                    height: 20px;
                    line-height: 20px;
                    width: 100px !important;
                    overflow: hidden;
                    /*border-color: #409EFF !important;*/
                    color: #409EFF;
                    border: none;
                    background-color: transparent;
                    padding-right: 0px;

                    &:hover {
                        cursor: pointer;
                    }
                }

                .el-input__icon {
                    line-height: 20px;
                    color: #409EFF;
                }

                #map {
                    width: 390px;
                    height: 390px;
                }

                .trackMsg {
                    position: absolute;
                    top: 40%;
                    left: 50%;
                    width: 200px;
                    height: 40px;
                    background-color: #E6A23C;
                    border-radius: 10px;
                    margin-left: -100px;
                    color: #ffffff;
                    text-align: center;
                    line-height: 40px;
                    font-size: 18px;
                }
            }
        }

        .box_c {
            width: 400px;
            /*height: 100%;*/
            /*line-height: 100%;*/
            margin: 0 60px;
            /*display: flex;*/
            /*flex-direction: column;*/
            /*justify-content: center;*/
            .active {
                border: 1px solid #409EFF;
                background-color: rgba(64, 158, 255, 0.1);
            }

            .carBox1 {
                width: 400px;
                height: 600px;
                background: url("../../../../static/img/mcar.png") no-repeat center 100%;
                background-position-y: -30px;
                padding: 80px 40px 100px 40px;
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                .tirebox {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    position: relative;
                    sub {
                        font-size: 6px;
                    }

                    em {
                        font-size: 6px;
                        margin-left: 2px;
                    }

                    i {
                        font-size: 14px;
                    }
                    .tire, .tire1 {
                        width: 70px;
                        height: 100px;
                        border-radius: 20px;
                        border: 1px solid #7a7a7a;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        /*text-align: center;*/
                        font-size: 14px;

                        span {
                            text-align: left;
                            line-height: 22px;
                            margin: 0 auto;

                        }

                        &:hover {
                            cursor: pointer;
                        }

                        .snTip {
                            display: block;
                            width: 18px;
                            height: 18px;
                            line-height: 18px;
                            border-radius: 50%;
                            /*background-color: #4169E1;*/
                            border: 1px solid #4169E1;
                            color: #4169E1;
                            text-align: center;
                            margin: 6px auto;
                        }

                    }
                    .ti{
                        position: absolute;
                        top: 0;
                        left: 260px;
                    }
                    .tire1 {
                        width: 80px;
                        height: 60px;
                        margin-top: 100px;

                        .snTip {
                            display: block;
                            width: 18px;
                            height: 18px;
                            line-height: 18px;
                            border-radius: 50%;
                            /*background-color: #4169E1;*/
                            border: 1px solid #4169E1;
                            color: #4169E1;
                            text-align: center;
                            margin: 2px auto;
                        }
                    }
                }
            }

            .carBox2, .carBox3 {
                width: 400px;
                height: 600px;
                background: url("../../../../static/img/bcar.png") no-repeat center 100%;
                background-position-y: -50px;
                padding: 50px 0px 50px 0px;
                display: flex;
                justify-content: space-between;
                flex-direction: column;

                em {
                    font-size: 6px;
                    margin-left: 2px;
                }

                .tireBox {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;

                    .tirebox {
                        width: 124px;
                        display: flex;
                        justify-content: space-between;
                        position: relative;

                        sub {
                            font-size: 6px;
                        }

                        i {
                            font-size: 12px;
                        }

                        .tire {
                            width: 60px;
                            height: 80px;
                            border-radius: 20px;
                            border: 1px solid #7a7a7a;
                            position: absolute;
                            top: 0;
                            left: 0;
                            text-align: center;
                            /*padding: 8px 0px 8px 4px;*/
                            /*padding: 6px 0;*/
                            font-size: 12px;
                            display: flex;
                            flex-direction: column;
                            justify-content: flex-start;

                            &:hover {
                                cursor: pointer;
                            }

                            span {
                                width: 54px;
                                line-height: 22px;
                                text-align: left;
                                margin: 0px auto;
                                display: flex;
                                justify-content: flex-start;
                            }

                            &:nth-child(2) {
                                position: absolute;
                                top: 0;
                                left: 64px;
                            }

                            .snTip {
                                display: block;
                                width: 18px;
                                height: 18px;
                                line-height: 18px;
                                border-radius: 50%;
                                /*background-color: #4169E1;*/
                                border: 1px solid #4169E1;
                                color: #4169E1;
                                text-align: center;
                                margin: 6px auto;
                            }
                        }
                    }

                    .tire1 {
                        position: relative;
                        width: 80px;
                        height: 60px;
                        font-size: 12px;

                        .tire2 {
                            position: absolute;
                            top: 40px;
                            width: 80px;
                            height: 60px;
                            border-radius: 20px;
                            border: 1px solid #7a7a7a;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            /*padding: 4px 14px 0px 14px !important;*/
                            text-align: center;

                            span {
                                text-align: left;
                                margin: 0px auto;
                            }

                            &:hover {
                                cursor: pointer;
                            }

                            .snTip {
                                display: block;
                                width: 18px;
                                height: 18px;
                                line-height: 18px;
                                border-radius: 50%;
                                /*background-color: #4169E1;*/
                                border: 1px solid #4169E1;
                                color: #4169E1;
                                text-align: center;
                                margin: 2px auto;
                            }
                        }

                    }
                }

            }

            .carBox3 {
                background: url("../../../../static/img/gcar.png") no-repeat center 100%;
                padding: 100px 0px 80px 0px;

                .tire2 {
                    top: 80px !important;

                    .snTip {
                        display: block;
                        width: 18px;
                        height: 18px;
                        line-height: 18px;
                        border-radius: 50%;
                        /*background-color: #4169E1;*/
                        border: 1px solid #4169E1;
                        color: #4169E1;
                        text-align: center;
                        margin: 6px auto;
                    }
                }
            }
            .carBox4{
                width: 450px;
                height: 680px;
                overflow-x:visible;
                overflow-y: auto;
            }
        }

        .box_r {
            .el-input {
                color: #409EFF;
                width: 100px !important;
                height: 20px;
                line-height: 20px;
            }

            .el-input__inner {
                height: 20px;
                line-height: 20px;
                width: 100px !important;
                overflow: hidden;
                /*border-color: #409EFF !important;*/
                color: #409EFF;
                border: none;
                background-color: transparent;
                padding-right: 0px;

                &:hover {
                    cursor: pointer;
                }
            }

            .el-input__icon {
                line-height: 20px;
                color: #409EFF;
            }

            .tireInfo {
                width: 400px;
                height: auto;
                padding: 10px;
                margin-top: 20px;
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                position: relative;
                .tireIcon {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    font-size: 32px;
                    color: green;
                }
                .title {
                    font-size: 14px;
                    color: #666666;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                }
                p {
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    padding-left: 10px;
                    color: #E6A23C;
                    line-height: 32px;
                    span {
                        display: block;
                        width: 120px;
                        margin-right: 15px;
                        color: #555555;
                        i {
                            margin-right: 10px;
                        }
                    }
                    input {
                        width: 180px;
                        border: none;
                        border-bottom: 1px solid #eee;
                        outline: none;
                        color: #E6A23C;
                        padding-left: 10px;
                        background: rgba(244, 244, 245, 0.3);
                        &:disabled {
                            background-color: transparent;
                        }
                    }
                    .selInput {
                        width: 180px;

                        .el-input__inner {
                            width: 180px !important;
                        }

                        .el-input__suffix {
                            width: 180px !important;
                            left: 0 !important;
                            margin: 0;
                            text-align: right;
                        }

                        .el-input__suffix-inner {
                            width: 180px;
                        }
                    }
                    .add_ipt{
                        font-size: 24px;
                        color:#409EFF;
                        &:hover{
                            cursor: pointer;
                        }
                    }
                }
                .tesu{
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    padding-left: 10px;
                    color: #E6A23C;
                    line-height: 32px;
                    .sp {
                        display: block;
                        width: 120px;
                        margin-right: 15px;
                        color: #555555;
                        i {
                            margin-right: 10px;
                        }
                    }
                    .el-input {
                        color: #409EFF;
                        width: 180px !important;
                        height: 32px !important;
                        line-height: 32px !important;
                    }

                    .el-input__inner {
                        height: 32px;
                        line-height: 32px;
                        width: 180px !important;
                        overflow: hidden;
                        /*border-color: #409EFF !important;*/
                        color: #409EFF;
                        border: none;
                        background-color: transparent;
                        padding-right: 0px;
                    }
                    .el-input__icon {
                        line-height: 32px !important;
                        color: #409EFF;
                    }
                    .el-input__prefix{
                        width: 20px;
                    }
                    .el-input__suffix{
                        width: 20px;
                        right:8px;
                    }
                }
            }
            .line {
                width: 400px;
                height: 320px;
                position: relative;
            }

            .lineTipMsg {
                width: 200px;
                height: 40px;
                position: absolute;
                top: 40%;
                left: 50%;
                background-color: #E6A23C;
                text-align: center;
                line-height: 40px;
                font-size: 18px;
                color: #ffffff;
                border-radius: 10px;
                margin-left: -100px;
            }

            #lineBox {
                width: 400px;
                height: 320px;
            }
        }

        .ysdataBox {
            width: auto;
            height: auto;
            border-radius: 4px;
            /*background-color: rgba(64, 158, 255, .1);*/
            background-color: rgba(255, 255, 255, .8);
            position: fixed;
            top: 0;
            left: 0;
            z-index: 99;
            color: #409eff;
            border: 1px solid rgba(64, 158, 255, .6);
            padding: 4px 8px;
            transition: 0.5s all;
            .title {
                font-size: 12px;
                margin-bottom: 10px;
                width: 100%;
                display: flex;
                justify-content: space-between;
                i{
                    &:hover{
                        cursor: pointer;
                    }
                }
            }
            .tagBox {
                width: 100%;
                display: flex;
                justify-content: space-between;
                /*overflow: auto;*/
                /*margin: 10px 0px;*/
                /*padding: 10px;*/
                .el-tag {
                    width: auto !important;
                    height: auto !important;
                    /*overflow: hidden;*/
                    /*white-space: nowrap;*/
                    /*text-overflow: ellipsis;*/
                    position: relative;
                    padding-right: 20px;
                    margin-right: 15px;
                }
                .el-icon-close {
                    position: absolute;
                    top: 4px;
                    right: 0px;
                }
            }
        }
    }
</style>

