<template>
    <div class="play-bar">
        <div class="kongjian">
            <!-- 上一首 -->
            <div class="item" @click="prev">
                <svg class="icon" fill="white">
                    <use xlink:href="#icon-ziyuanldpi" fill=""></use>
                </svg>
            </div>
            <!-- 播放 -->
            <div class="item" @click="togglePlay">
                <svg class="icon">
                    <use :xlink:href="playButtonUrl"></use>
                </svg>
            </div>
            <!-- 下一首 -->
            <div class="item" @click="next">
                <svg class="icon">
                    <use xlink:href="#icon-ziyuanldpi1"></use>
                </svg>
            </div>
            <!-- 歌曲图片 -->
            <div class="item-img" @click="toPlayer">
                <img :src="picUrl"/>
            </div>
            <!-- 播放进度 -->
            <div class="playing-speed">
                <!-- 播放开始时间 -->
                <div class="current-time">{{nowTime}}</div>
                <div class="progress-box">
                    <div class="item-song-title">
                        <div>{{this.title}}</div>
                        <div>{{this.artist}}</div>
                    </div>
                    <div ref="progress" class="progress" @mousemove="mousemove">
                        <!-- 进度条 -->
                        <div ref="bg" class="bg" @click="updatemove">
                            <div ref="curProgress" class="cur-progress" :style="{width:curLength+'%'}"></div>
                        </div>
                        <!-- 拖动的点点 -->
                        <div ref="idot" class="idot" :style="{left:curLength+'%'}" @mousedown="mousedown" @mouseup="mouseup"></div>
                    </div>
                </div>
                <!-- 播放结束时间 -->
                <div class="left-time">{{songTime}}</div>
                <!-- 音量 -->
                <div class="item item-volume">
                    <svg v-if="volume == 0" class="icon">
                        <use xlink:href="#icon-yinliangjingyinheix"></use>
                    </svg>
                    <svg v-else class="icon">
                        <use xlink:href="#icon-yinliang1"></use>
                    </svg>
                    <el-slider class="volume" v-model="volume" :vertical="true"></el-slider>
                </div>
                <!-- 收藏 -->
                <div class="item" @click="collection">
                    <svg :class="{active:isActive}" class="icon">
                        <use xlink:href="#icon-xihuan-shi"></use>
                    </svg>
                </div>
                <!-- 当前播放的歌曲列表 -->
                <div class="item" @click="showList">
                    <svg class="icon">
                        <use xlink:href="#icon-liebiao"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
import { setCollect,getCollectOfUserId,deleteCollection} from '../api/index';

export default {
    name: 'play-bar',
    data(){
        return {
            nowTime: '00:00',        //当前播放进度的时间
            songTime: '00:00',        //当前歌曲总时间
            curLength: 0,            //进度条的位置
            progressLength: 0,      //进度条的总长度
            mouseStartX:    0,      //拖拽开始位置
            tag: false,             //拖拽开始结束的标志，当开始拖拽，它的值才会变成true
            volume: 35,             //音量，默认一半
            flag: 0
        }
    },
    computed: {
        ...mapGetters([
            'id',               //歌曲id
            'url',              //歌曲地址
            'isPlay',           //播放状态
            'playButtonUrl',   //播放状态的图标
            'picUrl',            //正在播放的音乐的图片
            'title',                  //歌名
            'artist',                 //歌手名
            'duration',                //音乐时长
            'curTime',                //当前音乐的播放位置
            'showAside',            //是否显示播放中的歌曲列表
            'listIndex',            //当前歌曲在歌单中的位置
            'listOfSongs',          //当前歌单列表
            'autoNext',
            'loginIn',              //用户是否已登录
            'userId',               //当前登录用户的id
            'isActive',             //当前播放的歌曲是否已收藏
        ])
    },
    created(){
        this.$store.commit('setIsPlay',false);
        setTimeout(() => {this.$store.commit('setIsPlay', false);}, 100);
        if(this.showSongComment){
            this.flag = 1;
        }else{
            this.flag = 0;
        }
    },
    watch:{
        //切换播放状态的图标
        isPlay() {
             if(this.isPlay){
                this.$store.commit('setPlayButtonUrl', '#icon-zanting');
            }else{
                this.$store.commit('setPlayButtonUrl', '#icon-bofang');
            }
        },
        curTime(){
            this.nowTime = this.formatSeconds(this.curTime);
            this.songTime = this.formatSeconds(this.duration);
            this.curLength = (this.curTime / this.duration) *100;
        },
        //音量变化
        volume(){
            this.$store.commit('setVolume',this.volume / 100);
        },
        autoNext(){
            this.next();
        },
        showSongComment(){
            if(this.showSongComment){
               this.flag = 1;
            }else{
               this.flag = 0;
          }
        }
    },
    mounted(){
        this.progressLength = this.$refs.progress.getBoundingClientRect().width;
        document.querySelector('.item-volume').addEventListener('click',function(e){
            document.querySelector('.volume').classList.add('show-volume');
            e.stopPropagation();
        },false);
        document.querySelector('.volume').addEventListener('click',function(e){
            e.stopPropagation();
        },false);
        document.addEventListener('click',function(){
            document.querySelector('.volume').classList.remove('show-volume');
        },false);
        setTimeout(() => {this.$store.commit('setIsPlay', false);}, 100);
    },
    methods: {
        setAtFirst() {
            this.$store.commit('setPlayButtonUrl', '#icon-bofang');
        },
        //控制音乐播放、暂停
        togglePlay() {
            if(this.isPlay){
                this.$store.commit('setIsPlay', false);
            }else{
                this.$store.commit('setIsPlay', true);
            }
        },
        //解析时间
        formatSeconds(value){
            let theTime = parseInt(value);
            let result = '';    //返回值
            let hour = parseInt(theTime / 3600);    //小时
            let minute = parseInt((theTime / 60) % 60); //分钟
            let second = parseInt(theTime % 60);        //秒
            if(hour > 0){
                if(hour < 10){
                    result = '0' + hour + ":";
                }else{
                    result = hour + ":";
                }
            }
            if(minute > 0){
                if(minute < 10){
                    result += "0" + minute + ":";
                }else{
                    result += minute + ":";
                }
            }else{
                result += "00:";
            }
            if(second > 0){
                if(second < 10){
                    result += "0" + second;
                }else{
                    result += second;
                }
            }else{
                result += "00";
            }
            return result;
        },
        //拖拽开始
        mousedown(e){
            this.mouseStartX = e.clientX;
            this.$store.commit('setPlayButtonUrl', '#icon-zanting');
            this.tag = true;
        },
        //拖拽结束
        mouseup(){
            this.tag = false;
        },
        //拖拽中
        mousemove(e){
            if(!this.duration){
                return false;
            }
            if(this.tag){
                let movementX = e.clientX - this.mouseStartX;       //点点移动的距离
                let curLength = this.$refs.curProgress.getBoundingClientRect().width;
                let newPercent = ((movementX+curLength)/this.progressLength)*100;
                if(newPercent>100){
                    newPercent = 100;
                }
                this.curLength = newPercent;
                this.mouseStartX = e.clientX;
                this.changeTime(newPercent);
            }
        },
        //更改歌曲进度
        changeTime(percent){
            let newCurTime = (percent*0.01)* this.duration;
            this.$store.commit('setChangeTime',newCurTime);
        },
        //点击播放条切换播放进度
        updatemove(e){
            if(!this.tag){
                //进度条的左侧坐标
                let curLength = this.$refs.bg.offsetLeft;
                let newPercent = ((e.clientX - curLength) / this.progressLength) * 100;
                if(newPercent>100){
                    newPercent = 100;
                }else if(newPercent<0){
                    newPercent = 0;
                }
                this.curLength = newPercent;
                this.changeTime(newPercent);
            }
        },
        //显示歌曲列表
        showList(){
            this.$store.commit('setShowAside',true);
        },
        showSongComment(){
            if(this.flag == 0){
                this.$store.commit('setShowComment',true);
                this.flag = 1;
            }else{
                this.$store.commit('setShowComment',false);
                this.flag = 0;
            }
        },
                //上一首
        prev(){
            if(this.listIndex != -1 && this.listOfSongs.length > 1){    //当前处于不可能状态或者只有只有一首音乐的时候不执行）
                if(this.listIndex > 0){                                 //不是第一首音乐
                    this.$store.commit('setListIndex',this.listIndex - 1);  //直接返回上一首
                }else{                                                  //当前是第一首音乐
                    this.$store.commit('setListIndex',this.listOfSongs.length - 1);  //切换到倒数第一首
                }
                this.toplay(this.listOfSongs[this.listIndex].url);
                //localStorage.setItem('lyric', JSON.stringify(this.listOfSongs[this.listIndex].lyric));
            }
        },
        //下一首
        next(){
            if(this.listIndex != -1 && this.listOfSongs.length > 1){    //当前处于不可能状态或者只有只有一首音乐的时候不执行）
                if(this.listIndex < this.listOfSongs.length - 1){                                 //不是最后一首音乐
                    this.$store.commit('setListIndex',this.listIndex + 1);  //直接返回下一首
                }else{                                                      //当前是最后一首音乐
                    this.$store.commit('setListIndex',0);  //切换到第一首
                }
                this.toplay(this.listOfSongs[this.listIndex].url);
                this.$store.commit('setId',this.listOfSongs[this.listIndex].id);
                localStorage.setItem('lyric', JSON.stringify(this.listOfSongs[this.listIndex].lyric));
            }
        },
        //播放音乐
        toplay: function(url){
            if(url && url != this.url){
                this.$store.commit('setId',this.listOfSongs[this.listIndex].id);
                this.$store.commit('setUrl',this.$store.state.configure.HOST+url);
                this.$store.commit('setPicUrl',this.$store.state.configure.HOST+this.listOfSongs[this.listIndex].pic);
                this.$store.commit('setTitle',this.replaceFName(this.listOfSongs[this.listIndex].name));
                this.$store.commit('setArtist',this.replaceLName(this.listOfSongs[this.listIndex].name));
                this.$store.commit('setLyric',this.parseLyric(this.listOfSongs[this.listIndex].lyric));
                localStorage.setItem('lyric', JSON.stringify(this.listOfSongs[this.listIndex].lyric));
                if(this.loginIn){
                getCollectOfUserId(this.userId)
                    .then(res =>{
                        for(let item of res){
                            if(item.songId == id){
                                this.$store.commit('setIsActive',true);
                                break;
                            }
                        }
                    })
                }
            }
        },
         //获取名字前半部分--歌手名
        replaceLName(str){
            let arr = str.split('-');
            return arr[0];
        },
        //获取名字后半部分--歌名
        replaceFName(str){
            let arr = str.split('-');
            return arr[1];
        },
        toPlayer(){
            if (this.$route.path !== '/player') {
                this.$router.push('/player');
            }
        },
        //解析歌词
        parseLyric(text){
            let lines = text.split("\n");                   //将歌词按行分解成数组
            let pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g; //时间格式的正则表达式
            let result = [];                                //返回值
            //对于歌词格式不对的直接返回
            if(!(/\[.+\]/.test(text))){
                console.log("格式不正确");
                return [[0,text]]
            }        
            //去掉前面格式不正确的行
            while(!pattern.test(lines[0])){
                lines = lines.slice(1);
            }
            //遍历每一行，形成一个每行带着俩元素的数组，第一个元素是以秒为计算单位的时间，第二个元素是歌词
            for(let item of lines){
                console.log("格式正确");
                let time = item.match(pattern);  //存前面的时间段
                let value = item.replace(pattern,'');//存后面的歌词
                for(let item1 of time){
                    let t = item1.slice(1,-1).split(":");   //取出时间，换算成数组
                    if(value!=''){
                        result.push([parseInt(t[0],10)*60 + parseFloat(t[1]),value]);
                    }                    
                }                
            }
            //按照第一个元素--时间--排序
            result.sort(function(a,b){
                return a[0] - b[0];
            });
            console.log(result); 
            return result;
        },         
        collection() {
            if(this.loginIn){
            if(this.isActive == false){
                if(this.loginIn){
                var params = new URLSearchParams();
                params.append('userId',this.userId);
                params.append('type',0);
                params.append('songId',this.id);
                setCollect(params)
                    .then(res =>{
                        if(res.code == 1){
                            this.$store.commit('setIsActive',true);
                            this.notify('收藏成功','success');
                        }else if(res.code == 2){
                            this.notify('已收藏','warning');
                        }else{
                            this.notify('收藏失败','error');
                        }
                    })
            }else{
                this.notify('请先登录','warning');
            }
            }
            else{
                console.log("isActive:"+this.isActive);
                this.$store.commit('setIsActive',false);
                var params = new URLSearchParams();
                params.append('userId',this.userId);
                params.append('songId',this.id);
                deleteCollection(params);
                this.notify('取消收藏成功','success');
            }
        }else{
            this.notify('请先登录','warning');
        }
        },
        notify(title,type) {
            this.$notify({
                title: title,
                type: type
            })
        },
    }
}
</script>
<style  lang="scss" scoped>
@import '../assets/css/play-bar.scss';
</style>
