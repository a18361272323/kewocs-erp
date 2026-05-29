<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <base href="/">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="../../../favicon.ico">
    
    <title>演示环境</title>
	<!-- nginx环境变量 -->
    <script src="/sysVar.js"></script>
    <link rel="stylesheet" type="text/css" href="/mainapp2/common/css/common.css" />
    <!-- 修复网银错误弹窗 -->
    <script type="text/javascript">
        (function() {
            try {
                if (/^.*single$/g.test(window.location.hash.split('/')[1])) {
                    console.error = function(error) {};
                }
            } catch (e) {}
            if (window.location.hash.startsWith('#/page/') || /^#\/\w+single\//.test(window.location.hash)) {
                const single = window.location.hash.match(/^#\/(\w+)\//)?.[1] || '';
                window.xft_single_name = single;
            }
        })();
    </script>
    <!-- 获取版本配置信息 -->
    <script type="text/javascript">
        (function() {
            var d = document,c = d.createElement('script');
            c.src = "/gateway/config?" + Date.now().toString();
            if (d.head) {
                d.head.appendChild(c);
            } else {
                d.getElementsByTagName('head')[0].appendChild(c)
            }
        })();
    </script>
    <!-- 判断是否到移动端官网 -->
    <script>
        (function() {
            function doMobileNavigate() {
                if (isForceToPc()) {
                    return;
                }
    
                var ua = navigator.userAgent;
                var isMPBank = /MPBank/.test(ua);   // 手机银行
                var isAndroid = /(?:Android)/.test(ua);
                var isFireFox = /(?:Firefox)/.test(ua);
                var isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)) || /(?:CBApp)/.test(ua);
                var isPhone = /(?:iPhone)/.test(ua) && !isTablet;
                var isHarmonyOS = /(?:OpenHarmony)/.test(ua);
    
                var paramsStr = location.href.split('?')[1] || '';
    
                if (paramsStr.indexOf('isEnterWorkbench=true') === -1 && !isTablet && (isAndroid || isPhone || isHarmonyOS || isMPBank)) {
    
                    if (isMobileInvite(paramsStr)) {
                        goToMobileInvite(paramsStr);
                        return;
                    }
        
                    var jumpUrl = '/app-home/assets/mhtml/homepage.html';
    
                    // 移动端打开pc的满意度调查链接，跳转到移动端的满意度调查页面
                    if (location.hash.indexOf('/questionnairesurvey2') != -1) {
                        jumpUrl = '/app-home/#/satissurvey2';
                    } else if (location.hash.indexOf('/questionnairesurvey') != -1) {
                        jumpUrl = '/app-home/#/satissurvey';
                    } else if(location.hash.indexOf('/apmout/thrpart') != -1) {
                        jumpUrl = '/mobile-apm/#/apm/thrpart';
                    } else if (location.hash.indexOf('#/index') != -1) {
                        jumpUrl = '/app-home/#/login';
                    } else if (location.hash.indexOf('#/register') != -1) {
                        jumpUrl = '/app-home/#/register';
                    }
    
                    if (paramsStr) {
                        jumpUrl += '?' + paramsStr;
                    }
    
                    window.location.href = window.location.origin + jumpUrl;
                } else {
                    jumpHelpCenter();
                }
            }
    
            // 是否跳转移动端邀请
            function isMobileInvite(paramsStr) {
                var inviteReg = /index\/(?=([0-9]{8}[0-9a-z]{12}))[?]{0,1}/i;
                var isInvite = inviteReg.test(location.href);
                return isInvite && paramsStr;
            }
    
            // 跳转移动端邀请
            function goToMobileInvite(paramsStr) {
                var invnum = location.href.match(/index\/(?=([0-9]{8}[0-9a-z]{12}))[?]{0,1}/i)[1];
                var params = paramsStr ? '?' + 'invnum=' + invnum + '&' + paramsStr : '';
                window.location.href = window.location.origin + '/app-home/#/invitelink' + params;
            }
    
            // 是否强制跳到PC端
            function isForceToPc() {
                var forcePcList = ['/loginsz', '/login/yq', '/introsz'];
                for (var index = 0; index < forcePcList.length; index++) {
                    var path = forcePcList[index];
                    if (window.location.href.indexOf(path) > -1) {
                        return true;
                    }
                }
                return false;
            }

            // 跳转帮助中心，旧地址转发
            function jumpHelpCenter() {
                if (location.pathname === '/' && location.hash) {
                    if (location.hash.indexOf('#/helpdetail') === 0 || location.hash.indexOf('#/helout/helpdetail') === 0) {
                        var paramsStr = location.href.split('?')[1] || '';
                        window.location.href = window.location.origin + '/helpapp/help.html#/help-main/help-detail?' + paramsStr;
                    } else if (location.hash.indexOf('#/helout/') === 0) {
                        window.location.href = window.location.origin + '/helpapp/help.html#/help-main';
                    }
                }
            }
    
            doMobileNavigate();
        })();
    </script>
    <!-- 加载入口处理loadinit.min.js -->
    <script src="/common/plugins/loadinit.min.js?t=1740559684082"></script>

    <meta name="google" content="notranslate" />
    <meta name="baidu-site-verification" content="code-mECxlWsh5D" />
    <meta name="shenma-site-verification" content="259dbe397d17fb69ff3b163691f7a359_1612340124">
    <!-- 增加花瓣插件禁用 -->
    <meta name="renderer" content="webkit">
    <meta name="force-rendering" content="webkit">
    <meta  content="nopin" >
    <link rel="stylesheet" type="text/css" href="/index/css/reset.css?t=1740559684082">
    
    <!-- 官网js公共函数 -->
    <script src="/index/js/common.js?t=1740559684082" ></script>
</head>
<body>
   <div class="layout-art art-index-main-page">
        
<style>

/* 顶部导航样式 */
    .art-index-main-page .navigation-wrapper {
        height: 60px;
        background: white;
        /* IE兼容 */
        position: fixed;
        position: sticky;
        min-width: 1280px;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 99;
    }

    .art-index-main-page .navigation-wrapper .menu-sub-container {
        position:fixed;
        top:60px;
        left:0;
        background: #F8FBFD;
        display:none;
        width:100%;
        height:400px;
        background: #FFFFFF;
        box-shadow: 0px 2px 20px 0px rgba(21,42,90,0.1);
        border-radius: 8px;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container::before{
        
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .left-bg{
        width:calc(50% - 390px);
        height:400px;
        background: #F8FBFD;
        position:fixed;
        top:60px;
        left:0;
        display:flex;
        z-index:-1
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .menu-sub-container-inner {
        width:1200px;
        display:flex;
        margin:0 auto;
        padding:30px 0;
    }
    .art-index-main-page .function-item.product-introduce:hover .menu-sub-container.product-introduce{
        display:flex;
    }
    .art-index-main-page .function-item.solution-way:hover .menu-sub-container.solution-way{
        display:flex;
    }
    .art-index-main-page .function-item.open-platform:hover .menu-sub-container.open-platform{
        display:flex;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite{
        background: url(/index/img/navigation/sprite-nav.png)  no-repeat;
        background-size:691px 390px;
        width: 25px;
        height: 24px;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.solution-way{
        width: 34px;
        height: 34px;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.open-platform{
        width: 24px;
        height: 24px;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.icon_zzyg {
        background-position: -58px -45px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.icon_jqgl {
        background-position: -134px -45px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.icon_xcgl {
        background-position: -209px -45px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.icon_sbgl {
        background-position: -285px -45px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.icon_gsgl {
        background-position: -360px -45px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.icon_xzdf {
        background-position: -436px -45px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.icon_tdfl {
        background-position: -512px -45px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.icon_fpgl {
        background-position: -57px -115px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.icon_fygl {
        background-position: -133px -115px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.icon_cwgl {
        background-position: -209px -115px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.icon_ysyf {
        background-position: -285px -115px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.icon_spgl {
        background-position: -361px -115px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.icon_sjfx {
        background-position: -437px -115px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.icon_tsyy {
        background-position: -512px -115px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.icon-zzy {
        background-position: -54px -187px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.icon-gyqy {
        background-position: -128px -187px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.icon-kjrj {
        background-position: -204px -187px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.icon-lsls {
        background-position: -280px -187px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.icon-rlzy {
        background-position: -355px -187px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.icon-jtqy {
        background-position: -432px -187px; 
    }

    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.nav-icon-codeFriend {
        background-position: -59px -292px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.nav-icon-solution {
        background-position: -133px -292px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.nav-icon-overview {
        background-position: -209px -292px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.nav-icon-connector {
        background-position: -285px -292px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.nav-icon-portal {
        background-position: -365px -292px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.nav-icon-dataPlatform {
        background-position: -434px -292px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.nav-icon-document {
        background-position: -512px -292px; 
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-sprite.nav-icon-developer {
        background-position: -588px -292px; 
    }


    .art-index-main-page .navigation-wrapper .menu-sub-container.product-introduce .left  .apply-type {
       width:166px;
    }

    .art-index-main-page .navigation-wrapper .menu-sub-container.product-introduce .left .apply-type .apply-item {
        width:168px;
        height:86px;
        margin-top:10px;
        font-family: PingFangSC, PingFang SC;
        font-size: 18px;
        color: #0F2A51;
        line-height: 25px;
        text-align: left;
        font-style: normal;
        cursor:pointer;
        border-radius: 6px;
        border: 1px solid #ffffff;
        background-size:cover;
        position:relative;
    }

    .art-index-main-page .navigation-wrapper .menu-sub-container.product-introduce .left .apply-type .apply-item.apply-type-ren.active {
        border-radius: 6px;
        border: 1px solid #16B3ED;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container.product-introduce .left .apply-type .apply-item.apply-type-cai.active { 
        border-radius: 6px;
        border: 1px solid #83AEFF;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container.product-introduce .left .apply-type .apply-item.apply-type-shi.active {
        border-radius: 6px;
        border: 1px solid #AF96FF;
    }

    .art-index-main-page .navigation-wrapper .menu-sub-container.product-introduce .left .apply-type .apply-item:first-child {
        margin-top:0px;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container.product-introduce .left .apply-type .apply-item .apply-item-type{
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 18px;
        color: #0F3951;
        line-height: 25px;
        text-align: left;
        font-style: normal;
        position:absolute;
        left:12px;
        top:5px;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container.product-introduce .left .apply-type .apply-item .apply-item-desc{
        font-family: AlibabaPuHuiTi_2_55_Regular;
        font-size: 12px;
        line-height: 17px;
        text-align: left;
        font-style: normal;
        position:absolute;
        left:12px;
        top:44px;
        display:flex;    
        flex-direction: column;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container.product-introduce .left .apply-type .apply-item.apply-type-ren .apply-item-desc{
        color: #339FDD;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container.product-introduce .left .apply-type .apply-item.apply-type-cai .apply-item-desc{
        color: #3E71B9;
    }

    .art-index-main-page .navigation-wrapper .menu-sub-container.product-introduce .left .apply-type .apply-center a{
        width: 167px;
        height: 46px;
        background: linear-gradient(147deg, #1966FF 0%, #38B6F6 100%);
        padding:0 50px;
        text-align:center;
        margin-top:20px;
        display:flex;
        justify-content:center;
        align-items:center;
        border-radius:6px;
        cursor:pointer;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 16px;
        color: #FFFFFF;
        line-height: 22px;
        font-style: normal;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .nav-center {
        height:100%;
        display:flex;
        width:990px;
    }

    .art-index-main-page .navigation-wrapper .menu-sub-container .menu-inner-box .menu-content {
        display:none;
        flex:1;
        flex-wrap:wrap;
        padding:0 26px 0 40px;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .menu-inner-box .menu-content.active{
        display:flex
    }

    .art-index-main-page .navigation-wrapper .menu-sub-container .menu-inner-box .menu-content .menu-item {
        flex-direction: column;
        margin-left:65px;;
    }

    .art-index-main-page .navigation-wrapper .menu-sub-container .menu-inner-box .menu-content .menu-item:nth-child(1), 
    .art-index-main-page .navigation-wrapper .menu-sub-container .menu-inner-box .menu-content .menu-item:nth-child(5){
        margin-left:0px;
    }

    .art-index-main-page .navigation-wrapper .menu-sub-container .menu-inner-box .menu-content .menu-item .menu-item-scene {
        align-items: center;
        justify-content: flex-start;
    }

    .art-index-main-page .navigation-wrapper .menu-sub-container .menu-inner-box .menu-content .menu-item .menu-item-scene a{
        display:flex;
        align-items: center;
        justify-content: flex-start;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .menu-inner-box .menu-content .menu-item .menu-item-scene .scene-name{
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 16px;
        color: #0F2A51;
        line-height: 24px;
        text-align: left;
        font-style: normal;
        margin-left:6px;
        cursor:pointer;
    }

    .art-index-main-page .navigation-wrapper .menu-sub-container .menu-inner-box .menu-content .menu-item .menu-item-scene .go-to-scene-icon{
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-left: 8px;
        background: url(/index/img/navigation/nav-icon-right.png) center no-repeat;
        background-size: 100% 100%;
    }


    .art-index-main-page .navigation-wrapper .menu-sub-container .menu-inner-box .menu-content .menu-item .apply-list a {
        margin-top:10px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 14px;
        color: #09244D;
        line-height: 24px;
        text-align: left;
        font-style: normal;
    }

    .art-index-main-page .navigation-wrapper .menu-sub-container .menu-inner-box .menu-content .menu-item .apply-list {
        flex-direction: column;
        margin-top:6px;
        margin-left:31px;
    }

    .art-index-main-page .navigation-wrapper .menu-sub-container .menu-inner-box .line{
        width: 1px;
        height: 100%;
        border: 1px solid #979797;
        opacity: 0.1;
    }

    .art-index-main-page .navigation-wrapper .menu-sub-container.product-introduce .nav-center .experience-zone {
        width:233px;
        margin-left:25px;
    }

    .art-index-main-page .navigation-wrapper .menu-sub-container.product-introduce .nav-center .experience-zone .desc {
        background: #F4F9FF;
        padding:19px 16px 13px 16px;
        height:160px;
        border-radius: 0px 0px 7px 7px ;
    }

    .art-index-main-page .navigation-wrapper .menu-sub-container.product-introduce .nav-center .experience-zone .desc h3 {
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 20px;
        color: #0F2A51;
        line-height: 20px;
        text-align: left;
        font-style: normal;
        margin-bottom:10px;
    }

    .art-index-main-page .navigation-wrapper .menu-sub-container.product-introduce .nav-center .experience-zone .desc .detail {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 15px;
        color: #7083A0;
        line-height: 20px;
        text-align: left;
        font-style: normal;
    }

    .art-index-main-page .navigation-wrapper .menu-sub-container.product-introduce .nav-center .experience-zone .desc .link {
        margin-top:37px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 15px;
        color: #237DFF;
        line-height: 20px;
        text-align: left;
        font-style: normal;
    }

    .art-index-main-page .navigation-wrapper .menu-sub-container.product-introduce .nav-center .experience-zone .desc .link img {
        width:13px;
        height:12px;
        margin-left:5px;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container.product-introduce .menu-sub-container-inner .left,
    .art-index-main-page .navigation-wrapper .menu-sub-container.open-platform .menu-sub-container-inner .left,
    .art-index-main-page .navigation-wrapper .menu-sub-container.solution-way .menu-sub-container-inner .left {
        width:210px;
        padding-right:40px;
        display:flex;
        justify-content:flex-end;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container.solution-way .left .tab-header{
        background: url(/index/img/navigation/solution.png) center no-repeat;
        background-size: 100% 100%;
        width: 166px;
        height: 72px;
        border-radius: 6px;
        border: 1px solid;
        padding:14px 0 14px 18px;
        border: 1px solid #16B3ED;
        border-radius:6px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container.open-platform .left .tab-header{
        background: url(/index/img/navigation/open.png) center no-repeat;
        background-size: 100% 100%;
        width: 166px;
        height: 72px;
        border-radius: 6px;
        border: 1px solid;
        padding:14px 0 14px 18px;
        border: 1px solid #16B3ED;
        border-radius:6px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .art-index-main-page .navigation-wrapper .menu-sub-container.solution-way .subTitle{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 16px;
        color: #0F2A51;
        line-height: 22px;
        text-align: left;
        font-style: normal;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container .title{
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 16px;
        color: #0F2A51;
        line-height: 24px;
        text-align: left;
        font-style: normal;
    }

    .art-index-main-page .navigation-wrapper .menu-sub-container.solution-way .nav-center{
        height:100%;
        display:flex;
        flex-wrap: wrap;
        width:770px;
        height:240px;
        padding-left:46px;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container.solution-way .solution-item {
        width: 228px;
        height: 56px;
        border-radius: 6px;
        display:flex;
        align-items:center;
        padding:6px 0px 4px 10px;
        cursor:pointer;
        margin-left:14px;
    }
    .menu-sub-container.solution-way .solution-item:nth-child(1){
        margin-left:0px !important;
    }
    .menu-sub-container.solution-way .solution-item:nth-child(4){
        margin-left:0px !important;
    }
    .menu-sub-container.solution-way .solution-item:nth-child(n+4){
        margin-top:42px;
    }
    .menu-sub-container.solution-way .solution-item:hover{
        background: #F1F8FF;
        border-radius: 6px;
    }
    .menu-sub-container.solution-way .solution-item img{
        width:34px;
        height:34px;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container.solution-way .solution-item .desc{
        display:flex;
        flex-direction: column;
        margin-left: 6px;
    }
    .menu-sub-container.solution-way .solution-item .desc .label{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 12px;
        color: #0F2A51;
        line-height: 24px;
        text-align: left;
        font-style: normal;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container.open-platform .nav-center{
        height:100%;
        display:flex;
        flex-wrap: wrap;
        width:770px;
        height:240px;
        padding-left:48px;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container.open-platform .menu-item{
        width:128px;
        display:flex;
        flex-direction: column;
        margin-left:42px;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container.open-platform .menu-item .title{
        margin-left:6px;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container.open-platform .menu-item:nth-child(1){
        margin-left:0;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container.open-platform .submenu-box{
        display:flex;
        flex-direction: column;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container.open-platform .submenu-box a{
        margin-top:18px;
        height:30px;
        display:flex;
        align-items:center;
        padding:3px 0 3px 3px;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container.open-platform .submenu-box a:hover{
        background: #F1F8FF;
        border-radius: 6px;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container.open-platform .submenu-box a:nth-child(1){
        margin-top:10px;
    }
    .art-index-main-page .navigation-wrapper .menu-sub-container.open-platform .submenu-box .submenu-list-item-text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 14px;
        color: #0F2A51;
        line-height: 24px;
        text-align: left;
        font-style: normal;
    }
    .art-index-main-page .navigation-content-area {
        position: relative;
        margin: 0 auto;
        height: 100%;
        width: 1334px;
    }

    .art-index-main-page .xft-logo-area {
        width: 192px;
        height: 100%;
        margin-right: 28px;
        float: left;
    }

    .art-index-main-page .xft-logo-area a {
        width: 100%;
        height: 100%;
        text-decoration: none;
        display: block;
    }

    .art-index-main-page ul.xft-function-area {
        height: 100%;
        list-style: none;
        margin: 0 4px 0 0;
        padding: 0;
        float: left;
    }

    .art-index-main-page li.function-item {
        height: 100%;
        display: inline-block;
        margin-right: 24px;
    }

    .art-index-main-page a.function-item-link {
        text-decoration: none;
        font-size: 16px;
        color: #0b1636;
        font-weight: bold;
        height: 100%;
        line-height: 60px;
        float: left;
    }
    .art-index-main-page .function-item:hover .function-item-link {
        color: #3385ff;
    }
    .art-index-main-page .function-item-icon {
        width: 18px;
        height: 100%;
        cursor: pointer;
        float: left;
    }
    .art-index-main-page .nav-btn-area {
        margin-right: 24px;
        float: left;
        height: 100%;
        line-height: 60px;
    }
    .art-index-main-page a.btn-download-xft {
        background: #2c82ff;
        border-radius: 8px;
        height: 34px;
        outline: none;
        border: none;
        font-size: 14px;
        color: #ffffff;
        padding: 0 12px;
        line-height: 34px;
        text-decoration: none;
        display: inline-block;
    }
    .art-index-main-page a.btn-download-xft:hover {
        background: #0147b2;
    }
    .art-index-main-page a.nav-normal-btn {
        margin-left: 20px;
        font-size: 16px;
        color: #1966ff;
        line-height: 22px;
        border: none;
        background: transparent;
        padding: 0;
        font-weight: bold;
        text-decoration: none;
    }
    .art-index-main-page a.nav-normal-btn.nav-normal-btn-login {
        margin-left: 0px;
    }
    .art-index-main-page a.nav-normal-btn:hover {
        color: #0147b2;
    }
    .art-index-main-page .navigation-contact-phone {
        font-size: 16px;
        color: #0b1636;
        font-weight: bold;
        float: left;
        height: 100%;
        line-height: 60px;
    }

    .art-index-main-page .navigation-contact-phone i {
        width: 16px;
        height: 16px;
    }
    
    .art-index-main-page .navigation-download{
        margin-left: 24px;
        float: left;
        height: 100%;
        line-height: 60px;
        width: 98px;
        background: #1966ff;
        text-align: center;
    }
    .art-index-main-page .navigation-download a{
        font-size: 14px;
        color: #FFFFFF;
        font-weight: 400;
        text-decoration: none;
        width: 100%;
        height: 100%;
        display: inline-block;
    }
    .art-index-main-page .submenu-container {
        position: absolute;
        left: 0;
        top: 60px;
        background: white;
        padding: 24px 0 24px 24px;
        box-shadow: 0px 2px 20px 0px rgba(21, 42, 90, 0.1);
        border-radius: 8px;
        display: none;
    }
    .art-index-main-page .function-item:hover .submenu-container {
       display: block;
    }
    .art-index-main-page .submenu-list-container {
        width: 20%;
        float: left;
    }
    .art-index-main-page .submenu-list-container:last-child {
        flex: 0 0 auto;
        width: auto;
    }
    .art-index-main-page h2.submenu-list-title {
        padding-left: 10px;
        margin-bottom: 13px;
        margin-top: 4px;
        cursor: pointer;
        height: 24px;
        font-size: 16px;
        color: #5C647A;
        line-height: 24px;
        display: flex;
        align-items: center;
        font-weight: 400;
    }
    .art-index-main-page .navigation-content-area .more-icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-left: 8px;
        background: url(/index/img/navigation/nav-icon-right.png) center no-repeat;
        background-size: 100% 100%;
    }
    .art-index-main-page li.submenu-list-item {
        margin-bottom: 8px;
        font-size: 0;
    }
    .art-index-main-page li.submenu-list-item:last-child {
        margin-bottom: 0;
    }
    .art-index-main-page .submenu-list-item a {
        text-decoration: none;
        min-width: 132px;
        align-items: center;
        height: 32px;
        color: #09244d;
        padding: 0 8px;
        display: inline-block;
        line-height: 32px;
        border-radius: 4px;
    }
    .art-index-main-page .submenu-list-item a:hover {
        background: rgba(25,102,255,0.09);
        color: #1966FF;
    }
    .art-index-main-page i.submenu-list-item-icon {
        width: 24px;
        height: 100%;
        float: left;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    }
    .art-index-main-page span.submenu-list-item-text {
        font-size: 14px;
        margin-left: 8px;
        float: left;
    }
    .submenu-list-title {
        font-size: 16px;
        color: rgba(92, 100, 122, 1);
        padding-bottom: 5px;
        border-bottom: 1px solid #F0F1F5;
        margin-bottom: 10px;
    }
    .art-index-main-page .about-more .submenu-container {
        left: 750px;
        width: 180px;
    }

    .art-index-main-page .xft-logo-area {
        background: url(/index/img/navigation/logo_black.svg) center no-repeat;
    }
    .art-index-main-page .function-item-icon {
        background: url(/index/img/navigation/nav-icon-down.svg) center no-repeat;
    }
    .art-index-main-page .function-item:hover .function-item-icon {
        background: url(/index/img/navigation/nav-icon-up.svg) center no-repeat;
    }
    .art-index-main-page .navigation-contact-phone i {
        background: url(/index/img/navigation/nav_icon_phone.svg) center no-repeat;
    }
    .art-index-main-page .nav-icon-about {
        background-image: url(/index/img/navigation/nav-icon-about.png);
    }
    .art-index-main-page .nav-icon-news {
        background-image: url(/index/img/navigation/nav-icon-news.png);
    }
    .art-index-main-page .nav-icon-help {
        background-image: url(/index/img/navigation/nav-icon-help.png);
    }
    .art-index-main-page .nav-icon-enterprise-portal {
        background-image: url(/index/img/navigation/nav-icon-enterprise-portal.png);
    }

    .function-item.product-introduce:hover .nav-normal-btn-login{
        color:red;
    }
    .art-index-main-page .navigation-wrapper .flex {
        display:-ms-flex;
        display:-moz-flex;
        display:-webkit-flex;
        display: -o-flex;
        display:flex;
    }

    .art-index-main-page .navigation-wrapper a {
        text-decoration:none;
    }
</style>
<div id="navigation" class="navigation-wrapper">
    <div x-track-path="首页" class="navigation-content-area">
        <div class="xft-logo-area" x-track-id="薪福通logo">
            <a href="/"></a>
        </div>
        <ul class="xft-function-area">
            <li id="art-index-main-page-nav-product-introduce" class="function-item product-introduce">
                <a x-track-id href="javascript:;" class="function-item-link">产品介绍</a>
                <i class="function-item-icon"></i>
                <div id="nav-product-introduce" class="menu-sub-container  product-introduce">
                    <div class="left-bg"></div>
                    <div class="menu-sub-container-inner">
                        <div class="left">
                            <div class="apply-type">
                                
                                    <div  class="apply-item active apply-type-ren"  style="background: url(/index/img/navigation/apply_ren.png) no-repeat center;background-size:cover;">
                                        <span class="apply-item-type">人</span>
                                        <div class="apply-item-desc">
                                            
                                                <span>薪社税全流程</span>
                                            
                                                <span>的人事数字服务</span>
                                            
                                        </div>
                                    </div>
                                
                                    <div  class="apply-item  apply-type-cai"  style="background: url(/index/img/navigation/apply_cai.png) no-repeat center;background-size:cover;">
                                        <span class="apply-item-type">财</span>
                                        <div class="apply-item-desc">
                                            
                                                <span>票财税档一体化</span>
                                            
                                                <span>的财务数字服务</span>
                                            
                                        </div>
                                    </div>
                                
                                    <div  class="apply-item  apply-type-shi"  style="background: url(/index/img/navigation/apply_shi.png) no-repeat center;background-size:cover;">
                                        <span class="apply-item-type">事</span>
                                        <div class="apply-item-desc">
                                            
                                        </div>
                                    </div>
                                
                                <div class="apply-center">
                                    <a x-track-id href="/index/apply-center/apply-center.html">应用中心</a>   
                                </div>
                            </div>
                        </div>
                        <div class="nav-center menu-inner-box flex">
                            <div class="menu-content menu-ren active">
                                
                                    <div class="menu-item flex">
                                        <div class="menu-item-scene flex">
                                            <a href="/index/subproduct-new/subproduct-new1.html" data-x-track-id="组织员工">
                                                <i class="nav-sprite icon_zzyg"></i>
                                                <span class="scene-name" >组织员工</span>
                                                <i class="go-to-scene-icon"></i>
                                            </a>
                                        </div>
                                        <div class="apply-list flex">
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=HRMa0000">
                                                    <span class="apply-list-detail-name">组织管理</span>
                                                </a>
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=REC00000">
                                                    <span class="apply-list-detail-name">招聘管理</span>
                                                </a>
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=HRM10000">
                                                    <span class="apply-list-detail-name">员工管理</span>
                                                </a>
                                            
                                        </div>
                                    </div>
                                
                                    <div class="menu-item flex">
                                        <div class="menu-item-scene flex">
                                            <a href="/index/subproduct-new/subproduct-new2.html" data-x-track-id="假勤管理">
                                                <i class="nav-sprite icon_jqgl"></i>
                                                <span class="scene-name" >假勤管理</span>
                                                <i class="go-to-scene-icon"></i>
                                            </a>
                                        </div>
                                        <div class="apply-list flex">
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=ATD00000">
                                                    <span class="apply-list-detail-name">假勤管理</span>
                                                </a>
                                            
                                        </div>
                                    </div>
                                
                                    <div class="menu-item flex">
                                        <div class="menu-item-scene flex">
                                            <a href="/index/subproduct-new/subproduct-new3.html" data-x-track-id="薪酬管理">
                                                <i class="nav-sprite icon_xcgl"></i>
                                                <span class="scene-name" >薪酬管理</span>
                                                <i class="go-to-scene-icon"></i>
                                            </a>
                                        </div>
                                        <div class="apply-list flex">
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=SAL00000">
                                                    <span class="apply-list-detail-name">智能算薪</span>
                                                </a>
                                            
                                        </div>
                                    </div>
                                
                                    <div class="menu-item flex">
                                        <div class="menu-item-scene flex">
                                            <a href="/index/subproduct-new/subproduct-new4.html" data-x-track-id="社保管理">
                                                <i class="nav-sprite icon_sbgl"></i>
                                                <span class="scene-name" >社保管理</span>
                                                <i class="go-to-scene-icon"></i>
                                            </a>
                                        </div>
                                        <div class="apply-list flex">
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=INS20000">
                                                    <span class="apply-list-detail-name">社保服务</span>
                                                </a>
                                            
                                        </div>
                                    </div>
                                
                                    <div class="menu-item flex">
                                        <div class="menu-item-scene flex">
                                            <a href="/index/subproduct-new/subproduct-new5.html" data-x-track-id="个税管理">
                                                <i class="nav-sprite icon_gsgl"></i>
                                                <span class="scene-name" >个税管理</span>
                                                <i class="go-to-scene-icon"></i>
                                            </a>
                                        </div>
                                        <div class="apply-list flex">
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=TAX00000">
                                                    <span class="apply-list-detail-name">个税服务</span>
                                                </a>
                                            
                                        </div>
                                    </div>
                                
                                    <div class="menu-item flex">
                                        <div class="menu-item-scene flex">
                                            <a href="/index/subproduct-new/subproduct-new6.html" data-x-track-id="薪资代发">
                                                <i class="nav-sprite icon_xzdf"></i>
                                                <span class="scene-name" >薪资代发</span>
                                                <i class="go-to-scene-icon"></i>
                                            </a>
                                        </div>
                                        <div class="apply-list flex">
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=APM00000">
                                                    <span class="apply-list-detail-name">薪资代发</span>
                                                </a>
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=PRL00000">
                                                    <span class="apply-list-detail-name">电子工资单</span>
                                                </a>
                                            
                                        </div>
                                    </div>
                                
                                    <div class="menu-item flex">
                                        <div class="menu-item-scene flex">
                                            <a href="/index/subproduct-new/subproduct-new11.html" data-x-track-id="团体福利">
                                                <i class="nav-sprite icon_tdfl"></i>
                                                <span class="scene-name" >团体福利</span>
                                                <i class="go-to-scene-icon"></i>
                                            </a>
                                        </div>
                                        <div class="apply-list flex">
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=RPT00000">
                                                    <span class="apply-list-detail-name">企业红包</span>
                                                </a>
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=WLF00000">
                                                    <span class="apply-list-detail-name">企业福利</span>
                                                </a>
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=WLF80000">
                                                    <span class="apply-list-detail-name">企业团险</span>
                                                </a>
                                            
                                        </div>
                                    </div>
                                
                            </div>
                            <div class="menu-content menu-cai">
                                
                                    <div class="menu-item flex">
                                        <div class="menu-item-scene flex">
                                            <a href="/index/subproduct-new/subproduct-new7.html"  data-x-track-id="发票管理">
                                                <i class="nav-sprite icon_fpgl"></i>
                                                <span class="scene-name" >发票管理</span>
                                                <i class="go-to-scene-icon"></i>
                                            </a>
                                        </div>
                                        <div class="apply-list flex">
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=FPY00000">
                                                    <span class="apply-list-detail-name">进项发票</span>
                                                </a>
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=FPY00000">
                                                    <span class="apply-list-detail-name">销项发票</span>
                                                </a>
                                            
                                        </div>
                                    </div>
                                
                                    <div class="menu-item flex">
                                        <div class="menu-item-scene flex">
                                            <a href="/index/subproduct-new/subproduct-new8.html"  data-x-track-id="费用管理">
                                                <i class="nav-sprite icon_fygl"></i>
                                                <span class="scene-name" >费用管理</span>
                                                <i class="go-to-scene-icon"></i>
                                            </a>
                                        </div>
                                        <div class="apply-list flex">
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=TRAP0000">
                                                    <span class="apply-list-detail-name">差旅服务</span>
                                                </a>
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=CORE0000">
                                                    <span class="apply-list-detail-name">日常报销</span>
                                                </a>
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=SUPR0000">
                                                    <span class="apply-list-detail-name">对公报账</span>
                                                </a>
                                            
                                        </div>
                                    </div>
                                
                                    <div class="menu-item flex">
                                        <div class="menu-item-scene flex">
                                            <a href="/index/subproduct-new/subproduct-new9.html"  data-x-track-id="财务核算">
                                                <i class="nav-sprite icon_cwgl"></i>
                                                <span class="scene-name" >财务核算</span>
                                                <i class="go-to-scene-icon"></i>
                                            </a>
                                        </div>
                                        <div class="apply-list flex">
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=FNC00000">
                                                    <span class="apply-list-detail-name">智能记账</span>
                                                </a>
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=AMM00000">
                                                    <span class="apply-list-detail-name">资产管理</span>
                                                </a>
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=BFP00000">
                                                    <span class="apply-list-detail-name">会计引擎</span>
                                                </a>
                                            
                                        </div>
                                    </div>
                                
                                    <div class="menu-item flex">
                                        <div class="menu-item-scene flex">
                                            <a href="/index/subproduct-new/subproduct-new10.html"  data-x-track-id="应收应付">
                                                <i class="nav-sprite icon_ysyf"></i>
                                                <span class="scene-name" >应收应付</span>
                                                <i class="go-to-scene-icon"></i>
                                            </a>
                                        </div>
                                        <div class="apply-list flex">
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=HSP00000">
                                                    <span class="apply-list-detail-name">医招智付</span>
                                                </a>
                                            
                                        </div>
                                    </div>
                                
                            </div>
                            <div class="menu-content menu-shi">
                                
                                    <div class="menu-item flex">
                                        <div class="menu-item-scene flex">
                                            
                                                <a href="/index/subproduct-new/subproduct-new13.html"  data-x-track-id="审批管理">
                                                    <i class="nav-sprite icon_spgl"></i>
                                                    <span class="scene-name" >审批管理</span>
                                                    <i class="go-to-scene-icon"></i>
                                                </a>
                                            
                                        </div>
                                        <div class="apply-list flex">
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=BPM00000" class="">
                                                    <span class="apply-list-detail-name">OA审批</span>
                                                </a>
                                            
                                        </div>
                                    </div>
                                
                                    <div class="menu-item flex">
                                        <div class="menu-item-scene flex">
                                            
                                                <a href="/index/subproduct-new/subproduct-new12.html"  data-x-track-id="数据分析">
                                                    <i class="nav-sprite icon_sjfx"></i>
                                                    <span class="scene-name" >数据分析</span>
                                                    <i class="go-to-scene-icon"></i>
                                                </a>
                                            
                                        </div>
                                        <div class="apply-list flex">
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=CBI00000" class="">
                                                    <span class="apply-list-detail-name">智数报表</span>
                                                </a>
                                            
                                        </div>
                                    </div>
                                
                                    <div class="menu-item flex">
                                        <div class="menu-item-scene flex">
                                            
                                                <i class="nav-sprite icon_tsyy"></i>
                                                <span class="scene-name" style="cursor:default">特色应用</span>
                                            
                                        </div>
                                        <div class="apply-list flex">
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=0081782967749" class="different-code-ect">
                                                    <span class="apply-list-detail-name">E餐通</span>
                                                </a>
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=reg438cc32088892" class="">
                                                    <span class="apply-list-detail-name">智慧园区</span>
                                                </a>
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=zhdj" class="">
                                                    <span class="apply-list-detail-name">智慧党建</span>
                                                </a>
                                            
                                                <a x-track-id href="/index/apply-center/apply-detail.html?menuCode=CTE00000" class="">
                                                    <span class="apply-list-detail-name">智慧工会</span>
                                                </a>
                                            
                                        </div>
                                    </div>
                                
                            </div>
                            <div class="line"></div>
                            
                            <div class="experience-zone">
                                <img src="/index/img/navigation/tiyan.png" />
                                <div class="desc">
                                    <h3>体验专区</h3>
                                    <div class="detail">先行一步，即刻体验。</div>
                                    <div class="detail">限时送30份合同。</div>
                                    <div class="link">
                                        <a x-track-id href="/helpapp/help.html#/autouse/list?from=xft-web-home">
                                        去体验 
                                        <img src="/index/img/navigation/arrow_right.png" />
                                        
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="right">
                        </div>
                    </div>
                </div>                
            </li>
            <li id="art-index-main-page-nav-solution-way" class="function-item solution-way">
                <a x-track-id href="javascript:;" class="function-item-link">解决方案</a>
                <i class="function-item-icon"></i>
                <div id="nav-solution" class="menu-sub-container solution-way">
                    <div class="left-bg"></div>
                    <div class="menu-sub-container-inner">
                        <div class="left">
                            <div class="tab-header">
                                <div class="title">行业</div>
                                <div class="title">解决方案</div>
                            </div>
                        </div>
                        <div class="nav-center">
                            
                                <a x-track-id href="/index/solution/solution1.html">
                                    <div class="solution-item">
                                        <i class="nav-sprite solution-way  icon-zzy"></i>
                                        <div class="desc">
                                            <div class="title">制造业</div>
                                            <div class="label">车间人效管理，差旅费用管控</div>
                                        </div>
                                    </div>
                                </a>
                            
                                <a x-track-id href="/index/solution/solution13.html">
                                    <div class="solution-item">
                                        <i class="nav-sprite solution-way  icon-gyqy"></i>
                                        <div class="desc">
                                            <div class="title">国有企业</div>
                                            <div class="label">满足政策、合规及数据安全需求</div>
                                        </div>
                                    </div>
                                </a>
                            
                                <a x-track-id href="/index/solution/solution9.html">
                                    <div class="solution-item">
                                        <i class="nav-sprite solution-way  icon-kjrj"></i>
                                        <div class="desc">
                                            <div class="title">科技（软件）</div>
                                            <div class="label">人事、财务费控全流程闭环管理</div>
                                        </div>
                                    </div>
                                </a>
                            
                                <a x-track-id href="/index/solution/solution3.html">
                                    <div class="solution-item">
                                        <i class="nav-sprite solution-way  icon-lsls"></i>
                                        <div class="desc">
                                            <div class="title">零售连锁（餐饮）</div>
                                            <div class="label">连锁门店数字化用工及财务管理</div>
                                        </div>
                                    </div>
                                </a>
                            
                                <a x-track-id href="/index/solution/solution2.html">
                                    <div class="solution-item">
                                        <i class="nav-sprite solution-way  icon-rlzy"></i>
                                        <div class="desc">
                                            <div class="title">人力资源</div>
                                            <div class="label">多项目员工薪酬社税管理</div>
                                        </div>
                                    </div>
                                </a>
                            
                                <a x-track-id href="/index/solution/solution10.html">
                                    <div class="solution-item">
                                        <i class="nav-sprite solution-way  icon-jtqy"></i>
                                        <div class="desc">
                                            <div class="title">集团企业</div>
                                            <div class="label">集团代发、复杂薪税统一管控</div>
                                        </div>
                                    </div>
                                </a>
                            
                        </div>
                    </div>
                </div>
            </li>
            <li class="function-item"><a x-track-id href="/index/customer-case-home/customer-case-home.html" class="function-item-link">客户案例</a></li>
            <li class="function-item"><a x-track-id href="/index/safety-protect/safety-protect.html" class="function-item-link">安全保障</a></li>
            <li id="art-index-main-page-nav-open-platform" class="function-item open-platform">
                <a x-track-id href="javascript:;" class="function-item-link">企业应用开发中心</a>
                <i class="function-item-icon"></i>
                <div id="nav-open-platform" class="menu-sub-container open-platform">
                    <div class="left-bg"></div>
                    <div class="menu-sub-container-inner">
                        <div class="left">
                            <div class="tab-header">
                                <div class="title">企业应用</div>
                                <div class="title">开发中心</div>
                            </div>
                        </div>
                        <div class="nav-center">
                            
                                <div class="menu-item">
                                    <div class="title">了解&#38;学习</div>
                                    <div class="submenu-box">
                                        
                                            <a x-track-id href="/open/#/portal" target="_blank">
                                                <i class="nav-sprite open-platform nav-icon-codeFriend"></i>
                                                <span class="submenu-list-item-text">了解开发中心</span>
                                            </a>
                                        
                                            <a x-track-id href="/open/#/solution/overview" target="_blank">
                                                <i class="nav-sprite open-platform nav-icon-solution"></i>
                                                <span class="submenu-list-item-text">解决方案</span>
                                            </a>
                                         
                                    </div>
                                </div>
                            
                                <div class="menu-item">
                                    <div class="title">平台工具</div>
                                    <div class="submenu-box">
                                        
                                            <a x-track-id href="/open/#/apiPortal" target="_blank">
                                                <i class="nav-sprite open-platform nav-icon-overview"></i>
                                                <span class="submenu-list-item-text">API平台</span>
                                            </a>
                                        
                                            <a x-track-id href="/open/#/connector/platform" target="_blank">
                                                <i class="nav-sprite open-platform nav-icon-connector"></i>
                                                <span class="submenu-list-item-text">连接平台</span>
                                            </a>
                                        
                                            <a x-track-id href="/open/#/lowCodePortal" target="_blank">
                                                <i class="nav-sprite open-platform nav-icon-portal"></i>
                                                <span class="submenu-list-item-text">低代码平台</span>
                                            </a>
                                        
                                            <a x-track-id href="/open/#/cbiPlatform" target="_blank">
                                                <i class="nav-sprite open-platform nav-icon-dataPlatform"></i>
                                                <span class="submenu-list-item-text">智数平台</span>
                                            </a>
                                         
                                    </div>
                                </div>
                            
                                <div class="menu-item">
                                    <div class="title">文档&#38;社区</div>
                                    <div class="submenu-box">
                                        
                                            <a x-track-id href="/open/#/doc-home" target="_blank">
                                                <i class="nav-sprite open-platform nav-icon-document"></i>
                                                <span class="submenu-list-item-text">文档中心</span>
                                            </a>
                                        
                                            <a x-track-id href="/community/#/article" target="_blank">
                                                <i class="nav-sprite open-platform nav-icon-developer"></i>
                                                <span class="submenu-list-item-text">开发者社区</span>
                                            </a>
                                         
                                    </div>
                                </div>
                            
                        </div>
                    </div>
                </div>   
            </li>
            <li class="function-item about-more">
                <a x-track-id href="javascript:;" class="function-item-link">了解更多</a>
                <i class="function-item-icon"></i>
                <div class="submenu-container">
                    
                    <div class="submenu-list-container">
                        <ul class="submenu-list">
                            
                            <li class="submenu-list-item">
                                <a x-track-id href="/index/about-us/about-us.html" >
                                    <!-- 就是纯粹的字符替换，不会计算和字符串相加，所以下面的结果变成了 <i class="submenu-list-item-icon " $value.icon title="kym" fwe></i> -->
                                    <!-- <i class=submenu-list-item-icon nav-icon-about title=kym fwe></i> -->
                                    <i class="submenu-list-item-icon nav-icon-about"></i>
                                    <span class="submenu-list-item-text">关于我们</span>
                                </a>
                            </li>
                            
                            <li class="submenu-list-item">
                                <a x-track-id href="/zx" >
                                    <!-- 就是纯粹的字符替换，不会计算和字符串相加，所以下面的结果变成了 <i class="submenu-list-item-icon " $value.icon title="kym" fwe></i> -->
                                    <!-- <i class=submenu-list-item-icon nav-icon-news title=kym fwe></i> -->
                                    <i class="submenu-list-item-icon nav-icon-news"></i>
                                    <span class="submenu-list-item-text">新闻资讯</span>
                                </a>
                            </li>
                            
                            <li class="submenu-list-item">
                                <a x-track-id href="/helpapp/#/help-main" target=&#34;_blank&#34; rel=&#34;opener&#34;>
                                    <!-- 就是纯粹的字符替换，不会计算和字符串相加，所以下面的结果变成了 <i class="submenu-list-item-icon " $value.icon title="kym" fwe></i> -->
                                    <!-- <i class=submenu-list-item-icon nav-icon-help title=kym fwe></i> -->
                                    <i class="submenu-list-item-icon nav-icon-help"></i>
                                    <span class="submenu-list-item-text">帮助中心</span>
                                </a>
                            </li>
                            
                            <li class="submenu-list-item">
                                <a x-track-id href="https://u.cmbchina.com/" target=&#34;_blank&#34; rel=&#34;opener&#34;>
                                    <!-- 就是纯粹的字符替换，不会计算和字符串相加，所以下面的结果变成了 <i class="submenu-list-item-icon " $value.icon title="kym" fwe></i> -->
                                    <!-- <i class=submenu-list-item-icon nav-icon-enterprise-portal title=kym fwe></i> -->
                                    <i class="submenu-list-item-icon nav-icon-enterprise-portal"></i>
                                    <span class="submenu-list-item-text">企业服务门户</span>
                                </a>
                            </li>
                            
                        </ul>
                    </div>
                    
                </div>
            </li>
        </ul>
        <div class="nav-btn-area">
            <a x-track-id href="/#/index" class="nav-normal-btn nav-normal-btn-login" target="_blank" rel="opener" onclick="clearAssit()">登录</a>
            <a x-track-id href="/#/register" class="nav-normal-btn" target="_blank" rel="opener" onclick="clearAssit()">免费注册</a>
        </div>
        <div class="navigation-contact-phone"><i></i><span>400-0695-555</span></div>
        <div class="navigation-download"><a x-track-id href="/index/download.html?channelCode=officialWebsite" target="_blank">下载薪福通</a></div>
        
    </div>
</div>
<script type="text/javascript">
    (function() {
        // E餐通 code码因环境不同而不同  生产环境-0081782967749  测试环境-3cea083309703
        function changeEctMenuCode(){
            var ectAElement = document.querySelector('.different-code-ect');
            var baseUrl = getHref();
            // 生产环境-对外
            if ((baseUrl.indexOf('xft-demo.cmbur') !== -1) || (baseUrl.indexOf('xft.cmbchina') !== -1)) {
                ectAElement.href = "/index/apply-center/apply-detail.html?menuCode=0081782967749"
            } else {
                ectAElement.href = "/index/apply-center/apply-detail.html?menuCode=3cea083309703"
            }
        }
        // changeEctMenuCode()

        var applyItemsElement = document.querySelectorAll('.apply-item');
        var menuContentsElement = document.querySelectorAll('.menu-content');
        for(var i=0;i<applyItemsElement.length;i++){
            applyItemsElement[i].addEventListener('click', function(index) {
                return function() {
                    changeMenuContent(index)
                };
            }(i));
            applyItemsElement[i].addEventListener('mouseover', function(index) {
                return function() {
                    changeMenuContent(index)
                };
            }(i));
        }

        function changeMenuContent(index){
            for(var i = 0; i < applyItemsElement.length; i++) {
                applyItemsElement[i].classList.remove('active');
                menuContentsElement[i].classList.remove('active');
            }
            applyItemsElement[index].classList.add('active');
            menuContentsElement[index].classList.add('active');
        }

        var navigationUrls = 
            [
                {pcUrl:"/index/six-modules/module1.html",mobileUrl:"/app-home/index/six-modules/module1.html"},
                {pcUrl:"/index/six-modules/module2.html",mobileUrl:"/app-home/index/six-modules/module2.html"},
                {pcUrl:"/index/six-modules/module3.html",mobileUrl:"/app-home/index/six-modules/module3.html"},
                {pcUrl:"/index/six-modules/module4.html",mobileUrl:"/app-home/index/six-modules/module4.html"},
                {pcUrl:"/index/six-modules/module5.html",mobileUrl:"/app-home/index/six-modules/module5.html"},
                {pcUrl:"/index/six-modules/module6.html",mobileUrl:"/app-home/index/six-modules/module6.html"},
                {pcUrl:"/index/subproduct/subproduct9.html",mobileUrl:"/app-home/index/subproduct/subproduct9.html"},
                {pcUrl:"/index/subproduct/subproduct14.html",mobileUrl:"/app-home/index/subproduct/subproduct14.html"},
                {pcUrl:"/index/subproduct/subproduct3.html",mobileUrl:"/app-home/index/subproduct/subproduct3.html"},
                {pcUrl:"/index/subproduct/subproduct2.html",mobileUrl:"/app-home/index/subproduct/subproduct2.html"},
                {pcUrl:"/index/subproduct/subproduct18.html",mobileUrl:"/app-home/index/subproduct/subproduct18.html"},
                {pcUrl:"/index/subproduct/subproduct15.html",mobileUrl:"/app-home/index/subproduct/subproduct15.html"},
                {pcUrl:"/index/subproduct/subproduct10.html",mobileUrl:"/app-home/index/subproduct/subproduct10.html"},
                {pcUrl:"/index/subproduct/subproduct5.html",mobileUrl:"/app-home/index/subproduct/subproduct5.html"},
                {pcUrl:"/index/subproduct/subproduct13.html",mobileUrl:"/app-home/index/subproduct/subproduct13.html"},
                {pcUrl:"/index/subproduct/subproduct17.html",mobileUrl:"/app-home/index/subproduct/subproduct17.html"}, 
                {pcUrl:"/index/subproduct/subproduct16.html",mobileUrl:"/app-home/index/subproduct/subproduct16.html"}, 
                {pcUrl:"/index/subproduct/subproduct12.html",mobileUrl:"/app-home/index/subproduct/subproduct12.html"}, 
                {pcUrl:"/index/subproduct/subproduct7.html",mobileUrl:"/app-home/index/subproduct/subproduct7.html"}, 
                {pcUrl:"/index/subproduct/subproduct6.html",mobileUrl:"/app-home/index/subproduct/subproduct6.html"}, 
                {pcUrl:"/index/subproduct/subproduct8.html",mobileUrl:"/app-home/index/subproduct/subproduct8.html"}, 
                {pcUrl:"/index/subproduct/subproduct4.html",mobileUrl:"/app-home/index/subproduct/subproduct4.html"}, 
                {pcUrl:"/index/subproduct/subproduct1.html",mobileUrl:"/app-home/index/subproduct/subproduct1.html"}, 
                {pcUrl:"/index/subproduct/subproduct19.html",mobileUrl:"/app-home/index/subproduct/subproduct19.html"}, 
                {pcUrl:"/index/subproduct/subproduct20.html",mobileUrl:"/app-home/index/subproduct/subproduct20.html"}, 
                {pcUrl:"/index/solution/solution1.html",mobileUrl:"/app-home/index/solution/solution1.html"}, 
                {pcUrl:"/index/solution/solution9.html",mobileUrl:"/app-home/index/solution/solution9.html"}, 
                {pcUrl:"/index/solution/solution10.html",mobileUrl:"/app-home/index/solution/solution10.html"},
                {pcUrl:"/index/solution/solution8.html",mobileUrl:"/app-home/index/solution/solution8.html"},
                {pcUrl:"/index/solution/solution2.html",mobileUrl:"/app-home/index/solution/solution2.html"},
                {pcUrl:"/index/solution/solution3.html",mobileUrl:"/app-home/index/solution/solution3.html"},
                {pcUrl:"/index/solution/solution4.html",mobileUrl:"/app-home/index/solution/solution4.html"},
                {pcUrl:"/index/solution/solution5.html",mobileUrl:"/app-home/index/solution/solution5.html"},
                {pcUrl:"/index/solution/solution6.html",mobileUrl:"/app-home/index/solution/solution6.html"},
                {pcUrl:"/index/solution/solution7.html",mobileUrl:"/app-home/index/solution/solution7.html"},
                {pcUrl:"/index/customer-case-home/customer-case-home.html",mobileUrl:"/app-home/index/customer-case-home/customer-case-home.html"},
                {pcUrl:"/index/safety-protect/safety-protect.html",mobileUrl:"/app-home/index/safety-protect/safety-protect.html"},
                {pcUrl:"/index/about-us/about-us.html",mobileUrl:"/app-home/index/about-us/about-us.html"},
                {pcUrl:"/index/customercase/customer-case-detail.html",mobileUrl:"/app-home/index/customercase/customer-case.html"},
                {pcUrl:"/index/subproduct-new/subproduct-new1.html",mobileUrl:"/app-home/index/subproduct-new/subproduct-new1.html"},
                {pcUrl:"/index/subproduct-new/subproduct-new2.html",mobileUrl:"/app-home/index/subproduct-new/subproduct-new2.html"},
                {pcUrl:"/index/subproduct-new/subproduct-new3.html",mobileUrl:"/app-home/index/subproduct-new/subproduct-new3.html"},
                {pcUrl:"/index/subproduct-new/subproduct-new4.html",mobileUrl:"/app-home/index/subproduct-new/subproduct-new4.html"},
                {pcUrl:"/index/subproduct-new/subproduct-new5.html",mobileUrl:"/app-home/index/subproduct-new/subproduct-new5.html"},
                {pcUrl:"/index/subproduct-new/subproduct-new6.html",mobileUrl:"/app-home/index/subproduct-new/subproduct-new6.html"},
                {pcUrl:"/index/subproduct-new/subproduct-new7.html",mobileUrl:"/app-home/index/subproduct-new/subproduct-new7.html"},
                {pcUrl:"/index/subproduct-new/subproduct-new8.html",mobileUrl:"/app-home/index/subproduct-new/subproduct-new8.html"},
                {pcUrl:"/index/subproduct-new/subproduct-new9.html",mobileUrl:"/app-home/index/subproduct-new/subproduct-new9.html"},
                {pcUrl:"/index/subproduct-new/subproduct-new10.html",mobileUrl:"/app-home/index/subproduct-new/subproduct-new10.html"},
                {pcUrl:"/index/subproduct-new/subproduct-new11.html",mobileUrl:"/app-home/index/subproduct-new/subproduct-new11.html"},
                {pcUrl:"/index/subproduct-new/subproduct-new12.html",mobileUrl:"/app-home/index/subproduct-new/subproduct-new12.html"},
                {pcUrl:"/index/subproduct-new/subproduct-new13.html",mobileUrl:"/app-home/index/subproduct-new/subproduct-new13.html"},
        ]
        
        // 参数串
        function getParamsStr() {
            var paramsStr = window.location.href.split('?')[1];
            // 有参数要加上?, 没有返回空串
            return paramsStr || '';
        }
        // 是否是移动端
        function isMobile() {
            var ua = navigator.userAgent;
            return /(?:Mobile)/.test(ua);
        }
        // 跳转移动端
        function gotoMobile(){
            if(isMobile()){
                var currentPathName = window.location.pathname;
                var urlParam = getParamsStr();
                var params = urlParam ? '?' + urlParam : '';
                for(var i=0;i<navigationUrls.length;i++){
                    if(currentPathName === navigationUrls[i].pcUrl){
                        window.location.href = window.location.origin + navigationUrls[i].mobileUrl + params; 
                    }
                } 
            }
        }
        gotoMobile();
    
    })();
    // 登录页面与官网页面共存，返回首页无法更新 因此在登录页面将cookie 设置为过期
    function clearAssit(){
        var now = Date.now();
        var expireTime = new Date(now - 86400000);  
        document.cookie = "cmb-assist=; path=/; expires=" + expireTime.toUTCString();
    }
</script>
        <!-- <div class="empty-box"></div> -->
        
    <style>
    /* banner组 */
    .art-index-main-page .index-banner{
        position: relative;
        overflow: hidden;
        height: 680px;
        width: 100%;
        background-size: 100% 100%;
    }
    
    .art-index-main-page .index-banner .banner-container{
        position: relative;
        min-width: 100%;
        height: 680px;
        width: 100%;
        left: 0;
        top: 0;
        transition: left 0.5s ease-in-out;
    }
    
    .art-index-main-page .index-banner .banner-item-bg{
        height: 680px;
        width: 100%;
        background-repeat: no-repeat;
        background-position: center 0;
        background-size: 100% 100%;
        float: left;
        position: relative;
    }
    
    .art-index-main-page .index-banner .banner-item{
        height: 680px;
        width: 100%;
        background-repeat: no-repeat;
        background-position: center 0;
        position: relative;
        background-size: cover;
    }
    .art-index-main-page .index-banner .banner-btnDiv{
        height: 52px;
        min-width: 134px;
        padding: 0 40px;
        background-image: linear-gradient(114deg, #1966FF 0%, #3DC3F5 100%);
        border-radius: 6px;
        position: absolute;
        top: 398px;
        left: calc(50% - 600px);
        font-size: 18px;
        color: #FFFFFF;
        line-height: 52px;
        text-align: center;
        cursor: pointer;
        overflow: hidden;
    }
    .art-index-main-page .index-banner .banner-btnDiv .btn-bg-hover{
        height: 52px;
        width: 52px;
        background: #3DE5F5;
        opacity: 1;
        filter: blur(20px);
        position: absolute;
        left: 0;
        top: 0;
        display: none;
    }
    .art-index-main-page .index-banner .banner-btnDiv:hover .btn-bg-hover{
        display: block;
    }
    .art-index-main-page .index-banner .progress-container{
        position: absolute;
        left: 50%;
        bottom: 46px;
        transform: translateX(-50%);
    }
    
    .art-index-main-page .index-banner .progress-item{
        width: 80px;
        height: 48px;
        overflow: hidden;
        float: left;
        box-sizing: border-box;
        position: relative;
    }
    .art-index-main-page .index-banner .progress-item::before,
    .art-index-main-page .index-banner .progress-item .progress{
        position: absolute;
        display: block;
        width: 64px;
        height: 4px;
        border-radius: 2px;
        top: 22px;
        left: 9px;
    }
    .art-index-main-page .index-banner .progress-item::before{
        content: '';
        background: rgba(25, 102, 255, 0.26);
    }
    
    .art-index-main-page .index-banner .progress-item:not(.current):hover::before{
        background: rgba(25, 102, 255, 0.45);
    }
    
    .art-index-main-page .index-banner .progress-item .progress{
        width: 0;
        height: 4px;
        background: rgb(25, 102, 255);
        transition: none;
    }
    
    .art-index-main-page .index-banner .progress-item:not(.current){
        cursor: pointer;
    }
    
    .art-index-main-page .index-banner .progress-item.current .progress{
        width: 64px;
        transition: width 10s ease-in-out;
    }
    
    /* 默认banner */
    .art-index-main-page .index-banner .banner-item-bg.default{
        background: url('/index/img/index/bg.png') center no-repeat;
        background-size: cover;
    }
    
    .art-index-main-page .index-banner .default .banner-item .center{
        width: 1200px;
        height: 100%;
        padding-top: 427px;
        margin: 0 auto;
        position: relative;
    }
    .art-index-main-page .index-banner .default .banner-item .center .detail{
        margin-left: 34px;
    }
    .art-index-main-page .index-banner .default .banner-item .center .detail .banner-btn-other{
        display: block;
        height: 52px;
        background-image: linear-gradient(114deg, #1966FF 0%, #3DC3F5 100%);
        border-radius: 6px;
        cursor: pointer;
        float: left;
        margin-right: 24px;
        position: relative;
        overflow: hidden;
    }
    .art-index-main-page .index-banner .default .banner-item .center .detail .banner-btn-other .btn-bg-hover{
        height: 52px;
        width: 52px;
        background: #3DE5F5;
        opacity: 1;
        filter: blur(20px);
        position: absolute;
        
        left: 0;
        display: none;
    }
    .art-index-main-page .index-banner .default .banner-item .center .detail .banner-btn-other:hover .btn-bg-hover{
        display: block;
    }
    .art-index-main-page .index-banner .default .banner-item .center .detail .banner-btn-other a{
        text-decoration: none;
        height: 100%;
        font-size: 18px;
        color: #FFFFFF;
        line-height: 32px;
        text-align: center;
        display: inline-block;
        padding: 10px 32px;
    }
    .art-index-main-page .index-banner .default .banner-item .center .detail .banner-btn-register{
        height: 52px;
        border: 1px solid #1966ff;
        border-radius: 6px;
        cursor: pointer;
        float: left;
    }
    .art-index-main-page .index-banner .default .banner-item .center .detail .banner-btn-register a{
        text-decoration: none;
        height: 100%;
        font-size: 18px;
        color: #1966ff;
        line-height: 32px;
        text-align: center;
        display: inline-block;
        padding: 10px 32px;
    }
    .art-index-main-page .index-banner .default .banner-item{
        overflow: hidden;
    }

    .art-index-main-page .index-banner .default .banner-item .video{
        position: absolute;
        width: 1920px;
        height: 100%;
        top: 0px;
        left: 50%;
        margin-left: -960px;
    }
    
    .art-index-main-page .index-banner .default .banner-item  .video .first-video{
        width: 100%;
        height: 100%;
    }
    .art-index-main-page .index-banner .default .banner-item  .video .first-video.hide{
        display:none;
    }
    
    .art-index-main-page .index-banner .banner-container .banner-link-a{
        display: block;
        width: 211px;
        text-decoration: none;
        margin-left: auto;
        margin-right: auto;
    }
    .art-index-main-page .index-banner .banner-container .banner-link{
        width: 211px;
        height: 42px;
        border: 1px solid #FFFFFF;
        border-radius: 4px;
        font-size: 18px;
        color: #FFFFFF;
        text-align: center;
        line-height: 24px;
        font-weight: 500;
        padding-top: 8px;
        cursor: pointer;
    }
    /** 视频播放 */
    .art-index-main-page .index-banner .conference-dialog{
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: url('/index/img/index/conference/bg.jpg') top center no-repeat ;
        background-size: 100% 100%;
        display: none;
        overflow-y: auto;
    }
    .art-index-main-page .index-banner .conference-dialog .content{
        width: 100%;
        min-width: 1200px;
        padding-top: 54px;
        position: relative;
        min-height: 935px;
    }
    .art-index-main-page .index-banner .conference-logo{
        width: 302px;
        height: 47px;
        background: url('/index/img/index/conference/logo.png') center no-repeat ;
        margin-left: 88px;
        margin-bottom: 63px;
    }
    .art-index-main-page .index-banner .conference-title{
        width: 704px;
        height: 49px;
        background: url('/index/img/index/conference/title.png') center no-repeat ;
        margin: 0 auto;
        margin-bottom: 26px;
    }
    .art-index-main-page .index-banner .conference-sub-title{
        width: 896px;
        height: 32px;
        background: url('/index/img/index/conference/sub_title.png') center no-repeat ;
        margin: 0 auto;
        margin-bottom: 40px;
    }
    .art-index-main-page .index-banner .conference-video-outer{
        width: 1019px;
        height: 573px;
        margin: 0 auto;
    }

    .art-index-main-page .index-banner .conference-video-outer{
        width: 1019px;
        height: 573px;
        margin: 0 auto;
    }
    .art-index-main-page .index-banner .conference-close{
        position: absolute;
        top: 44px;
        right: 88px;
        width: 64px;
        height: 64px;
        background: url('/index/img/index/conference/close.png') center no-repeat;
        cursor: pointer;
    }
</style>
<div class="index-banner">
    <!-- 轮播长图容器 -->
    <div class="banner-container">
        <!-- 单个轮播内容容器 -->
        <div class="banner-item-bg default">
            <!-- 主图固定宽高 -->
            <div class="banner-item">
                <div class="video">
                    <!-- <video class="first-video" autoplay="autoplay" loop data-src="/index/img/index/index_banner.mp4?t=20231122" muted></video> -->
                    <video id="admissionVideo" class="first-video" autoplay="autoplay"  data-src="/index/img/index/admission_banner.mp4" muted></video>
                    <video id="loopVideo" class="first-video"  loop data-src="/index/img/index/loop_banner.mp4" muted></video>
                </div>
                <div class="center">
                    <div class="detail">
                        <div class="banner-btn-other" onclick="window.open('/marketapp/xft-version-6.html', '_blank')" data-x-track-id="官网首页按钮">
                            <div class="btn-bg-hover"></div>
                            <a
                                href="javascript:;"
                                target="_blank"
                                rel="opener"
                            >
                                了解薪福通6.0
                            </a>
                        </div>
                        <div class="banner-btn-register">
                            <a
                                data-x-track-id="免费注册"
                                href="/#/register"
                                target="_blank"
                                rel="opener"
                            >
                                免费注册
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="progress-container">
        <!-- 用过渡，当宽度有0 -->
    </div>
    <div class="conference-dialog">
        <div class="content">
            <div class="conference-logo"></div>
            <div class="conference-close" onclick="hideConferenceDialog()"></div>
            <div class="conference-title"></div>
            <div class="conference-sub-title"></div>
            <div class="conference-video-outer">
                <video class="conference-video" width="1019" height="573" autoplay controls video controlsList="nodownload"></video>
            </div>
        </div>
        
    </div>
</div>

<script type="text/javascript">
(function () {
    var baseEle = document.querySelector('.art-index-main-page');
    var banner=[];
    var bannerTimer;
    var isWindowLoaded =false;
    var hasShowBanner =false;

    // 获取视频元素
    var admissionVideo = document.getElementById('admissionVideo');
    var loopVideo = document.getElementById('loopVideo');
    // 监听入场视频的ended事件
    admissionVideo.addEventListener('ended', () => {
        admissionVideo.classList.add("hide")
        // 播放循环视频
        loopVideo.play();
    });

    // 自动播放入场视频
    admissionVideo.play();

    subscribeLoaded(init);

    function gotoXft6(e){
        // 新开窗口
        e.preventDefault();
        window.open("/marketapp/xft-version-6.html", '_blank');
    }

    function ajax(url, data, successCallback) {
        var baseUrl = getHref();
        var xhr = new XMLHttpRequest();
        compatibleAddEvent(xhr, 'readystatechange', function () {
            if (this.readyState !== 4) return;
            try {
                successCallback(JSON.parse(this.responseText));
            } catch (e) { }
        });
        xhr.open('post', baseUrl + url);
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify(data || {}));
    }

    function reqBanner(){
        if(hasShowBanner){
            return;
        }
        ajax('/xft-gateway/marketing/xwapi/case/banner-list', null, function(res) {
            if(res && res.body && res.body.data){
                for(let i=0;i<res.body.data.length;i++){
                    if (res.body.data[i].bannerCode === 'banner_home_web') {
                        banner.push(res.body.data[i]);
                    }
                }
            }
            if(isWindowLoaded){
                hasShowBanner = true;
                showBanner();
            }
        });
    }

    window.reqBanner = reqBanner;

    // 重置banner的宽度
    function resetBanner(){
        if(location.hash){
            return;
        }
        if(!banner || !banner.length){
            return;
        }
        var bannerGroup = baseEle.querySelector('.index-banner');
        var bannerWidth = bannerGroup.offsetWidth;
        var bannerContainer = baseEle.querySelector('.banner-container');
        var bannerList = bannerContainer.children;
        bannerContainer.style.width = bannerList.length*bannerWidth+'px';

        for(var i=0;i<bannerList.length;i++){
            bannerList[i].style.width = bannerWidth+'px';
        }

        var currentBanner = baseEle.querySelector('.progress-item.current');
        if(currentBanner){
            setCurrentBanner(currentBanner.getAttribute('index'));
        }

        // 解决缩放时，还在执行定时滚动
        if(bannerContainer.timer){
            clearInterval(bannerContainer.timer);
            bannerContainer.timer = null;
            if(bannerContainer.callback){
                bannerContainer.callback()
            }
        }

        if(bannerTimer){
            clearInterval(bannerTimer);
        }

        bannerTimer=setInterval(function(){
            imageNext();//每两秒执行一次next的点击函数，实现定时轮播切换
        },10000);
    }

    // 设置显示当前的banner
    function setCurrentBanner(currentIdx, callback){
        var bannerContainer = baseEle.querySelector('.banner-container');
        var bannerGroup = baseEle.querySelector('.index-banner');
        var focusWidth = bannerGroup.offsetWidth;
        var target = -currentIdx*focusWidth;

        if(bannerContainer.timer){
            clearInterval(bannerContainer.timer);//清除定时器防止定时器重复添加
            bannerContainer.timer = null;
        }
        bannerContainer.style.left=target+'px'; //实现运动
        if(callback){
            bannerContainer.callback = callback;//如果有回调函数，执行回调函数
            callback();
        }
    }

    // 设置显示当前的滚动条
    function setCurrentProgress(currentIdx){
        var button = baseEle.querySelector('.progress-container');
        var progressList = button.children;
        for(var i=0;i<progressList.length;i++){
            progressList[i].className='progress-item';
        };
        progressList[currentIdx].className='progress-item current';
    }

    var bannerNum=0;
    var bannerFlag=true;
    function imageNext(){
        var bannerContainer = baseEle.querySelector('.banner-container');
        var lengths = bannerContainer.children.length;
        // flag节流阀防止动画运行过快
        if(bannerFlag){ 
            bannerFlag=false;

            bannerNum++;
            if(bannerNum >= lengths){
                bannerNum = 0;
            }
           
            setCurrentBanner(bannerNum, function(){
                bannerFlag=true;
            });

            setCurrentProgress(bannerNum);
        }
    }

    function showBanner(){
        if(!banner || !banner.length){
            return;
        }
        var bannerGroup = baseEle.querySelector('.index-banner');
        var bannerContainer = baseEle.querySelector('.banner-container');
        var defaultBanner = baseEle.querySelector('.banner-item-bg');
        // 进度条
        var button = baseEle.querySelector('.progress-container');

        // 创建横幅
        function createBanner(bannerItem){
            var imageBg=document.createElement('div');
            var image=document.createElement('div');
            imageBg.className='banner-item-bg';
            image.className='banner-item';
            if (bannerItem.coverUrl && bannerItem.bannerCode === 'banner_home_web') {
                imageBg.style.backgroundImage = 'URL('+bannerItem.coverUrl+')';
                image.style.backgroundImage = 'URL('+bannerItem.coverUrl+')';
            }
            imageBg.appendChild(image);

            if(bannerItem.buttonFlag === 'Y'){
                var btnDiv=document.createElement('div');
                btnDiv.className='banner-btnDiv';
                btnDiv.innerText = (bannerItem.buttonText || '').slice(0,8);

                // 鼠标跟随渐变div
                var changeDiv=document.createElement('div');
                changeDiv.className="btn-bg-hover";

                btnDiv.appendChild(changeDiv);
                imageBg.appendChild(btnDiv);

                var leftWidth = (screen.width - 1200)/2;
                compatibleAddEvent(btnDiv, 'mousemove', function(e){
                    var left = e.pageX- leftWidth;
                    if(left<(btnDiv.offsetWidth) || left>0){
                        changeDiv.style.left = (left-26)+'px'; 
                    }else if(left<=0){
                        changeDiv.style.left = '-26px';
                    }
                    else if(left>=btnDiv.offsetWidth){
                        changeDiv.style.left = (btnDiv.offsetWidth - 26) +'px';
                    }
                }, true);

                if(bannerItem.openUrl){
                    compatibleAddEvent(btnDiv, 'click',function(){
                        window.open(bannerItem.openUrl, '_blank');
                    });
                    btnDiv.style.cursor = 'pointer';
                }
            }

            bannerContainer.appendChild(imageBg);
        }

        for(var i=0;i<banner.length;i++){
            createBanner(banner[i]);
        }

        var length = bannerContainer.children.length;

        showBannerDetail();

        // 创建进度条
        for(var i=0;i<length;i++){
            var item=document.createElement('div');
            var progress=document.createElement('div');
            item.className='progress-item';
            progress.className='progress';
            item.appendChild(progress)
            button.appendChild(item);// 动态添加进度横条，进度横条个数跟随图片个数变化
            item.setAttribute('index',i);//设置自定义属性index
        }

        var progressList=button.children;
        for(var i=0;i<progressList.length;i++){
            compatibleAddEvent(progressList[i], 'click',function(ev){
                ev.stopPropagation();

                if(this.className.indexOf('current') !== -1){
                    return;
                }

                var index = this.getAttribute('index');
                bannerNum = index;

                setCurrentProgress(index);
                setCurrentBanner(index);
                resetBanner();
            })
        }

        setTimeout(function () {
            resetBanner();
            setCurrentProgress(0)
        }, 0);
    }

    compatibleAddEvent(window, "resize", resetBanner);
    
    var timeStatus;
    var openWithNewPage;
    var buttonText = '回顾发布会';
    var conferenceUrl;
    var videoEle;
    var btnOther = document.querySelector('.index-banner .detail .banner-btn-other');
    var bannerBtnOtherHover = btnOther.querySelector('.btn-bg-hover');
    var BtnOtherLeft = ((screen.width - 1200)/2)+24;
    btnOther.addEventListener('mousemove',function(e) {
        var left = e.pageX- BtnOtherLeft;
        if (left<(btnOther.offsetWidth) || left>0) {
            bannerBtnOtherHover.style.left = (left-26)+'px'; 
        } else if(left<=0) {
            bannerBtnOtherHover.style.left = '-52px';
        } else if(left>=btnOther.offsetWidth) {
            bannerBtnOtherHover.style.left = (btnOther.offsetWidth - 26) +'px';
        }
    },true);
    function hideConferenceDialog(){
        videoEle.pause();
        var outerEle = baseEle.querySelector('.conference-video-outer');
        outerEle.removeChild(videoEle);
        var conferenceDialogEle = baseEle.querySelector('.conference-dialog');
        conferenceDialogEle.style.display ='none'
    }

    window.hideConferenceDialog = hideConferenceDialog;
    
    function showConferenceDialog(){
        var conferenceDialogEle = baseEle.querySelector('.conference-dialog');
        conferenceDialogEle.style.display ='block'
        if(!videoEle){
            videoEle = baseEle.querySelector('.conference-video');
        }else{
            var outerEle = baseEle.querySelector('.conference-video-outer');
            outerEle.appendChild(videoEle);
        }
    }

    function loadHls(callback) {
        if (Hls && Hls.isSupported()) {
            callback && callback();
            return;
        }
        var node = document.createElement('script');
        var loadeSuccess = () => {
            callback && callback();
        };
        node.addEventListener('load', loadeSuccess);
        node.src = '/index/js/index/hls.min.js?t=1740559684082';
        node.type = 'text/javascript';
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }

    function showBannerDetail(){
        if (timeStatus === 'show') {
            var buttonEle = baseEle.querySelector('.index-banner .detail .banner-btn-other');
            buttonEle.style.display = 'block';
            buttonEle.querySelector('a').innerText = buttonText;
            if (openWithNewPage) {
                // 新开窗口
                buttonEle.onclick = function (e) {
                    e.preventDefault();
                    window.open(conferenceUrl, '_blank');
                }
            } else {
                // 视频播放
                loadHls(function() {
                    if (Hls && Hls.isSupported()) {
                        buttonEle.onclick = function (e) {
                            e.preventDefault();
                            showConferenceDialog();
                            var hls = new Hls();
                            hls.loadSource(conferenceUrl);
                            hls.attachMedia(videoEle);
                        }
                    }
                });
            }
        }
    }

    function getTimeStatus(){
        var isDemo = window.location.search.indexOf('demoFlag=true') > -1;
        // 修改loadinit中的initObj对象
        if (isDemo && initObj && initObj.pagePath) {
            initObj.pagePath = document.location.pathname + document.location.search;
        }

        ajax('/xft-gateway/marketing/xwapi/case/banner-live', isDemo ? {demoFlag: true} : null, function(data) {
            if (data && data.returnCode === 'SUC0000') { //网络请求成功
                timeStatus = data.body.status || 'hide';
                conferenceUrl = data.body.linkUrl || '';
                buttonText = data.body.buttonText || buttonText;
                openWithNewPage = data.body.openWithNewPage;
                showBannerDetail();
            }
        });
    }

    function init(){
        isWindowLoaded = true;
        // getTimeStatus();
        if(!hasShowBanner){
            showBanner();
        }
    }

})();
</script>
    <style>
    .art-index-main-page .index-news-consult{
        width: 1200px;
        height: 72px;
        box-shadow: 0px 8px 20px 0px rgba(178,198,230,0.27);
        border-radius: 8px;
        background: url('/index/img/index/news_consult.png') center no-repeat;
        position: absolute;
        top: 704px;
        left: 50%;
        transform: translateX(-50%);
        padding: 0px 24px;
    }
    .art-index-main-page .index-news-consult .news-icon{
        width: 32px;
        height: 32px;
        float: left;
        margin-right: 16px;
        background: url('/index/img/index/news-icon.png') center no-repeat;
        background-size: cover;
        margin-top: 20px;
    }
    .art-index-main-page .index-news-consult .news-title{
        height: 32px;
        float: left;
        font-size: 20px;
        color: #1966FF;
        line-height: 29px;
        font-weight: 600;
        margin-right: 4px;
        margin-top: 22px;
    }
    .art-index-main-page .index-news-consult .news-detail{
        width: 980px;
        height: 29px;
        overflow: hidden;
        float: left;
        margin-top: 22px;
    }
    .art-index-main-page .index-news-consult .news-detail-content-1, .news-detail-content-2{
    }
    .art-index-main-page .index-news-consult .news-detail li{
        height: 29px;
        font-size: 20px;
        line-height: 29px;
        font-weight: 400;
        margin-right: 16px;
        list-style: none;
    }
    .art-index-main-page .index-news-consult .news-detail li a{
        color: #47506B;
        text-decoration: none;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
        overflow: hidden;
        display: block;
    }
</style>
<div class="index-news-consult">
    <div class="news-icon"></div>
    <div class="news-title">新闻资讯</div>
    <div class="news-detail">
        <div style="height: 29px; background:none;margin-left: 0;">
            <ul class="news-detail-content-1">
            </ul>           
            <ul class="news-detail-content-2">
            </ul>
        </div>
    </div>              
</div>

<script type="text/javascript">
    var baseEle = document.querySelector('.art-index-main-page');
    var indexNewsConsultData = [];
    var hasReqIndexNewsConsultData = false;
    var marqueeVar;
    var setTimeoutVar; // 资讯停留的延时
    subscribeLoaded(init);
    function init(){
        if (hasReqIndexNewsConsultData) {
            showIndexNews();
        }
    }
    function reqIndexNewsConsultBanner(){
        if (hasReqIndexNewsConsultData) {
            showIndexNews();
            return;
        }
        var baseUrl = getHref();
        var params = {
            "condition": {
              "boards": [
                {
                  "boardId": "0000000000000000"
                }
              ]
            },
            "page": 1,
            "size": 5,
            "sortOrders": [
              {
                "column": "",
                "direction": "DESC"
              }
            ]
          }
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState !== 4) return
            try {
                var data = JSON.parse(this.responseText);
                hasReqIndexNewsConsultData = true;
                indexNewsConsultData = data && data.data || [];
                showIndexNews();
            } catch (e) { }
        });
        xhr.open('post', baseUrl + '/omsapi/platform/content/bulletin/open/news/v1/published/service/query/page');
        xhr.withCredentials = true;
        if((baseUrl.indexOf('web-home') !== -1) || (baseUrl.indexOf('localhost') !== -1)){
            xhr.setRequestHeader('appid','xft-platform');
            xhr.setRequestHeader('appsecret','xft-platform');
            xhr.setRequestHeader('X-TAG-Version','M21CB081');
        }else{
        // 生产使用
            xhr.setRequestHeader('appid','xft-platform');
            xhr.setRequestHeader('appsecret','68e65720e4d3476fbfff3aed3be92d4b');
        }
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify(params));
    }
    
    function showIndexNews (data) {
        data = indexNewsConsultData;
        if(!data || !data.length){
            return;
        }
        var outerEle = baseEle.querySelector('.news-detail');
        var contentEle = baseEle.querySelector('.news-detail-content-1');
        var text = '';
        for (var i = 0; i < data.length; i++) {
            var element = data[i];
            var openUrl = '/new/' + element.instanceId + '.html'
            text +=  '<li><a href="' + openUrl + '" target="_blank">'  + element.bulletinTitle + '</a></li>';
        }
        contentEle.innerHTML = text;
        if (contentEle.scrollHeight > outerEle.clientHeight) {
           indexNewsMarqueeStart();
        }
    }
    //js无缝滚动代码
    var scrollTopUpdate = 0;
    function indexNewsMarquee(){
        var obj = baseEle.querySelector(".news-detail");
        var content1Height = Math.round(baseEle.querySelector(".news-detail-content-1").offsetHeight);
        var liHight = Math.round(baseEle.querySelector(".news-detail-content-1 li").offsetHeight);
        if (obj.scrollTop >= content1Height){
            scrollTopUpdate = 0;
        }else{
            scrollTopUpdate++;
        }
        obj.scrollTop = scrollTopUpdate;
        // 一条资讯滚动完成，停留3s
        if (scrollTopUpdate > 0 && scrollTopUpdate % liHight === 0) {
            delayScroll();
        }
    }

    function indexNewsMarqueeStart(){
        var obj = baseEle.querySelector(".news-detail");
        var obj1 = baseEle.querySelector(".news-detail-content-1");
        var obj2 = baseEle.querySelector(".news-detail-content-2");

        obj2.innerHTML = obj1.innerHTML;
        delayScroll();
        obj.onmouseover = function(){
            window.clearInterval(marqueeVar);
            window.clearTimeout(setTimeoutVar);
        }
        obj.onmouseout = function(){
            delayScroll();
        }
    }

    /** 资讯停留3s后滚动 */
    function delayScroll() {
        window.clearInterval(marqueeVar);
        window.clearTimeout(setTimeoutVar);
        setTimeoutVar = window.setTimeout(function(){
            console.log('setTimeoutVar==');
                marqueeVar = window.setInterval(indexNewsMarquee, 17);
        }, 3000);
    }
</script>


    

<style>
    .art-index-main-page .index-platform{
        width: 100%;
        background-image: url('/index/img/index/platform/bg.png');
        background-repeat: no-repeat;
    }
    .art-index-main-page .index-platform .main-title{
        padding-top: 116px;
        font-size: 40px;
        color: #0B1636;
        font-weight: 600;
        text-align: center;
        margin-bottom: 12px;
    }

    .art-index-main-page .index-platform .sub-title{
        font-size: 18px;
        color: #47506B;
        font-weight: 400;
        text-align: center;
        margin-bottom: 16px;
    }

    .art-index-main-page .index-platform .tab-header{
        margin: 0 auto;
        width: 1200px;
        height: 140px;
        box-sizing: border-box;
        display:flex;
        align-items:center;
        justify-content: center;
    }

    .art-index-main-page .index-platform .tab-header li{
        width: 242px;
        height: 138px;
        box-sizing: border-box;
        cursor: pointer;
        margin-left:24px;
        transition: background 0.2s ease;
    }
    .art-index-main-page .index-platform .tab-header li.tab_ren{
        background:url("/index/img/index/platform2/tab_ren.png");
        margin-left:0;
    }
    .art-index-main-page .index-platform .tab-header li.active.tab_ren{
        background:url("/index/img/index/platform2/tab_ren_hover.png")
    }

    .art-index-main-page .index-platform .tab-header li.tab_cai{
        background:url("/index/img/index/platform2/tab_cai.png")
    }
    .art-index-main-page .index-platform .tab-header li.active.tab_cai{
        background:url("/index/img/index/platform2/tab_cai_hover.png")
    }

    .art-index-main-page .index-platform .tab-header li.tab_shi{
        background:url("/index/img/index/platform2/tab_shi.png")
    }
    .art-index-main-page .index-platform .tab-header li.active.tab_shi{
        background:url("/index/img/index/platform2/tab_shi_hover.png")
    }

    .art-index-main-page .index-platform .tab-header li.tab_open{
        background:url("/index/img/index/platform2/tab_open.png")
    }
    .art-index-main-page .index-platform .tab-header li.active.tab_open{
        background:url("/index/img/index/platform2/tab_open_hover.png")
    }


    .art-index-main-page .index-platform .tab-content{
        width: 100%;
        height: 650px;
        background-image: url('/index/img/index/platform2/bg.png');
        background-repeat: no-repeat;
        background-position: center bottom;
        padding:40px 0 106px 0;
        background-size:cover;
    }

    .art-index-main-page .index-platform .tab-content .center{
        display: none;
        margin: 0 auto;
        width: 1200px;
        height: 504px;
        position: relative;
        background: rgba(255,255,255,0.8);
        box-shadow: 0px 2px 40px 10px rgba(144,159,210,0.07), inset 3px 3px 0px 0px #FFFFFF;
        border-radius: 0px 6px 6px 1px;
        backdrop-filter: blur(2px);
    }

    .art-index-main-page .index-platform .tab-content .center.active{
        display: flex;
    }
    .art-index-main-page .index-platform .tab-content .center .scene-list{
        width:200px;
        height:100%;
        display:flex;
        flex-direction: column;
        padding:30px 0;
        background: rgba(255,255,255,0.8);
        box-shadow: 0px 2px 40px 10px rgba(144,159,210,0.07), inset 3px 3px 0px 0px #FFFFFF;
        border-radius: 6px 0px 0px 6px;
        backdrop-filter: blur(2px);
    }

    .art-index-main-page .index-platform .tab-content .center .scene-list .scene-list-item{
        width:200px;
        height:48px;
        display:flex;
        align-items: center;
        padding-left: 32px;
        cursor:pointer;
        margin-top:18px;
    }



    .art-index-main-page .index-platform .tab-content .center .scene-list .scene-list-item .scene-name {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 16px;
        color: #2A2A2A;
        line-height: 22px;
        text-align: left;
        font-style: normal;
        margin-left:8px;
        display: flex;
        flex-wrap: wrap;
    }

    .art-index-main-page .index-platform .tab-content .center .scene-list .scene-list-item.active{
        background: linear-gradient( 147deg, #1966FF 0%, #38B6F6 100%);
    }
    .art-index-main-page .index-platform .center .scene-list .scene-list-item .platform-sprite{
        background: url(/index/img/index/platform2/sprite-platform.png)  no-repeat;
        background-size:691px 745px;
        width:36px;
        height:36px;
    }
    .art-index-main-page .index-platform .tab-content .center .scene-list .scene-list-item .scene-icon{
        display:block;
    }
    .art-index-main-page .index-platform .tab-content .center .scene-list .scene-list-item .scene-icon-hover{
        display:none;
    }
    .art-index-main-page .index-platform .tab-content .center .scene-list .scene-list-item.active .scene-icon{
        display:none;
    }
    .art-index-main-page .index-platform .tab-content .center .scene-list .scene-list-item.active .scene-icon-hover{
        display:block;
    }
    .art-index-main-page .index-platform .center .scene-list .scene-list-item .platform-sprite.zzyg_1{
        background-position: -170px -168px; 
    }
    .art-index-main-page .index-platform .scene-list-item.active .platform-sprite.zzyg_2{
        background-position: -98px -168px; 
    }
    .art-index-main-page .index-platform .center .scene-list .scene-list-item .platform-sprite.jqgl_1{
        background-position: -170px -262px; 
    }
    .art-index-main-page .index-platform .scene-list-item.active .platform-sprite.jqgl_2{
        background-position: -98px -262px; 
    }
    .art-index-main-page .index-platform .center .scene-list .scene-list-item .platform-sprite.xcgl_1{
        background-position: -170px -215px; 
    }
    .art-index-main-page .index-platform .scene-list-item.active .platform-sprite.xcgl_2{
        background-position: -98px -215px; 
    }
    .art-index-main-page .index-platform .center .scene-list .scene-list-item .platform-sprite.sbgl_1{
        background-position: -170px -309px; 
    }
    .art-index-main-page .index-platform .scene-list-item.active .platform-sprite.sbgl_2{
        background-position: -98px -309px; 
    }
    .art-index-main-page .index-platform .center .scene-list .scene-list-item .platform-sprite.gsgl_1{
        background-position: -170px -358px; 
    }
    .art-index-main-page .index-platform .scene-list-item.active .platform-sprite.gsgl_2{
        background-position: -98px -358px; 
    }
    .art-index-main-page .index-platform .center .scene-list .scene-list-item .platform-sprite.xzdf_1{
        background-position: -170px -405px; 
    }
    .art-index-main-page .index-platform .scene-list-item.active .platform-sprite.xzdf_2{
        background-position: -98px -405px; 
    }
    .art-index-main-page .index-platform .center .scene-list .scene-list-item .platform-sprite.ttfl_1{
        background-position: -170px -452px; 
    }
    .art-index-main-page .index-platform .scene-list-item.active .platform-sprite.ttfl_2{
        background-position: -98px -452px; 
    }

    .art-index-main-page .index-platform .center .scene-list .scene-list-item .platform-sprite.fpgl_1{
        background-position: -170px -501px; 
    }
    .art-index-main-page .index-platform .scene-list-item.active .platform-sprite.fpgl_2{
        background-position: -98px -501px; 
    }
    .art-index-main-page .index-platform .center .scene-list .scene-list-item .platform-sprite.fygl_1{
        background-position: -170px -548px; 
    }
    .art-index-main-page .index-platform .scene-list-item.active .platform-sprite.fygl_2{
        background-position: -98px -548px; 
    }
    .art-index-main-page .index-platform .center .scene-list .scene-list-item .platform-sprite.cwgl_1{
        background-position: -169px -595px; 
    }
    .art-index-main-page .index-platform .scene-list-item.active .platform-sprite.cwgl_2{
        background-position: -97px -595px; 
    }
    .art-index-main-page .index-platform .center .scene-list .scene-list-item .platform-sprite.ysyf_1{
        background-position: -169px -642px; 
    }
    .art-index-main-page .index-platform .scene-list-item.active .platform-sprite.ysyf_2{
        background-position: -98px -642px; 
    }

    .art-index-main-page .index-platform .center .scene-list .scene-list-item .platform-sprite.spgl_1{
        background-position: -324px -228px; 
    }
    .art-index-main-page .index-platform .scene-list-item.active .platform-sprite.spgl_2{
        background-position: -246px -228px; 
    }
    .art-index-main-page .index-platform .center .scene-list .scene-list-item .platform-sprite.sjfx_1{
        background-position: -324px -275px; 
    }
    .art-index-main-page .index-platform .scene-list-item.active .platform-sprite.sjfx_2{
        background-position: -244px -275px; 
    }

    .art-index-main-page .index-platform .center .scene-list .scene-list-item .platform-sprite.xtdj_1{
        background-position: -324px -324px; 
    }
    .art-index-main-page .index-platform .scene-list-item.active .platform-sprite.xtdj_2{
        background-position: -246px -324px; 
    }
    .art-index-main-page .index-platform .center .scene-list .scene-list-item .platform-sprite.yykf_1{
        background-position: -324px -378px; 
    }
    .art-index-main-page .index-platform .scene-list-item.active .platform-sprite.yykf_2{
        background-position: -246px -378px; 
    }
    .art-index-main-page .index-platform .center .scene-list .scene-list-item .platform-sprite.bifw_1{
        background-position: -324px -426px; 
    }
    .art-index-main-page .index-platform .scene-list-item.active .platform-sprite.bifw_2{
        background-position: -246px -426px; 
    }

    .art-index-main-page .index-platform .tab-content .center .scene-list .scene-list-item.active .scene-name{
        color: #ffffff;
    }
    .art-index-main-page .index-platform .tab-content .center .scene-content{
        display:none;
    }

    .art-index-main-page .index-platform  .tab-content .center .scene-content.active{
        display:flex;
        flex:1;
    }

    .art-index-main-page .index-platform .tab-content .center .scene-content.active .scene-content-left {
        width:300px;
        height:100%;
        display:flex;
        flex-direction: column; 
        align-items: flex-start;
        justify-content: center;
        padding-left: 58px;
    }
    .art-index-main-page .index-platform .scene-content.active .scene-content-left .title{
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 24px;
        color: #343434;
        line-height: 33px;
        text-align: left;
        font-style: normal;
        margin-bottom:0;
    }
    .art-index-main-page .index-platform .scene-content.active .scene-content-left .label-row{
        display:flex;
        align-items:center;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 16px;
        color: #2D2D2D;
        line-height: 22px;
        text-align: left;
        font-style: normal;
        margin-top:25px;
    }
    .art-index-main-page .index-platform .scene-content.active .scene-content-left .label-row img{
        width:16px;
        height:13px;
        margin-right:10px;
    }

    .art-index-main-page .index-platform .scene-content.active .scene-content-left .go-to-scene-btn{
        width: 120px;
        height: 44px;
        margin-top:30px;
        background: linear-gradient( 147deg, #1966FF 0%, #38B6F6 100%);
        border-radius: 6px;
        display:flex;
        align-items: center;
        justify-content: center;
        cursor:pointer;
    }
    .art-index-main-page .index-platform .scene-content.active .scene-content-left .go-to-scene-btn .link{
        text-decoration: none;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 16px;
        color: #FFFFFF;
        line-height: 24px;
        text-align: left;
        font-style: normal;
    }
    .art-index-main-page .index-platform .scene-content.active .scene-img{
        width:700px;
        height 
    }

    
</style>

<div class="index-platform">
    <div class="main-title">一站式人财事数字开放平台</div>
    <div class="sub-title">招商银行旗下平台级SaaS产品</div>
    <div class="product-wrap">
        <div class="tab-panel">
            <ul class="tab-header">
                
                    <li class="active  tab_ren">
                        
                    </li>
                
                    <li class="  tab_cai">
                        
                    </li>
                
                    <li class="  tab_shi">
                        
                    </li>
                
                    <li class="  tab_open">
                        
                    </li>
                
            </ul>
            <div class="tab-content">
                <div class="center ren active">
                    <div class="scene-list">
                        
                            <div class="scene-list-item  active">
                                <i class="platform-sprite scene-icon zzyg_1"></i>
                                <i class="platform-sprite scene-icon-hover zzyg_2"></i>
                                <span class="scene-name">
                                    组织员工
                                </span>
                            </div>
                        
                            <div class="scene-list-item  ">
                                <i class="platform-sprite scene-icon jqgl_1"></i>
                                <i class="platform-sprite scene-icon-hover jqgl_2"></i>
                                <span class="scene-name">
                                    假勤管理
                                </span>
                            </div>
                        
                            <div class="scene-list-item  ">
                                <i class="platform-sprite scene-icon xcgl_1"></i>
                                <i class="platform-sprite scene-icon-hover xcgl_2"></i>
                                <span class="scene-name">
                                    薪酬管理
                                </span>
                            </div>
                        
                            <div class="scene-list-item  ">
                                <i class="platform-sprite scene-icon sbgl_1"></i>
                                <i class="platform-sprite scene-icon-hover sbgl_2"></i>
                                <span class="scene-name">
                                    社保管理
                                </span>
                            </div>
                        
                            <div class="scene-list-item  ">
                                <i class="platform-sprite scene-icon gsgl_1"></i>
                                <i class="platform-sprite scene-icon-hover gsgl_2"></i>
                                <span class="scene-name">
                                    个税管理
                                </span>
                            </div>
                        
                            <div class="scene-list-item  ">
                                <i class="platform-sprite scene-icon xzdf_1"></i>
                                <i class="platform-sprite scene-icon-hover xzdf_2"></i>
                                <span class="scene-name">
                                    薪资代发
                                </span>
                            </div>
                        
                            <div class="scene-list-item  ">
                                <i class="platform-sprite scene-icon ttfl_1"></i>
                                <i class="platform-sprite scene-icon-hover ttfl_2"></i>
                                <span class="scene-name">
                                    团体福利
                                </span>
                            </div>
                        
                    </div>
                    
                        <div class="scene-content ren active">
                            <div class="scene-content-left">
                                <div class="title">入转调离全流程管理</div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        扫码入职
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        电子合同
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        员工档案
                                    </div>
                                
                                <div class="go-to-scene-btn">
                                    <a
                                        class="link"
                                        x-track-id="入转调离全流程管理_了解更多"
                                        href="/index/subproduct-new/subproduct-new1.html"
                                        rel="opener"
                                    >
                                        了解更多 
                                    </a>
                                </div>
                            </div>
                            <img class="scene-img" src="/index/img/index/platform2/scene_zzyg.png" alt="xft" />
                        </div>
                    
                        <div class="scene-content ren ">
                            <div class="scene-content-left">
                                <div class="title">灵活考勤自动统计</div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        弹性工时、划线排班、多段班
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        考勤机/WiFi/GPS/蓝牙打卡
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        自定义考勤公式
                                    </div>
                                
                                <div class="go-to-scene-btn">
                                    <a
                                        class="link"
                                        x-track-id="灵活考勤自动统计_了解更多"
                                        href="/index/subproduct-new/subproduct-new2.html"
                                        rel="opener"
                                    >
                                        了解更多 
                                    </a>
                                </div>
                            </div>
                            <img class="scene-img" src="/index/img/index/platform2/scene_jqgl.png" alt="xft" />
                        </div>
                    
                        <div class="scene-content ren ">
                            <div class="scene-content-left">
                                <div class="title">多种算薪场景智能核算</div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        多端数据采集
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        计时计件算薪
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        税前工资算税
                                    </div>
                                
                                <div class="go-to-scene-btn">
                                    <a
                                        class="link"
                                        x-track-id="多种算薪场景智能核算_了解更多"
                                        href="/index/subproduct-new/subproduct-new3.html"
                                        rel="opener"
                                    >
                                        了解更多 
                                    </a>
                                </div>
                            </div>
                            <img class="scene-img" src="/index/img/index/platform2/scene_xcgl.png" alt="xft" />
                        </div>
                    
                        <div class="scene-content ren ">
                            <div class="scene-content-left">
                                <div class="title">一站式社保全流程管理</div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        多主体社保管理
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        社保参停保
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        社保申报缴费
                                    </div>
                                
                                <div class="go-to-scene-btn">
                                    <a
                                        class="link"
                                        x-track-id="一站式社保全流程管理_了解更多"
                                        href="/index/subproduct-new/subproduct-new4.html"
                                        rel="opener"
                                    >
                                        了解更多 
                                    </a>
                                </div>
                            </div>
                            <img class="scene-img" src="/index/img/index/platform2/scene_sbgl.png" alt="xft" />
                        </div>
                    
                        <div class="scene-content ren ">
                            <div class="scene-content-left">
                                <div class="title">轻松处理个税算报缴</div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        多税局管理
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        多批次算税
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        税局数据同步
                                    </div>
                                
                                <div class="go-to-scene-btn">
                                    <a
                                        class="link"
                                        x-track-id="轻松处理个税算报缴_了解更多"
                                        href="/index/subproduct-new/subproduct-new5.html"
                                        rel="opener"
                                    >
                                        了解更多 
                                    </a>
                                </div>
                            </div>
                            <img class="scene-img" src="/index/img/index/platform2/scene_gsgl.png" alt="xft" />
                        </div>
                    
                        <div class="scene-content ren ">
                            <div class="scene-content-left">
                                <div class="title">薪资安全，代发便利</div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        预约发薪
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        集团代发
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        在线开工资卡
                                    </div>
                                
                                <div class="go-to-scene-btn">
                                    <a
                                        class="link"
                                        x-track-id="薪资安全，代发便利_了解更多"
                                        href="/index/subproduct-new/subproduct-new6.html"
                                        rel="opener"
                                    >
                                        了解更多 
                                    </a>
                                </div>
                            </div>
                            <img class="scene-img" src="/index/img/index/platform2/scene_xzdf.png" alt="xft" />
                        </div>
                    
                        <div class="scene-content ren ">
                            <div class="scene-content-left">
                                <div class="title">员工福利统一管理平台</div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        红包、贺卡、福利金、福利品
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        发放安全合规
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        对账结算快捷
                                    </div>
                                
                                <div class="go-to-scene-btn">
                                    <a
                                        class="link"
                                        x-track-id="员工福利统一管理平台_了解更多"
                                        href="/index/subproduct-new/subproduct-new11.html"
                                        rel="opener"
                                    >
                                        了解更多 
                                    </a>
                                </div>
                            </div>
                            <img class="scene-img" src="/index/img/index/platform2/scene_ttfl.png" alt="xft" />
                        </div>
                    
                </div>
                <div class="center cai">
                    <div class="scene-list">
                        
                            <div class="scene-list-item active">
                                <i class="platform-sprite scene-icon fpgl_1"></i>
                                <i class="platform-sprite scene-icon-hover fpgl_2"></i>
                                <span class="scene-name">
                                    发票管理
                                
                                    
                                </span>
                            </div>
                        
                            <div class="scene-list-item ">
                                <i class="platform-sprite scene-icon fygl_1"></i>
                                <i class="platform-sprite scene-icon-hover fygl_2"></i>
                                <span class="scene-name">
                                    费用管理
                                
                                    
                                </span>
                            </div>
                        
                            <div class="scene-list-item ">
                                <i class="platform-sprite scene-icon cwgl_1"></i>
                                <i class="platform-sprite scene-icon-hover cwgl_2"></i>
                                <span class="scene-name">
                                    财务核算
                                
                                    
                                </span>
                            </div>
                        
                            <div class="scene-list-item ">
                                <i class="platform-sprite scene-icon ysyf_1"></i>
                                <i class="platform-sprite scene-icon-hover ysyf_2"></i>
                                <span class="scene-name">
                                    应收应付
                                
                                    
                                        <span >医招智付</span>
                                    
                                </span>
                            </div>
                        
                    </div>
                    
                        <div class="scene-content ren active">
                            <div class="scene-content-left">
                                <div class="title">数电时代发票统一管理平台</div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        发票智能审核
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        发票防红冲
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        数电票归档
                                    </div>
                                
                                <div class="go-to-scene-btn">
                                    <a
                                        class="link"
                                        x-track-id="数电时代发票统一管理平台_了解更多"
                                        href="/index/subproduct-new/subproduct-new7.html"
                                        rel="opener"
                                    >
                                        了解更多 
                                    </a>
                                </div>
                            </div>
                            <img class="scene-img" src="/index/img/index/platform2/scene_fpgl.png" alt="xft" />
                        </div>
                    
                        <div class="scene-content ren ">
                            <div class="scene-content-left">
                                <div class="title">“消费-报销-支付”精细化费控管理</div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        自动报销
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        报销支付一体化
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        一键生成凭证
                                    </div>
                                
                                <div class="go-to-scene-btn">
                                    <a
                                        class="link"
                                        x-track-id="“消费-报销-支付”精细化费控管理_了解更多"
                                        href="/index/subproduct-new/subproduct-new8.html"
                                        rel="opener"
                                    >
                                        了解更多 
                                    </a>
                                </div>
                            </div>
                            <img class="scene-img" src="/index/img/index/platform2/scene_fygl.png" alt="xft" />
                        </div>
                    
                        <div class="scene-content ren ">
                            <div class="scene-content-left">
                                <div class="title">票财税档一体化智能财务系统</div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        一键取票
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        报表直报税局
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        电子档案
                                    </div>
                                
                                <div class="go-to-scene-btn">
                                    <a
                                        class="link"
                                        x-track-id="票财税档一体化智能财务系统_了解更多"
                                        href="/index/subproduct-new/subproduct-new9.html"
                                        rel="opener"
                                    >
                                        了解更多 
                                    </a>
                                </div>
                            </div>
                            <img class="scene-img" src="/index/img/index/platform2/scene_cwgl.png" alt="xft" />
                        </div>
                    
                        <div class="scene-content ren ">
                            <div class="scene-content-left">
                                <div class="title">“货、票、账、款”一致性管理</div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        药品耗材智能结算
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        账期在线管理
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        对接省级集采平台
                                    </div>
                                
                                <div class="go-to-scene-btn">
                                    <a
                                        class="link"
                                        x-track-id="“货、票、账、款”一致性管理_了解更多"
                                        href="/index/subproduct-new/subproduct-new10.html"
                                        rel="opener"
                                    >
                                        了解更多 
                                    </a>
                                </div>
                            </div>
                            <img class="scene-img" src="/index/img/index/platform2/scene_ysyf.png" alt="xft" />
                        </div>
                    
                </div>
                 <div class="center shi">
                    <div class="scene-list">
                        
                            <div class="scene-list-item active">
                                <i class="platform-sprite scene-icon spgl_1"></i>
                                <i class="platform-sprite scene-icon-hover spgl_2"></i>
                                <span class="scene-name">审批管理</span>
                            </div>
                        
                            <div class="scene-list-item ">
                                <i class="platform-sprite scene-icon sjfx_1"></i>
                                <i class="platform-sprite scene-icon-hover sjfx_2"></i>
                                <span class="scene-name">数据分析</span>
                            </div>
                        
                    </div>
                    
                        <div class="scene-content ren active">
                            <div class="scene-content-left">
                                <div class="title">审批流程高效便捷</div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        自定义表单流程
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        审批时效分析
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        超时提醒机器人
                                    </div>
                                
                                <div class="go-to-scene-btn">
                                    <a
                                        class="link"
                                        x-track-id="审批流程高效便捷_了解更多"
                                        href="/index/subproduct-new/subproduct-new13.html"
                                        rel="opener"
                                    >
                                        了解更多 
                                    </a>
                                </div>
                            </div>
                            <img class="scene-img" src="/index/img/index/platform2/scene_spgl.png" alt="xft" />
                        </div>
                    
                        <div class="scene-content ren ">
                            <div class="scene-content-left">
                                <div class="title">数据分析直观可视</div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        拖拉拽搭建图表
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        多维数据分析
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        数据权限管控
                                    </div>
                                
                                <div class="go-to-scene-btn">
                                    <a
                                        class="link"
                                        x-track-id="数据分析直观可视_了解更多"
                                        href="/index/subproduct-new/subproduct-new12.html"
                                        rel="opener"
                                    >
                                        了解更多 
                                    </a>
                                </div>
                            </div>
                            <img class="scene-img" src="/index/img/index/platform2/scene_sjfx.png" alt="xft" />
                        </div>
                    
                </div>
                 <div class="center open">
                    <div class="scene-list">
                        
                            <div class="scene-list-item active">
                                <i class="platform-sprite scene-icon xtdj_1"></i>
                                <i class="platform-sprite scene-icon-hover xtdj_2"></i>
                                <span class="scene-name">系统对接</span>
                            </div>
                        
                            <div class="scene-list-item ">
                                <i class="platform-sprite scene-icon yykf_1"></i>
                                <i class="platform-sprite scene-icon-hover yykf_2"></i>
                                <span class="scene-name">应用开发</span>
                            </div>
                        
                            <div class="scene-list-item ">
                                <i class="platform-sprite scene-icon bifw_1"></i>
                                <i class="platform-sprite scene-icon-hover bifw_2"></i>
                                <span class="scene-name">BI服务</span>
                            </div>
                        
                    </div>
                    
                        <div class="scene-content ren active">
                            <div class="scene-content-left">
                                <div class="title">让业务高效流转</div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        540+开放接口
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        对接钉钉、飞书、企微等平台
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        自动化业务流程
                                    </div>
                                
                                <div class="go-to-scene-btn">
                                    <a
                                        class="link"
                                        x-track-id="让业务高效流转_了解更多"
                                        href="/open/#/apiPortal"
                                        rel="opener"
                                    >
                                        了解更多 
                                    </a>
                                </div>
                            </div>
                            <img class="scene-img" src="/index/img/index/platform2/open_xtdj.png" alt="xft" />
                        </div>
                    
                        <div class="scene-content ren ">
                            <div class="scene-content-left">
                                <div class="title">让应用搭建更简单</div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        多种业务场景模板
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        零代码开发
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        低代码开发
                                    </div>
                                
                                <div class="go-to-scene-btn">
                                    <a
                                        class="link"
                                        x-track-id="让应用搭建更简单_了解更多"
                                        href="/open/#/lowCodePortal"
                                        rel="opener"
                                    >
                                        了解更多 
                                    </a>
                                </div>
                            </div>
                            <img class="scene-img" src="/index/img/index/platform2/open_yykf.png" alt="xft" />
                        </div>
                    
                        <div class="scene-content ren ">
                            <div class="scene-content-left">
                                <div class="title">让数据赋能决策</div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        数据自助分析
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        多源数据互通
                                    </div>
                                
                                    <div class="label-row">
                                        <img src="/index/img/index/platform2/icon_label.png" alt="xft" />
                                        数据大屏
                                    </div>
                                
                                <div class="go-to-scene-btn">
                                    <a
                                        class="link"
                                        x-track-id="让数据赋能决策_了解更多"
                                        href="/open/#/cbiPlatform"
                                        rel="opener"
                                    >
                                        了解更多 
                                    </a>
                                </div>
                            </div>
                            <img class="scene-img" src="/index/img/index/platform2/open_bifw.png" alt="xft" />
                        </div>
                    
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">

(function(){
    var baseEle = document.querySelector('.art-index-main-page');

    function scrollChangeFunc(){
        console.log(baseEle.scrollTop);
        if (baseEle.scrollTop > 200) {
            var eleList = baseEle.querySelectorAll('[data2-src]');
            if(eleList && eleList.length){
                for (var i = 0; i < eleList.length; i++) {
                    var ele = eleList[i];
                    ele.setAttribute('src', ele.getAttribute('data2-src'))
                }
            }
            compatibleRemoveEvent(baseEle, "scroll", scrollChangeFunc);
        }
    }



    compatibleAddEvent(baseEle, "scroll", scrollChangeFunc);

    function customChangeTablContent(tabHeaderElements,tabContentELements){
        for(var i=0;i<tabHeaderElements.length;i++){
            tabHeaderElements[i].addEventListener('mouseover', function(index) {
                return function() {
                    for(var k = 0; k < tabHeaderElements.length; k++) {
                        tabHeaderElements[k].classList.remove('active');
                        tabContentELements[k].classList.remove('active');
                    }
                    if(tabHeaderElements[index]){
                        tabHeaderElements[index].classList.add('active');
                    }
                    if(tabContentELements[index]){
                        tabContentELements[index].classList.add('active');
                    }
                };
            }(i));
        }
    }

    var platformTabs = baseEle.querySelectorAll('.tab-header>li');
    var platformTabsContents = baseEle.querySelectorAll('.tab-content>.center');
    var currentSceneListItemElements = baseEle.querySelectorAll('.scene-list-item');
    var currentSceneContentElements = baseEle.querySelectorAll('.scene-content');

     function changeSceneContent(){
        var activeTabContentELement =  baseEle.querySelectorAll('.center.active');
        var currentSceneListItemElements = activeTabContentELement[0].querySelectorAll('.scene-list-item');
        var currentSceneContentElements = activeTabContentELement[0].querySelectorAll('.scene-content');
        for(var i=0;i<currentSceneListItemElements.length;i++){
            currentSceneListItemElements[i].addEventListener('mouseover', function(index) {
                return function() {
                    for(var k = 0; k < currentSceneListItemElements.length; k++) {
                        currentSceneListItemElements[k].classList.remove('active');
                        currentSceneContentElements[k].classList.remove('active');
                    }
                    if(currentSceneListItemElements[index]){
                        currentSceneListItemElements[index].classList.add('active');
                    }
                    if(currentSceneContentElements[index]){
                        currentSceneContentElements[index].classList.add('active');
                    }
                };
            }(i));
        }
        customChangeTablContent(currentSceneListItemElements,currentSceneContentElements)
    }

    
    for(var i=0;i<platformTabs.length;i++){
            platformTabs[i].addEventListener('mouseover', function(index) {
                return function() {
                    for(var k = 0; k < platformTabs.length; k++) {
                        platformTabs[k].classList.remove('active');
                        platformTabsContents[k].classList.remove('active');
                    }
                    if(platformTabs[index]){
                        platformTabs[index].classList.add('active');
                    }
                    if(platformTabsContents[index]){
                        platformTabsContents[index].classList.add('active');
                    }
                    setTimeout(function(){
                        changeSceneContent()
                    },0)
                };
            }(i));
        }


    changeSceneContent()
})()
</script>
   <!--  
<style>
    .art-index-main-page .index-codefriend{
        width: 100%;
        height: 676px;
        background: url('/index/img/index/codefriend/codefriend_bg.png') center bottom no-repeat;
        background-size: 100% 100%;
        padding-top: 80px;
        padding-bottom: 80px;
    }
    .art-index-main-page .index-codefriend .title{
        font-size: 40px;
        color: #0B1636;
        font-weight: 600;
        text-align: center;
        margin-bottom: 68px;
    }

    .art-index-main-page .index-codefriend .item-wrap{
        margin: 0 auto;
        width: 1200px;
    }
    .art-index-main-page .index-codefriend .item-wrap .item{
        width: 360px;
        height: 392px;
        padding-top: 68px;
        border-radius: 12px;
        float: left;
        cursor: pointer;
        box-shadow: 0px 17px 40px 10px rgba(144,159,210,0.21);
        background-image: url('/index/img/index/codefriend/card_bg.png');
    }
    .art-index-main-page .index-codefriend .item-wrap .item:hover{
        background-image: url('/index/img/index/codefriend/card_bg_hover.png');
    }
    .art-index-main-page .index-codefriend .item-wrap a{
        text-decoration: none;
        display: block;
    }
    .art-index-main-page .index-codefriend .item-wrap .second{
        margin: 0 60px;
    }
    .art-index-main-page .index-codefriend .item-wrap .item:hover{
        box-shadow: 0px 17px 40px 10px rgba(107,115,191,0.27);
    }

    .art-index-main-page .index-codefriend .item-wrap .item:hover img{
        transform: scale(1.2);
    }
    .art-index-main-page .index-codefriend .item-wrap .item img{
        display: block;
        width: 88px;
        height: 88px;
        margin: 0 auto;
        margin-bottom: 45px;
    }
    .art-index-main-page .index-codefriend .item-wrap .item .item-title{
        font-size: 30px;
        color: #0B1636;
        letter-spacing: 0.62px;
        text-align: center;
        font-weight: 600;
        margin-bottom: 28px;
    }
    .art-index-main-page .index-codefriend .item-wrap .item:hover .item-title{
        color:#1966FF;
    }
    .art-index-main-page .index-codefriend .item-wrap .item .item-detail{
        font-size: 18px;
        color: #47506B;
        letter-spacing: 0.38px;
        text-align: center;
        line-height: 30px;
        font-weight: 400;
    }
</style>

<div class="index-codefriend">
    <div class="title">企业应用开发中心</div>
    <div class="item-wrap">
        
            <div class="item first">
                <a
                    x-track-id
                    href="/open/#/apiPortal"
                    target="_self"
                    rel="opener"
                >
                    <img data-src="/index/img/index/codefriend/first_icon.png" alt="xinfutong" />
                    <div class="item-title">API平台</div>
                    <div class="item-detail">450+开放接口，满足企业薪<br/>税、财务、费控、人事、办公<br/>等多场景定制化需求</div>
                </a>

            </div>
        
            <div class="item second">
                <a
                    x-track-id
                    href="/open/#/connector/platform"
                    target="_self"
                    rel="opener"
                >
                    <img data-src="/index/img/index/codefriend/second_icon.png" alt="xinfutong" />
                    <div class="item-title">连接平台</div>
                    <div class="item-detail">无需改变员工使用习惯，零代<br/>码对接钉钉、飞书、企微等平<br/>台，数据互通</div>
                </a>

            </div>
        
            <div class="item third">
                <a
                    x-track-id
                    href="/open/#/lowCodePortal"
                    target="_self"
                    rel="opener"
                >
                    <img data-src="/index/img/index/codefriend/third_icon.png" alt="xinfutong" />
                    <div class="item-title">低代码平台</div>
                    <div class="item-detail">零代码页面设计、低代码业务<br/>设计，30分钟搭建个性化数<br/>字应用</div>
                </a>

            </div>
        
    </div>
</div>
 -->
    
<style>
    .art-index-main-page .index-role{
        width: 100%;
        height: 568px;
        margin: 0 auto;
        overflow: hidden;
    }
    .art-index-main-page .index-role .title{
        font-size: 40px;
        color: #0B1636;
        font-weight: 600;
        text-align: center;
        margin-top: 64px;
    }

    .art-index-main-page .index-role .item-wrap{
        width: 1200px;
        height: 300px;
        margin: 68px auto 0 auto;
    }
    .art-index-main-page .index-role .item-wrap .item{
        width: 170px;
        height: 300px;
        margin-left: 24px;
        border-radius: 12px;
        float: left;
        cursor: pointer;
        box-shadow: 0px 17px 40px 10px rgba(144,159,210,0.21);
        background: url('/index/img/index/role/role_bg.png') no-repeat left top;
        position: relative;
        overflow: hidden;
        transition: all 0.6s ease-in-out;
    }
    .art-index-main-page .index-role .item-wrap .item:first-child{
        margin-left: 0;
    }
    .art-index-main-page .index-role .item-wrap .item.active{
        width: 424px;
        background-image: url('/index/img/index/role/role_bg_hover.png');
    }
    .art-index-main-page .index-role .item-wrap .item .icon,
    .art-index-main-page .index-role .item-wrap .item .type-title,
    .art-index-main-page .index-role .item-wrap .item .type-line {
        position: absolute;
        left: 32px;
        transition: all 0.6s ease-in-out;
    }
    .art-index-main-page .index-role .item-wrap .item .icon{
        width: 80px;
        height: 80px;
        top: 69px;
    }
    .art-index-main-page .index-role .item-wrap .item.active .icon{
        top: 0;
        opacity: 0;
    }
    .art-index-main-page .index-role .item-wrap .item .icon-hover{
        position: absolute;
        top: 24px;
        right: 24px;
        width: 104px;
        height: 104px;
        opacity: 0;
        transition: all 0.2s ease-in-out;
        transition-delay: 0s;
    }
    .art-index-main-page .index-role .item-wrap .item.active .icon-hover{
        opacity: 1;
        transition-delay: 0.4s;
    }
    .art-index-main-page .index-role .item-wrap .item .type-title{
        top: 167px;
        font-size: 28px;
        color: #0B1636;
        line-height: 45px;
        font-weight: 600;
    }
    .art-index-main-page .index-role .item-wrap .item.active .type-title{
        top: 97px;
        color: #fff;
    }
    .art-index-main-page .index-role .item-wrap .item .type-line{
        top: 220px;
        width: 98px;
        height: 5px;
        background-image: linear-gradient(90deg, #1966FE 0%, rgba(26,104,253,0.00) 100%);
        border-radius: 3px;
    }
    .art-index-main-page .index-role .item-wrap .item.active .type-line{
        top: 151px;
        background-image: linear-gradient(90deg, #FFFFFF 0%, rgba(255,255,255,0.00) 100%);
    }
    .art-index-main-page .index-role .item-wrap .item .detail{
        opacity: 0;
        position: absolute;
        left: 32px;
        bottom: 0;
        width: calc(100% - 64px);
        height: 27px;
        line-height: 27px;
        transition: all 0.6s ease-in-out;
        white-space: nowrap;
    }
    .art-index-main-page .index-role .item-wrap .item .detail:nth-child(1){
        transition-duration: 0.1s;
        transition-delay: 0.2s;
    }
    .art-index-main-page .index-role .item-wrap .item .detail:nth-child(2){
        transition-duration: 0.1s;
        transition-delay: 0.15s;
    }
    .art-index-main-page .index-role .item-wrap .item .detail:nth-child(3){
        transition-duration: 0.1s;
        transition-delay: 0s;
    }
    .art-index-main-page .index-role .item-wrap .item.active .detail {
        opacity: 1;
    }
    .art-index-main-page .index-role .item-wrap .item.active .detail:nth-child(1){
        bottom: 102px;
        transition-duration: 0.6s;
        transition-delay: 0s;
    }
    .art-index-main-page .index-role .item-wrap .item.active .detail:nth-child(2){
        bottom: 67px;
        transition-duration: 0.6s;
        transition-delay: 0.15s;
    }
    .art-index-main-page .index-role .item-wrap .item.active .detail:nth-child(3){
        bottom: 32px;
        transition-duration: 0.6s;
        transition-delay: 0.3s;
    }
    .art-index-main-page .index-role .item-wrap .item .detail > span{
        opacity: 0.9;
        font-size: 17px;
        color: #FFFFFF;
        line-height: 27px;
        margin-left: 8px;
        vertical-align: middle;
    }
    .art-index-main-page .index-role .item-wrap .item .detail > i{
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('/index/img/index/role/role_checked.png');
        vertical-align: middle;
    }

    
    .art-index-main-page .index-role .item-wrap .item.active.item4 .type-title{
        top: 62px;
    }
    .art-index-main-page .index-role .item-wrap .item.active.item4 .type-line{
        top: 116px;
    }
    .art-index-main-page .index-role .item-wrap .item.item4 .detail:nth-child(1){
        transition-duration: 0.1s;
        transition-delay: 0.15s;
    }
    .art-index-main-page .index-role .item-wrap .item.item4 .detail:nth-child(2){
        transition-duration: 0.1s;
        transition-delay: 0.1s;
    }
    .art-index-main-page .index-role .item-wrap .item.item4 .detail:nth-child(3){
        transition-duration: 0.1s;
        transition-delay: 0.05s;
    }
    .art-index-main-page .index-role .item-wrap .item.item4 .detail:nth-child(4){
        transition-duration: 0.1s;
        transition-delay: 0s;
    }
    .art-index-main-page .index-role .item-wrap .item.active.item4 .detail:nth-child(1){
        bottom: 137px;
        transition-duration: 0.6s;
        transition-delay: 0s;
    }
    .art-index-main-page .index-role .item-wrap .item.active.item4 .detail:nth-child(2){
        bottom: 102px;
        transition-duration: 0.6s;
        transition-delay: 0.1s;
    }
    .art-index-main-page .index-role .item-wrap .item.active.item4 .detail:nth-child(3){
        bottom: 67px;
        transition-duration: 0.6s;
        transition-delay: 0.2s;
    }
    .art-index-main-page .index-role .item-wrap .item.active.item4 .detail:nth-child(4){
        bottom: 32px;
        transition-duration: 0.6s;
        transition-delay: 0.3s;
    }

</style>

<div class="index-role">
    <div class="title">服务企业多种角色，数字化工作体验一触即达</div>
    <div class="item-wrap">
        
            <div class="item item4 active">
                <img class="icon" data-src="/index/img/index/role/icon_boss.png" alt="xinfutong" />
                <div class="type-title">老板</div>
                <div class="type-line"></div>
                <img class="icon-hover" data-src="/index/img/index/role/icon_boss_hover.png" alt="xinfutong" />
                <div>
                    
                        <div class="detail">
                            <i></i>
                            <span>多维度数据监测，决策更高效</span>
                        </div>
                    
                        <div class="detail">
                            <i></i>
                            <span>一站式人财事管理，成本更可控</span>
                        </div>
                    
                        <div class="detail">
                            <i></i>
                            <span>PC、移动多端审批，操作更便捷</span>
                        </div>
                    
                        <div class="detail">
                            <i></i>
                            <span>全方位福利场景方案，留才更简单</span>
                        </div>
                    
                </div>
            </div>
        
            <div class="item item4 ">
                <img class="icon" data-src="/index/img/index/role/icon_finance.png" alt="xinfutong" />
                <div class="type-title">财务</div>
                <div class="type-line"></div>
                <img class="icon-hover" data-src="/index/img/index/role/icon_finance_hover.png" alt="xinfutong" />
                <div>
                    
                        <div class="detail">
                            <i></i>
                            <span>只需姓名、卡号、金额，秒级代发工资</span>
                        </div>
                    
                        <div class="detail">
                            <i></i>
                            <span>多税号多实体集团企业，个税统一管理</span>
                        </div>
                    
                        <div class="detail">
                            <i></i>
                            <span>报销、发票、支付全线上处理，效率倍增</span>
                        </div>
                    
                        <div class="detail">
                            <i></i>
                            <span>票财税档一体化，记账更智能</span>
                        </div>
                    
                </div>
            </div>
        
            <div class="item item4 ">
                <img class="icon" data-src="/index/img/index/role/icon_hr.png" alt="xinfutong" />
                <div class="type-title">HR</div>
                <div class="type-line"></div>
                <img class="icon-hover" data-src="/index/img/index/role/icon_hr_hover.png" alt="xinfutong" />
                <div>
                    
                        <div class="detail">
                            <i></i>
                            <span>聘入转调离一键办理，员工档案更清晰</span>
                        </div>
                    
                        <div class="detail">
                            <i></i>
                            <span>灵活假勤规则，考勤自动统计，更轻松</span>
                        </div>
                    
                        <div class="detail">
                            <i></i>
                            <span>复杂薪资规则一键算薪算税，更智能</span>
                        </div>
                    
                        <div class="detail">
                            <i></i>
                            <span>社保参停保、申报、缴款线上化，更便捷</span>
                        </div>
                    
                </div>
            </div>
        
            <div class="item item4 ">
                <img class="icon" data-src="/index/img/index/role/icon_it.png" alt="xinfutong" />
                <div class="type-title">IT</div>
                <div class="type-line"></div>
                <img class="icon-hover" data-src="/index/img/index/role/icon_it_hover.png" alt="xinfutong" />
                <div>
                    
                        <div class="detail">
                            <i></i>
                            <span>全面的API接口，满足各种定制需求</span>
                        </div>
                    
                        <div class="detail">
                            <i></i>
                            <span>配置化连接，零代码实现多方系统对接</span>
                        </div>
                    
                        <div class="detail">
                            <i></i>
                            <span>丰富行业模版，少量代码实现应用搭建</span>
                        </div>
                    
                        <div class="detail">
                            <i></i>
                            <span>BI报表可视化搭建，满足IT数据分析要求</span>
                        </div>
                    
                </div>
            </div>
        
            <div class="item item4 ">
                <img class="icon" data-src="/index/img/index/role/icon_staff.png" alt="xinfutong" />
                <div class="type-title">员工</div>
                <div class="type-line"></div>
                <img class="icon-hover" data-src="/index/img/index/role/icon_staff_hover.png" alt="xinfutong" />
                <div>
                    
                        <div class="detail">
                            <i></i>
                            <span>扫码开卡，卡号当天生成，开卡更简单</span>
                        </div>
                    
                        <div class="detail">
                            <i></i>
                            <span>移动打卡，线上请假与审批，更灵活</span>
                        </div>
                    
                        <div class="detail">
                            <i></i>
                            <span>费用预支-差旅预定-报销申请一气呵成</span>
                        </div>
                    
                        <div class="detail">
                            <i></i>
                            <span>工资单明细多端可查，问题反馈超轻松</span>
                        </div>
                    
                </div>
            </div>
        
    </div>
</div>

<script type="text/javascript">
    (function() {
        var baseEle = document.querySelector('.art-index-main-page');
        var cards = baseEle.querySelectorAll('.index-role .item-wrap .item');
        var mouseenterFunc = function($event) {
            for(var i = 0; i < cards.length; i++) {
                cards[i].classList.remove('active');
            }
            $event.target.classList.add('active');
        };
        for (var i = 0; i < cards.length; i++) {
            compatibleAddEvent(cards[i], "mouseenter", mouseenterFunc);
        }
    })();
</script>
    
<style>
    .art-index-main-page .index-solution3{
        width: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
        background-image: url('/index/img/index/solution3/bg-1.png');
        padding-top: 80px;
        padding-bottom: 148px;
    }
    .art-index-main-page .index-solution3.solution3-bg-1 {
        background-image: url('/index/img/index/solution3/bg-1.png');
    }
    .art-index-main-page .index-solution3.solution3-bg-2 {
        background-image: url('/index/img/index/solution3/bg-2.png');
    }
    .art-index-main-page .index-solution3.solution3-bg-3 {
        background-image: url('/index/img/index/solution3/bg-3.png');
    }
    .art-index-main-page .index-solution3.solution3-bg-4 {
        background-image: url('/index/img/index/solution3/bg-4.png');
    }
    .art-index-main-page .index-solution3.solution3-bg-5 {
        background-image: url('/index/img/index/solution3/bg-5.png');
    }
    .art-index-main-page .index-solution3.solution3-bg-6 {
        background-image: url('/index/img/index/solution3/bg-6.png');
    }
    .art-index-main-page .index-solution3 > .title{
        font-size: 40px;
        color: #0B1636;
        font-weight: 600;
        text-align: center;
        margin-bottom: 68px;
    }

    .art-index-main-page .index-solution3 .card{
        width: 1200px;
        height: 430px;
        margin: 0 auto;
        background-color: #fff;
        background-color: rgba(255,255,255,0.95);
        box-shadow: 0px 17px 40px 10px rgba(144,159,210,0.21);
        border-radius: 12px;
        position: relative;
        overflow: hidden;
        display:flex;
    }

    .art-index-main-page .index-solution3 .card .left-menu{
        width: 225px;
        height: 100%;
        background: url('/index/img/index/solution3/silder_bg.png') no-repeat center center;
        padding: 30px 20px;
    }
    .art-index-main-page .index-solution3 .card .left-menu >li {
        height: 48px;
        line-height: 48px;
        padding-left: 20px;
        margin-bottom: 14px;
        font-size: 16px;
        color: #283753;
        cursor: pointer;
        width:182px;
        height:48px;
        display:flex;
        align-items:center;
    }
    .art-index-main-page .index-solution3 .card .left-menu >li:hover{
        background: url('/index/img/index/solution3/icon_bg_hover.png') no-repeat center center;
    }
    .art-index-main-page .index-solution3 .card .left-menu >li.active {
        color: #fff;
        background: url('/index/img/index/solution3/icon_bg.png') no-repeat center center;
    }
    .art-index-main-page .index-solution3 .card .left-menu >li .icon,
    .art-index-main-page .index-solution3 .card .left-menu >li .icon-active{
        width: 24px;
        height: 24px;
        vertical-align: middle;
        margin-right: 10px;
    }
    .art-index-main-page .index-solution3 .card .left-menu >li .icon-active {
        display: none;
    }
    .art-index-main-page .index-solution3 .card .left-menu >li.active .icon{
        display: none;
    }
    .art-index-main-page .index-solution3 .card .left-menu >li.active .icon-active {
        display: inline;
    }
    .art-index-main-page .index-solution3 .card .solution-sprite{
        background: url(/index/img/index/solution3/sprite-solution.png)  no-repeat;
        background-size:691px 745px;
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.left{
        width:24px;
        height:24px;
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.left{
        width:24px;
        height:24px;
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feature-item-img{
        width:36px;
        height:36px;
    }
    
    .art-index-main-page .index-solution3 .card .solution-sprite.icon_zzy{
        background-position: -51px -33px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.icon_zzy_hover{
        background-position: -51px -92px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_zzy_1{
        background-position: -49px -183px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_zzy_2{
        background-position: -160px -183px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_zzy_3{
        background-position: -272px -183px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_zzy_4{
        background-position: -384px -183px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_zzy_5{
        background-position: -496px -183px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_zzy_6{
        background-position: -608px -183px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.icon_gyqy{
        background-position: -126px -34px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.icon_gyqy_hover{
        background-position: -126px -92px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_gyqy_1{
        background-position: -49px -270px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_gyqy_2{
        background-position: -160px -269px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_gyqy_3{
        background-position: -272px -268px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_gyqy_4{
        background-position: -384px -268px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_gyqy_5{
        background-position: -496px -268px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_gyqy_6{
        background-position: -607px -268px; 
    }

    .art-index-main-page .index-solution3 .card .solution-sprite.icon_kjrj{
        background-position: -201px -34px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.icon_kjrj_hover{
        background-position: -201px -91px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_kjrj_1{
        background-position: -50px -358px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_kjrj_2{
        background-position: -160px -355px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_kjrj_3{
        background-position: -272px -354px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_kjrj_4{
        background-position: -384px -354px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_kjrj_5{
        background-position: -496px -354px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_kjrj_6{
        background-position: -607px -354px; 
    }

    .art-index-main-page .index-solution3 .card .solution-sprite.icon_lsls{
        background-position: -276px -34px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.icon_lsls_hover{
        background-position: -276px -92px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_lsls_1{
        background-position: -49px -438px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_lsls_2{
        background-position: -160px -440px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_lsls_3{
        background-position: -272px -440px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_lsls_4{
        background-position: -384px -440px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_lsls_5{
        background-position: -496px -440px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_lsls_6{
        background-position: -607px -440px; 
    }

    .art-index-main-page .index-solution3 .card .solution-sprite.icon_hr{
        background-position: -351px -34px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.icon_hr_hover{
        background-position: -351px -92px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_hr_1{
        background-position: -49px -526px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_hr_2{
        background-position: -160px -526px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_hr_3{
        background-position: -272px -526px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_hr_4{
        background-position: -384px -526px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_hr_5{
        background-position: -496px -526px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_hr_6{
        background-position: -607px -526px; 
    }

    .art-index-main-page .index-solution3 .card .solution-sprite.icon_jtqy{
        background-position: -426px -34px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.icon_jtqy_hover{
        background-position: -426px -92px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_jtqy_1{
        background-position: -49px -613px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_jtqy_2{
        background-position: -160px -612px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_jtqy_3{
        background-position: -272px -612px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_jtqy_4{
        background-position: -384px -612px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_jtqy_5{
        background-position: -496px -612px; 
    }
    .art-index-main-page .index-solution3 .card .solution-sprite.feat_jtqy_6{
        background-position: -607px -612px; 
    }
    
    .art-index-main-page .index-solution3 .card .right-content {
        padding: 0 12px 0 35px;
        display: none;
    }
    .art-index-main-page .index-solution3 .card .right-content.active {
        display: flex;
    }
    .art-index-main-page .index-solution3 .card .right-content .content{
        display:flex;
        flex-direction:column;
        justify-content: center;
    }
    .art-index-main-page .index-solution3 .card .right-content .content-title {
        font-size: 24px;
        color: #0B1636;
        line-height: 36px;
        font-weight: 600;
    }
    .art-index-main-page .index-solution3 .card .right-content .detail {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 16px;
        color: #47506B;
        line-height: 27px;
        text-align: left;
        font-style: normal;
        margin-top:10px;
    }
    .art-index-main-page .index-solution3 .card .right-content .feature-list{
        display:flex;
        width:100%;
        margin-top:10px;
    }
    .art-index-main-page .index-solution3 .card .right-content .feature-list .feature-item {
        width:112px;
        height:112px;
        display:flex;
        flex-direction:column;
        align-items: center;
    }
    .art-index-main-page .index-solution3 .right-content .feature-item-img{
        width:36px;
        height:36px;
        margin-top:22px;
    }
    .art-index-main-page .index-solution3 .right-content .feature-item-desc{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 14px;
        color: #47506B;
        line-height: 20px;
        text-align: center;
        font-style: normal;
        margin-top:10px;
    }
    .art-index-main-page .index-solution3 .card .right-content .btn {
        width: 120px;
        height: 44px;
        display: block;
        margin-top: 16px;
        line-height: 44px;
        border: 1px solid #1966FF;
        border-radius: 6px;
        cursor: pointer;
        font-size: 16px;
        color: #1966FF;
        font-weight: 500;
        text-align: center;
        text-decoration: none;
    }
    .art-index-main-page .index-solution3 .card .right-content .line {
        height: 1px;
        margin: 36px 0;
        background: #E6E9F0;
    }
    .art-index-main-page .index-solution3 .card .right-content .logo-title {
        font-size: 18px;
        color: #0B1636;
        line-height: 28px;
        font-weight: 600;
    }
    .art-index-main-page .index-solution3 .card .right-content .logo-container {
        width:209px;
        height:auto;
    }

</style>

<div class="index-solution3">
    <div class="title">深耕行业，陪伴中国企业数字化实践</div>
    <div class="card">
        <ul class="left-menu">
            
                <li class="active">
                    <i class="solution-sprite left icon icon_zzy"></i>
                    <i class="solution-sprite left icon-active icon_zzy_hover"></i>
                    <!-- <img class="icon" data-src="/icon_zzy" alt="xinfutong" />
                    <img class="icon-active" data-src="/icon_zzy_hover" alt="xinfutong" /> --!>
                    <span>制造业</span>
                </li>
            
                <li class="">
                    <i class="solution-sprite left icon icon_gyqy"></i>
                    <i class="solution-sprite left icon-active icon_gyqy_hover"></i>
                    <!-- <img class="icon" data-src="/icon_gyqy" alt="xinfutong" />
                    <img class="icon-active" data-src="/icon_gyqy_hover" alt="xinfutong" /> --!>
                    <span>国有企业</span>
                </li>
            
                <li class="">
                    <i class="solution-sprite left icon icon_kjrj"></i>
                    <i class="solution-sprite left icon-active icon_kjrj_hover"></i>
                    <!-- <img class="icon" data-src="/icon_kjrj" alt="xinfutong" />
                    <img class="icon-active" data-src="/icon_kjrj_hover" alt="xinfutong" /> --!>
                    <span>科技（软件）</span>
                </li>
            
                <li class="">
                    <i class="solution-sprite left icon icon_lsls"></i>
                    <i class="solution-sprite left icon-active icon_lsls_hover"></i>
                    <!-- <img class="icon" data-src="/icon_lsls" alt="xinfutong" />
                    <img class="icon-active" data-src="/icon_lsls_hover" alt="xinfutong" /> --!>
                    <span>零售连锁（餐饮）</span>
                </li>
            
                <li class="">
                    <i class="solution-sprite left icon icon_hr"></i>
                    <i class="solution-sprite left icon-active icon_hr_hover"></i>
                    <!-- <img class="icon" data-src="/icon_hr" alt="xinfutong" />
                    <img class="icon-active" data-src="/icon_hr_hover" alt="xinfutong" /> --!>
                    <span>人力资源</span>
                </li>
            
                <li class="">
                    <i class="solution-sprite left icon icon_jtqy"></i>
                    <i class="solution-sprite left icon-active icon_jtqy_hover"></i>
                    <!-- <img class="icon" data-src="/icon_jtqy" alt="xinfutong" />
                    <img class="icon-active" data-src="/icon_jtqy_hover" alt="xinfutong" /> --!>
                    <span>集团企业</span>
                </li>
            
        </ul>
        
            <div class="right-content active">
                <div class="content">
                    <div class="content-title">制造业解决方案</div>
                    <div class="detail">基于制造业人员流动频繁、车间及行政人员复杂考勤场景多，计时计件、提成绩效等工资计算复杂等管理难题，提供全流程的人事、薪税、费控服务，助力制造企业生产管理数字化。</div>
                    <div class="feature-list">
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_zzy_1"></i>
                                <!--<img class="feature-item-img" data-src="/feat_zzy_1" alt="xinfutong" />--!>
                                <div class="feature-item-desc">证件读卡器</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_zzy_2"></i>
                                <!--<img class="feature-item-img" data-src="/feat_zzy_2" alt="xinfutong" />--!>
                                <div class="feature-item-desc">电子合同</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_zzy_3"></i>
                                <!--<img class="feature-item-img" data-src="/feat_zzy_3" alt="xinfutong" />--!>
                                <div class="feature-item-desc">灵活排班</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_zzy_4"></i>
                                <!--<img class="feature-item-img" data-src="/feat_zzy_4" alt="xinfutong" />--!>
                                <div class="feature-item-desc">产量数据采集</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_zzy_5"></i>
                                <!--<img class="feature-item-img" data-src="/feat_zzy_5" alt="xinfutong" />--!>
                                <div class="feature-item-desc">计时计件工资</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_zzy_6"></i>
                                <!--<img class="feature-item-img" data-src="/feat_zzy_6" alt="xinfutong" />--!>
                                <div class="feature-item-desc">差旅报销</div>
                            </div>
                        
                    </div>
                    <div class="line"></div>
                    <a class="btn" x-track-id="制造业解决方案_解决方案_首页" href="/index/solution/solution1.html">了解更多</a>
                </div>
                <img class="logo-container" data-src="/index/img/index/solution3/logo_zzy.png" alt="xinfutong" />
            </div>
        
            <div class="right-content ">
                <div class="content">
                    <div class="content-title">国有企业解决方案</div>
                    <div class="detail">聚焦国有企业政策、合规及数据安全需求，提供全流程的人事管理、费用管控、数据管理服务，支持多系统对接，确保核心数据保密、稳定，助力国企高效完成数字化转型，满足政策及合规要求。</div>
                    <div class="feature-list">
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_gyqy_1"></i>
                                <!--<img class="feature-item-img" data-src="/feat_gyqy_1" alt="xinfutong" />--!>
                                <div class="feature-item-desc">编制管控</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_gyqy_2"></i>
                                <!--<img class="feature-item-img" data-src="/feat_gyqy_2" alt="xinfutong" />--!>
                                <div class="feature-item-desc">职工档案</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_gyqy_3"></i>
                                <!--<img class="feature-item-img" data-src="/feat_gyqy_3" alt="xinfutong" />--!>
                                <div class="feature-item-desc">人事任免</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_gyqy_4"></i>
                                <!--<img class="feature-item-img" data-src="/feat_gyqy_4" alt="xinfutong" />--!>
                                <div class="feature-item-desc">预算管理</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_gyqy_5"></i>
                                <!--<img class="feature-item-img" data-src="/feat_gyqy_5" alt="xinfutong" />--!>
                                <div class="feature-item-desc">报销管理</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_gyqy_6"></i>
                                <!--<img class="feature-item-img" data-src="/feat_gyqy_6" alt="xinfutong" />--!>
                                <div class="feature-item-desc">数据平台</div>
                            </div>
                        
                    </div>
                    <div class="line"></div>
                    <a class="btn" x-track-id="国有企业解决方案_解决方案_首页" href="/index/solution/solution13.html">了解更多</a>
                </div>
                <img class="logo-container" data-src="/index/img/index/solution3/logo_gyqy.png" alt="xinfutong" />
            </div>
        
            <div class="right-content ">
                <div class="content">
                    <div class="content-title">科技（软件）行业解决方案</div>
                    <div class="detail">聚焦提升企业运营效率和员工满意度，提供灵活假勤、财务费控等适配科技企业业务及管理特点的数字化解决方案，同时依托连接平台等开放能力，支持钉钉、飞书、企微、企业自有系统对接及数据互通，实现一站式数字化管理。</div>
                    <div class="feature-list">
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_kjrj_1"></i>
                                <!--<img class="feature-item-img" data-src="/feat_kjrj_1" alt="xinfutong" />--!>
                                <div class="feature-item-desc">弹性打卡</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_kjrj_2"></i>
                                <!--<img class="feature-item-img" data-src="/feat_kjrj_2" alt="xinfutong" />--!>
                                <div class="feature-item-desc">项目费用管控</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_kjrj_3"></i>
                                <!--<img class="feature-item-img" data-src="/feat_kjrj_3" alt="xinfutong" />--!>
                                <div class="feature-item-desc">项目成本分摊</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_kjrj_4"></i>
                                <!--<img class="feature-item-img" data-src="/feat_kjrj_4" alt="xinfutong" />--!>
                                <div class="feature-item-desc">员工福利</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_kjrj_5"></i>
                                <!--<img class="feature-item-img" data-src="/feat_kjrj_5" alt="xinfutong" />--!>
                                <div class="feature-item-desc">智能记账</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_kjrj_6"></i>
                                <!--<img class="feature-item-img" data-src="/feat_kjrj_6" alt="xinfutong" />--!>
                                <div class="feature-item-desc">智数报表</div>
                            </div>
                        
                    </div>
                    <div class="line"></div>
                    <a class="btn" x-track-id="科技（软件）行业解决方案_解决方案_首页" href="/index/solution/solution9.html">了解更多</a>
                </div>
                <img class="logo-container" data-src="/index/img/index/solution3/logo_kjrj.png" alt="xinfutong" />
            </div>
        
            <div class="right-content ">
                <div class="content">
                    <div class="content-title">零售连锁（餐饮）行业解决方案</div>
                    <div class="detail">聚焦总部集中管理，赋能门店标准化和本地化，解决总部-门店信息不互通、算税发薪主体多工作量大、集中费用管控困难等难题，打造人事、薪税、考勤、报销全场景数字化运营体系。</div>
                    <div class="feature-list">
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_lsls_1"></i>
                                <!--<img class="feature-item-img" data-src="/feat_lsls_1" alt="xinfutong" />--!>
                                <div class="feature-item-desc">总部集中人事管理</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_lsls_2"></i>
                                <!--<img class="feature-item-img" data-src="/feat_lsls_2" alt="xinfutong" />--!>
                                <div class="feature-item-desc">门店调度</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_lsls_3"></i>
                                <!--<img class="feature-item-img" data-src="/feat_lsls_3" alt="xinfutong" />--!>
                                <div class="feature-item-desc">考勤管理</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_lsls_4"></i>
                                <!--<img class="feature-item-img" data-src="/feat_lsls_4" alt="xinfutong" />--!>
                                <div class="feature-item-desc">统一核算</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_lsls_5"></i>
                                <!--<img class="feature-item-img" data-src="/feat_lsls_5" alt="xinfutong" />--!>
                                <div class="feature-item-desc">零散支出</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_lsls_6"></i>
                                <!--<img class="feature-item-img" data-src="/feat_lsls_6" alt="xinfutong" />--!>
                                <div class="feature-item-desc">经营数据</div>
                            </div>
                        
                    </div>
                    <div class="line"></div>
                    <a class="btn" x-track-id="零售连锁（餐饮）行业解决方案_解决方案_首页" href="/index/solution/solution3.html">了解更多</a>
                </div>
                <img class="logo-container" data-src="/index/img/index/solution3/logo_lsls.png" alt="xinfutong" />
            </div>
        
            <div class="right-content ">
                <div class="content">
                    <div class="content-title">人力资源行业解决方案</div>
                    <div class="detail">提供招聘入职、人事档案、社保管理、算薪算税、账单管理及对账等人力资源业务全流程解决方案，提升客户专员、社保专员、财务专员多角色数字化体验，打造全流程、多角色服务闭环。</div>
                    <div class="feature-list">
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_hr_1"></i>
                                <!--<img class="feature-item-img" data-src="/feat_hr_1" alt="xinfutong" />--!>
                                <div class="feature-item-desc">扫码入职</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_hr_2"></i>
                                <!--<img class="feature-item-img" data-src="/feat_hr_2" alt="xinfutong" />--!>
                                <div class="feature-item-desc">电子合同</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_hr_3"></i>
                                <!--<img class="feature-item-img" data-src="/feat_hr_3" alt="xinfutong" />--!>
                                <div class="feature-item-desc">社保管理</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_hr_4"></i>
                                <!--<img class="feature-item-img" data-src="/feat_hr_4" alt="xinfutong" />--!>
                                <div class="feature-item-desc">个税算报缴</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_hr_5"></i>
                                <!--<img class="feature-item-img" data-src="/feat_hr_5" alt="xinfutong" />--!>
                                <div class="feature-item-desc">账单管理</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_hr_6"></i>
                                <!--<img class="feature-item-img" data-src="/feat_hr_6" alt="xinfutong" />--!>
                                <div class="feature-item-desc">社保对账</div>
                            </div>
                        
                    </div>
                    <div class="line"></div>
                    <a class="btn" x-track-id="人力资源行业解决方案_解决方案_首页" href="/index/solution/solution2.html">了解更多</a>
                </div>
                <img class="logo-container" data-src="/index/img/index/solution3/logo_hr.png" alt="xinfutong" />
            </div>
        
            <div class="right-content ">
                <div class="content">
                    <div class="content-title">集团企业解决方案</div>
                    <div class="detail">一张表即可完成全集团工资发放，统一发薪，资金及数据统一管理，一台电脑一键完成全集团人员个税计算及申报，大幅提升集团企业整体管控水平。</div>
                    <div class="feature-list">
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_jtqy_1"></i>
                                <!--<img class="feature-item-img" data-src="/feat_jtqy_1" alt="xinfutong" />--!>
                                <div class="feature-item-desc">集团代发</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_jtqy_2"></i>
                                <!--<img class="feature-item-img" data-src="/feat_jtqy_2" alt="xinfutong" />--!>
                                <div class="feature-item-desc">多批次代发</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_jtqy_3"></i>
                                <!--<img class="feature-item-img" data-src="/feat_jtqy_3" alt="xinfutong" />--!>
                                <div class="feature-item-desc">回单打印</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_jtqy_4"></i>
                                <!--<img class="feature-item-img" data-src="/feat_jtqy_4" alt="xinfutong" />--!>
                                <div class="feature-item-desc">薪资代发API</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_jtqy_5"></i>
                                <!--<img class="feature-item-img" data-src="/feat_jtqy_5" alt="xinfutong" />--!>
                                <div class="feature-item-desc">权限隔离</div>
                            </div>
                        
                            <div class="feature-item">
                                <i class="solution-sprite feature-item-img  feat_jtqy_6"></i>
                                <!--<img class="feature-item-img" data-src="/feat_jtqy_6" alt="xinfutong" />--!>
                                <div class="feature-item-desc">多税局管理</div>
                            </div>
                        
                    </div>
                    <div class="line"></div>
                    <a class="btn" x-track-id="集团企业解决方案_解决方案_首页" href="/index/solution/solution10.html">了解更多</a>
                </div>
                <img class="logo-container" data-src="/index/img/index/solution3/logo_jtqy.png" alt="xinfutong" />
            </div>
        
    </div>
</div>

<script type="text/javascript">
    (function() {
        var baseEle = document.querySelector('.art-index-main-page');
        var menus = baseEle.querySelectorAll('.index-solution3 .left-menu li');
        var cards = baseEle.querySelectorAll('.index-solution3 .right-content');
        var container = baseEle.querySelector('.index-solution3');

        function menuClick($event) {
            var idx = parseInt(this.getAttribute('data-index'));

            for(var i = 0; i < menus.length; i++) {
                menus[i].classList.remove('active');
                cards[i].classList.remove('active');
            }

            menus[idx].classList.add('active');
            cards[idx].classList.add('active');
            container.className = 'index-solution3 solution3-bg-' + (idx + 1);
        }

        for (var i = 0; i < menus.length; i++) {
            menus[i].setAttribute('data-index', i);
            compatibleAddEvent(menus[i], "click", menuClick);
            compatibleAddEvent(menus[i], "mouseover", menuClick);
        }
    })();
</script>
    



<style>
    .art-index-main-page .index-company{
        width: 100%;
        background: url('/index/img/index/company/bg/bg.png') center bottom no-repeat;
        padding-top: 83px;
        overflow: hidden;
    }

    .art-index-main-page .index-company .top-title{
        font-size: 40px;
        color: #0B1636;
        text-align: center;
        line-height: 60px;
        font-weight: 600;
    }


    .art-index-main-page .index-company .evaluation-card {
        width: 1200px;
        height: 375px;
        margin: 68px auto 0 auto;
        position: relative;
        box-sizing: content-box;
    }
    .art-index-main-page .index-company .evaluation-card .card{
        opacity: 0;
        width: 400px;
        height: 375px;
        position: absolute;
        overflow: hidden;
        background: #FFFFFF;
        box-shadow: 0px 2px 19px 0px rgba(144,159,210,0.25);
        border-radius: 8px;
        transition: all 0.6s ease-in-out;
    }
    .art-index-main-page .index-company .evaluation-card .card:hover{
        background: url('/index/img/index/company/bg/border_card.png') no-repeat center center;
        background-size: 100% 100%;
    }
    .art-index-main-page .index-company .evaluation-card .card .card-header{
        height: 113px;
        background: url('/index/img/index/company/bg/bg_card.png') center bottom no-repeat;
        background-size: 100% 100%;
        position: relative;
        padding: 30px 0 0 104px;
    }
    .art-index-main-page .index-company .evaluation-card .card .card-header >img{
        width: 64px;
        height: 64px;
        position: absolute;
        top: 24px;
        left: 24px;
    }
    .art-index-main-page .index-company .evaluation-card .card .card-header >label {
        display: block;
        font-size: 20px;
        color: #0B1636;
        line-height: 28px;
        font-weight: 600;
    }
    .art-index-main-page .index-company .evaluation-card .card .card-header >span {
        display: block;
        font-size: 14px;
        color: #0B1636;
        line-height: 22px;
        margin-top: 2px;
    }
    .art-index-main-page .index-company .evaluation-card .card .card-body {
        padding: 15px 24px 0 24px;
    }
    .art-index-main-page .index-company .evaluation-card .card .card-body .showtitle {
        height: 60px;
        vertical-align: bottom;
    }
    .art-index-main-page .index-company .evaluation-card .card .card-body .showtitle >label{
        font-size: 40px;
        color: #1966FF;
        line-height: 60px;
        font-weight: 600;
    }
    .art-index-main-page .index-company .evaluation-card .card .card-body .showtitle >span{
        font-size: 18px;
        color: #1966FF;
        line-height: 28px;
        margin-left: 4px;
    }
    .art-index-main-page .index-company .evaluation-card .card .card-body .subtitle {
        font-size: 16px;
        color: #727A8E;
        line-height: 22px;
    }
    .art-index-main-page .index-company .evaluation-card .card .card-body .line {
        height: 1px;
        background-color: #E6E9F0 ;
        margin: 12px 0 16px 0;
    }
    .art-index-main-page .index-company .evaluation-card .card .card-body >p {
        font-size: 14px;
        color: #0B1636;
        line-height: 24px;
        margin: 0;
        padding: 0;
    }
    .art-index-main-page .index-company .evaluation-card .card.center {
        opacity: 1;
        left: 400px;
        box-shadow: 0px 15px 32px 10px rgba(107,115,191,0.27);
    }
    .art-index-main-page .index-company .evaluation-card .card.left {
        opacity: 1;
        left: 0;
        transform: scale(0.923);
        transform-origin: left center;
        cursor: pointer;
    }
    .art-index-main-page .index-company .evaluation-card .card.left2 {
        left: -400px;
        transform: scale(0.923);
        transform-origin: left center;
    }
    .art-index-main-page .index-company .evaluation-card .card.left3 {
        left: -800px;
        transform: scale(0.923);
        transform-origin: left center;
    }
    .art-index-main-page .index-company .evaluation-card .card.right {
        opacity: 1;
        left: 800px;
        transform: scale(0.923);
        transform-origin: right center;
        cursor: pointer;
    }
    .art-index-main-page .index-company .evaluation-card .card.right2 {
        left: 1200px;
        transform: scale(0.923);
        transform-origin: right center;
    }
    .art-index-main-page .index-company .evaluation-card .card.right3 {
        left: 1600px;
        transform: scale(0.923);
        transform-origin: right center;
    }


    .art-index-main-page .index-company .company-card{
        width: 1200px;
        height: 482px;
        margin: 0 auto;
        padding-top: 56px;
        overflow: hidden;
        position: relative;
    }
    .art-index-main-page .index-company .left-bg,
    .art-index-main-page .index-company .right-bg{
        width: 114px;
        height: 100%;
        position: absolute;
        top: 0;
    }
    .art-index-main-page .index-company .left-bg{
        left: 0;
        background: url('/index/img/index/company/bg/bg_cover_left.png') right bottom no-repeat;
    }
    .art-index-main-page .index-company .right-bg {
        right: 0;
        background: url('/index/img/index/company/bg/bg_cover_right.png') left bottom no-repeat;
    }
    .art-index-main-page .index-company .card-outer{
        height: 80px;
        margin-bottom: 40px;
        white-space: nowrap;
    }
    .art-index-main-page .index-company .card-outer .item {
        height: 80px;
        display: inline-block;
        white-space: nowrap;
        font-size: 0;
        position: relative;
        animation: cardloop 40s linear infinite;
    }
    .art-index-main-page .index-company .card-outer .item.slow {
        animation-duration: 70s;
    }
    .art-index-main-page .index-company .card-outer:hover .item{
        animation-play-state: paused;
    }
    .art-index-main-page .index-company .card-outer .item .card{
        width: 200px;
        height: 80px;
        display: inline-block;
        margin-right: 40px;
        background: #FFFFFF;
        background-size: 100% 100%;
        box-shadow: 0px 0px 20px 0px rgba(215,226,242,0.6);
        border-radius: 8.57px;
    }
    @keyframes cardloop {
        0% {
            left: 0;
        }
        100% {
            left: -2160px;
        }
    }
 
</style>

<div class="index-company">
    <div class="top-title">和100万+企业用户共同成长</div>
    <div class="evaluation-card">
        
            <div class="card left3" data-index="0">
                <div class="card-header">
                    <img data-src="/index/img/index/company/evaluation/logo_wdqc.png" alt="xinfutong" />
                    <label>郇正振</label>
                    <span>沃德汽车财务总监</span>
                </div>
                <div class="card-body">
                    <div class="showtitle">
                        <label>90</label>
                        <span>%</span>
                    </div>
                    <div class="subtitle">发票管理效率提升</div>
                    <div class="line"></div>
                    <p>招商银行不但能够提供金融服务，还可以输出金融科技能力，是一家与众不同的银行；团队非常专业和敬业，能够及时解决问题、持续做好服务。</p>
                </div>
            </div>
        
            <div class="card left2" data-index="1">
                <div class="card-header">
                    <img data-src="/index/img/index/company/evaluation/logo_makj.png" alt="xinfutong" />
                    <label>杨总</label>
                    <span>默安科技财务总监</span>
                </div>
                <div class="card-body">
                    <div class="showtitle">
                        <label>50</label>
                        <span>万</span>
                    </div>
                    <div class="subtitle">年节省系统采购费用</div>
                    <div class="line"></div>
                    <p>薪福通打通了我司费控、网银、金蝶、算薪、报税一条龙的场景，强大的产品、研发、售后团队及时响应，提供服务保障，推动了我司财务数字化管理升级。</p>
                </div>
            </div>
        
            <div class="card left" data-index="2">
                <div class="card-header">
                    <img data-src="/index/img/index/company/evaluation/logo_eed.png" alt="xinfutong" />
                    <label>池浩泽</label>
                    <span>额尔敦信息部经理</span>
                </div>
                <div class="card-body">
                    <div class="showtitle">
                        <label>20</label>
                        <span>%</span>
                    </div>
                    <div class="subtitle">线上审批效率提升</div>
                    <div class="line"></div>
                    <p>薪福通环环相扣，各项功能紧凑相连，有一套完整的假勤体系和费控体系，在人事、费控方面非常适合公司的实际情况。</p>
                </div>
            </div>
        
            <div class="card center" data-index="3">
                <div class="card-header">
                    <img data-src="/index/img/index/company/evaluation/logo_xx.png" alt="xinfutong" />
                    <label>徐翔</label>
                    <span>星河物业行政副经理</span>
                </div>
                <div class="card-body">
                    <div class="showtitle">
                        <label>100</label>
                        <span>%</span>
                    </div>
                    <div class="subtitle">算薪、审批效率提升</div>
                    <div class="line"></div>
                    <p>我们在23年正式使用薪福通，过程中与招商银行一起不断成长，也希望我们今后的合作可以更加顺利和愉快。</p>
                </div>
            </div>
        
            <div class="card right" data-index="4">
                <div class="card-header">
                    <img data-src="/index/img/index/company/evaluation/logo_Arthur.png" alt="xinfutong" />
                    <label>Arthur</label>
                    <span>德威国际风险经理</span>
                </div>
                <div class="card-body">
                    <div class="showtitle">
                        <label>50</label>
                        <span>%</span>
                    </div>
                    <div class="subtitle">员工报销效率提升</div>
                    <div class="line"></div>
                    <p>薪福通的确是一款不错的产品，系统的功能非常丰富，我们公司深度使用了员工算薪算税、出差报销等应用，提升了业务经办人员和管理人员的工作效率。</p>
                </div>
            </div>
        
            <div class="card right2" data-index="5">
                <div class="card-header">
                    <img data-src="/index/img/index/company/evaluation/logo_ltgd.png" alt="xinfutong" />
                    <label>张汉林</label>
                    <span>莱特光电人力主管</span>
                </div>
                <div class="card-body">
                    <div class="showtitle">
                        <label>2</label>
                        <span>人天</span>
                    </div>
                    <div class="subtitle">每月人事工作节约人力</div>
                    <div class="line"></div>
                    <p>薪福通在很大程度上提高了我们的工作效率，解放了公司人力，我们对其强大的技术实力和金牌服务也非常信任。</p>
                </div>
            </div>
        
            <div class="card right3" data-index="6">
                <div class="card-header">
                    <img data-src="/index/img/index/company/evaluation/logo_lszm.png" alt="xinfutong" />
                    <label>张清</label>
                    <span>雷士照明CFO</span>
                </div>
                <div class="card-body">
                    <div class="showtitle">
                        <label>60</label>
                        <span>万/年</span>
                    </div>
                    <div class="subtitle">节省报销相关成本</div>
                    <div class="line"></div>
                    <p>使用招行薪福通后，大大提升了财务管理的审批效率，减少了不必要的人工干预繁琐流程，协助企业实现降本增效。</p>
                </div>
            </div>
        
    </div>
    <div class="company-card">
        
            <div class="card-outer">
                <div class="item ">
                    
                        <div class="card" style="background-image: url('/index/img/index/company/1_1.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/1_2.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/1_3.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/1_4.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/1_5.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/1_6.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/1_7.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/1_8.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/1_9.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/1_10.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/1_11.png');"></div>
                    
                </div>
                <div class="item ">
                    
                        <div class="card" style="background-image: url('/index/img/index/company/1_1.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/1_2.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/1_3.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/1_4.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/1_5.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/1_6.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/1_7.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/1_8.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/1_9.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/1_10.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/1_11.png');"></div>
                    
                </div>
            </div>
        
            <div class="card-outer">
                <div class="item slow">
                    
                        <div class="card" style="background-image: url('/index/img/index/company/2_1.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/2_2.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/2_3.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/2_4.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/2_5.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/2_6.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/2_7.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/2_8.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/2_9.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/2_10.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/2_11.png');"></div>
                    
                </div>
                <div class="item slow">
                    
                        <div class="card" style="background-image: url('/index/img/index/company/2_1.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/2_2.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/2_3.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/2_4.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/2_5.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/2_6.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/2_7.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/2_8.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/2_9.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/2_10.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/2_11.png');"></div>
                    
                </div>
            </div>
        
            <div class="card-outer">
                <div class="item ">
                    
                        <div class="card" style="background-image: url('/index/img/index/company/3_1.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/3_2.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/3_3.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/3_4.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/3_5.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/3_6.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/3_7.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/3_8.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/3_9.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/3_10.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/3_11.png');"></div>
                    
                </div>
                <div class="item ">
                    
                        <div class="card" style="background-image: url('/index/img/index/company/3_1.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/3_2.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/3_3.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/3_4.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/3_5.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/3_6.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/3_7.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/3_8.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/3_9.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/3_10.png');"></div>
                    
                        <div class="card" style="background-image: url('/index/img/index/company/3_11.png');"></div>
                    
                </div>
            </div>
        
        <div class="left-bg"></div>
        <div class="right-bg"></div>
    </div>
</div>

<script type="text/javascript">
    (function() {
        var baseEle = document.querySelector('.art-index-main-page');
        var cardClassNames = [];
        var cards = baseEle.querySelectorAll('.index-company .evaluation-card .card');

        var clickFunc = function($event) {
            var idx = parseInt(this.getAttribute('data-index'));


            if (cardClassNames[idx].split(' ').indexOf('left') > -1) {
                var tmp = cardClassNames[0];
                cardClassNames = cardClassNames.slice(1);
                cardClassNames.push(tmp);
                
            } else if (cardClassNames[idx].split(' ').indexOf('right') > -1) {
                var len = cardClassNames.length;
                var tmp = cardClassNames[len - 1];
                cardClassNames = cardClassNames.slice(0, len - 1);
                cardClassNames.unshift(tmp);
            }


            for(var i = 0; i < cards.length; i++) {
                cards[i].className = cardClassNames[i];
            }
        };

        for (var i = 0; i < cards.length; i++) {
            cardClassNames.push(cards[i].className);
            compatibleAddEvent(cards[i], "click", clickFunc);
        }
    })();
</script>


    


<style>
    .art-index-main-page .index-protect{
        width: 100%;
        height: 1305px;
        padding-top: 80px;
        padding-bottom: 68px;
        background: url('/index/img/index/protect/protect_bg.png') center no-repeat;
        background-size: 100% 100%;
    }
    .art-index-main-page .index-protect .title{
        font-size: 40px;
        color: #0B1636;
        text-align: center;
        line-height: 60px;
        font-weight: 600;
        margin-bottom: 68px;
    }

    .art-index-main-page .index-protect .pyramid{
        width: 1200px;
        height: 620px;
        margin: 0 auto;
        position: relative;
        margin-bottom: 48px;
    }

    .art-index-main-page .index-protect .pyramid img{
        display: block;
        width: 710px;
        height: 620px;
        margin-left: 245px;
    }

    .art-index-main-page .index-protect .pyramid .item{
        width: 323px;
        height: 140px;
        position: absolute;
        border-radius: 12px;
    }

    .art-index-main-page .index-protect .pyramid .item.active{
        width: 419px;
        height: 140px;
        box-shadow: 3px 6px 20px 0px rgba(136,167,213,0.27);
        background: url('/index/img/index/protect/item_bg.png') center no-repeat;
        padding-left: 25px;
    }
    
    .art-index-main-page .index-protect .pyramid .item .item-title{
        font-size: 24px;
        color: #0B1636;
        line-height: 32px;
        font-weight: 500;
        text-align: left;
        margin-bottom: 4px;
    }

    .art-index-main-page .index-protect .pyramid .item .item-title span{
        color: #1966FF;
        margin-right: 4px;
    }

    .art-index-main-page .index-protect .pyramid .item.active .item-title{
        font-size: 28px;
        line-height: 32px;
    }


    .art-index-main-page .index-protect .pyramid .item .item-detail{
        font-size: 16px;
        color: #47506B;
        text-align: left;
        line-height: 24px;
        font-weight: 400;
        padding-left: 33px;
    }

    .art-index-main-page .index-protect .pyramid .item.active .item-detail{
       padding-left: 38px;
    }

    .art-index-main-page .index-protect .pyramid .item.item_01{
        top: 57px;
        right: 0px;
        padding-top: 28px;
        padding-right: 0px;
        padding-left: 30px;
    }

    .art-index-main-page .index-protect .pyramid .item.item_01.active{
        top: 38px;
        right: -30px;
    }

    .art-index-main-page .index-protect .pyramid .item.item_02{
        top: 130px;
        left: 0px;
        padding-top: 28px;
        padding-right: 17px;
    }
    .art-index-main-page .index-protect .pyramid .item.item_02.active{
        top: 149px;
        left: -29px;
    }
    .art-index-main-page .index-protect .pyramid .item.item_03{
        top: 221px;
        right: 0px;
        padding-top: 36px;
        padding-left: 30px;
    }
    .art-index-main-page .index-protect .pyramid .item.item_03.active{
        top: 194px;
        right: -30px;
    }
    .art-index-main-page .index-protect .pyramid .item.item_04{
        top: 313px;
        left: 0px;
        padding-top: 28px;
        padding-right: 17px;
    }
    .art-index-main-page .index-protect .pyramid .item.item_04.active{
        top: 289px;
        left: -71px;
    }
    .art-index-main-page .index-protect .pyramid .item.item_05{
        top: 400px;
        right: -40px;
        padding-top: 28px;
        padding-right: 0px;
        padding-left: 30px;
    }
    .art-index-main-page .index-protect .pyramid .item.item_05.active{
        top: 358px;
        right: -83px;
    }

    .art-index-main-page .index-protect .line-box{
        position: absolute;
    }
    .art-index-main-page .index-protect .line-box .spot{
        float: left;
        width: 4px;
        height: 4px;
        border-radius: 8px;
        background: #CDD4E7;
    }
    .art-index-main-page .index-protect .line-box .line{
        float: left;
        width: calc(100% - 4px);
        height: 1px;
        background: #CDD4E7;
        margin-top: 1.5px;
    }
    .art-index-main-page .index-protect .item.active .line-box .spot{
        width: 8px;
        height: 8px;
        background: #1966FF;
    }

    .art-index-main-page .index-protect .item.active .line-box .line{
        width: calc(100% - 8px);
        height: 2px;
        background: #1966FF;
        margin-top: 3px;
    }

    .art-index-main-page .index-protect .pyramid .item.item_01 .line-box{
        width: 227px;
        right: 309px;
        top: 43px;
        transform: rotate(180deg);
    }

    .art-index-main-page .index-protect .pyramid .item.item_01.active .line-box{
        width: 168px;
        right: 412px;
        top: 48px;
    }

    .art-index-main-page .index-protect .pyramid .item.item_02 .line-box{
        width: 333px;
        left: 169px;
        top: 42px;
    }
    .art-index-main-page .pyramid .item.item_02.active .line-box{
       width: 330px;
       top: 40px;
       left: 221px;
    }

    .art-index-main-page .index-protect .pyramid .item.item_03 .line-box{
        width: 153px;
        right: 309px;
        top: 43px;
        transform: rotate(180deg);
    }
    .art-index-main-page .index-protect .pyramid .item.item_03.active .line-box{
       width: 79px;
       top: 51px;
       right: 412px;
    }

    .art-index-main-page .index-protect .pyramid .item.item_04 .line-box{
        width: 251px;
        left: 169px;
        top: 42px;
    }
    .art-index-main-page .index-protect .pyramid .item.item_04.active .line-box{
        width: 259px;
        left: 221px;
        top: 49px;
    }

    .art-index-main-page .index-protect .pyramid .item.item_05 .line-box{
        width: 78px;
        right: 309px;
        top: 43px;
        transform: rotate(180deg);
    }
    .art-index-main-page .index-protect .pyramid .item.item_05.active .line-box{
       width: 41px;
       top: 51px;
       right: 412px;
    }

    .art-index-main-page .index-protect .content{
        width: 100%;
        height: 350px;
        max-width: 1400px;
        background: #FFFFFF;
        box-shadow: 0px 3px 9px 0px rgba(203,218,233,0.84);
        border-radius: 12px;
        margin: 0 auto;
    }
    .art-index-main-page .index-protect .item-wrap{
        width: 1200px;
        height: 100%;
        padding-top: 56px;
        margin: 0 auto;

    }
    .art-index-main-page .index-protect .content .item{
        width: 336px;
        float: left;
    }
    .art-index-main-page .index-protect .content .item.item_02{
        margin: 0 96px;
    }

    .art-index-main-page .index-protect .content .item img{
        display: block;
        width: 104px;
        height: 104px;
        margin: 0 auto;
        margin-bottom: 24px;
        border-radius: 100%;
        box-shadow: 0px 13px 30px 0px rgba(215, 226, 242, 0.6);
    }
    .art-index-main-page .index-protect .content .item .item-title{
        font-size: 18px;
        color: #0B1636;
        text-align: center;
        line-height: 28px;
        font-weight: 600;
        margin-bottom: 10px;
    }

    .art-index-main-page .index-protect .content .item .item-detail{
        font-size: 14px;
        color: #47506B;
        text-align: center;
        line-height: 24px;
        font-weight: 400;
    }
</style>

<div class="index-protect">
    <div class="title">银行级安全为您保驾护航</div>
    <div class="pyramid">
        <img data-src="/index/img/index/protect/pyramid.png">
        
            <div class="item item_01 ">
                <div class="item-title"><span>01</span>专控保护级</div>
                <div class="item-detail">军工等国家重要领域、重要部分中的重要系统</div>
                <div class="line-box">
                    <div class="spot"></div>
                    <div class="line"></div>
                </div>
            </div>
        
            <div class="item item_02 active">
                <div class="item-title"><span>02</span>强制保护级</div>
                <div class="item-detail">银行、税务、电力等涉及国家安全、国计民生的核心系统等</div>
                <div class="line-box">
                    <div class="spot"></div>
                    <div class="line"></div>
                </div>
            </div>
        
            <div class="item item_03 ">
                <div class="item-title"><span>03</span>监督保护级</div>
                <div class="item-detail">各省或全国重要信息系统等</div>
                <div class="line-box">
                    <div class="spot"></div>
                    <div class="line"></div>
                </div>
            </div>
        
            <div class="item item_04 ">
                <div class="item-title"><span>04</span>指导保护级</div>
                <div class="item-detail">重要单位、省市级以上国家机关的信息系统等</div>
                <div class="line-box">
                    <div class="spot"></div>
                    <div class="line"></div>
                </div>
            </div>
        
            <div class="item item_05 ">
                <div class="item-title"><span>05</span>自主保护级</div>
                <div class="item-detail">小型私营、个体企业、中小学信息系统等</div>
                <div class="line-box">
                    <div class="spot"></div>
                    <div class="line"></div>
                </div>
            </div>
        
    </div>
    <div class="content">
        <div class="item-wrap">
            
                <div class="item item_01">
                    <img data-src="/index/img/index/protect/ansi.png" />
                    <div class="item-title">最高级国标T4级数据中心</div>
                    <div class="item-detail">由ANSI颁布国际通用的《数据中心电信基础设施标准》，将IDC数据中心基础设施的可用性定义了<br/>Tier 1、Tier 2、Tier 3、Tier 4四个等级，T4为<br/> 最高等级。</div>
                </div>
            
                <div class="item item_02">
                    <img data-src="/index/img/index/protect/iso.png" />
                    <div class="item-title">ISO20000认证</div>
                    <div class="item-detail">ISO20000是针对信息技术服务管理领域的国际标准。招商银行基于ISO/IEC20000-1:2011建立的完善的<br/>信息技术服务管理体系，已获得权威机构认证。</div>
                </div>
            
                <div class="item item_03">
                    <img data-src="/index/img/index/protect/djcp.png" />
                    <div class="item-title">等保三级</div>
                    <div class="item-detail">薪福通平台通过了公安部信息安全等保三级测评，<br/> 能满足绝大部分行业的安全需求。按《网络安全法》履行了应尽的安全责任。</div>
                </div>
            
        </div>
    </div>
</div>


        <style>
    .art-index-main-page .sidebox-wrapper {
        position: fixed;
        right: 17px;
        bottom: 100px;
        width: 68px;
        padding-bottom: 84px;
        z-index: 99;
    }
    .art-index-main-page .sidebox-wechat-consult {
        width: 100%;
        background: #ffffff;
        box-shadow: 0px 4px 20px 6px rgba(144, 159, 210, 0.21);
        border-radius: 8px;
        padding: 8px;
    }
    .art-index-main-page .sidebox-wechat-consult:hover {
        transform: scale(1.7);
        transform-origin: 100% 100%;
    }
    .art-index-main-page .sidebox-wechat-consult .wechat-consult-img {
        width: 52px;
        height: 52px;
        background-size: cover;
    }
    .art-index-main-page .sidebox-wechat-consult span {
        font-size: 12px;
        color: #47506b;
        margin-top: 2px;
        line-height: 14px;
        text-align: center;
        display: block;
    }
    .art-index-main-page .sidebox-consult-list {
        margin-top: 16px;
        padding: 0 10px;
        box-shadow: 0px 2px 20px 6px rgba(144, 159, 210, 0.21);
        border-radius: 8px;
        background: white;
    }
    .art-index-main-page div.sidebox-consult-item {
        border-bottom: 1px solid #DDE1E8;
    }
    .art-index-main-page .sidebox-consult-item {
        padding: 10px 0;
        cursor: pointer;
    }
    .art-index-main-page a.sidebox-consult-item {
        text-decoration: none;
        display: block;
    }
    .art-index-main-page .sidebox-consult-item i {
        width: 28px;
        height: 28px;
        margin: 0 auto;
        margin-bottom: 2px;
        display: block;
    }
    .art-index-main-page .sidebox-consult-item span {
        font-size: 12px;
        color: #47506B;
        display: block;
        text-align: center;
    }
    .art-index-main-page .sidebox-consult-item:hover span {
        color: #2C82FF;
    }
    .art-index-main-page .sidebox-scroll-to-top-wrapper {
        display: none;
    }
    .art-index-main-page .sidebox-scroll-to-top {
        background-color: white;
        box-shadow: 0px 4px 20px 6px rgba(144, 159, 210, 0.21);
        border-radius: 8px;
        margin-top: 16px;
        height: 68px;
        width: 100%;
        background-position: center;
        background-repeat: no-repeat;
        cursor: pointer;
        position: absolute;
        right: 0;
        bottom: 0;
    }
    .art-index-main-page .sidebox-wechat-consult .wechat-consult-img {
        background: url(/index/img/sidebox-template/sidebox-wechat-consult.png) center
            no-repeat;
        background-size: 100% 100%;
    }
    .art-index-main-page .sidebox-online-consult-icon {
        background: url(/index/img/sidebox-template/sidebox-online-consult.png) center
            no-repeat;
    }
    .art-index-main-page .sidebox-consult-item:hover .sidebox-online-consult-icon {
        background: url(/index/img/sidebox-template/sidebox-online-consult-hover.png) center
            no-repeat;
    }
    .art-index-main-page .sidebox-message-consult-icon {
        background: url(/index/img/sidebox-template/sidebox-message-consult.png) center
            no-repeat;
    }
    .art-index-main-page .sidebox-consult-item:hover .sidebox-message-consult-icon {
        background: url(/index/img/sidebox-template/sidebox-message-consult-hover.png) center
            no-repeat;
    }
    .art-index-main-page .sidebox-help-center-icon {
        background: url(/index/img/sidebox-template/sidebox-help-center.png) center no-repeat;
    }
    .art-index-main-page .sidebox-consult-item:hover .sidebox-help-center-icon {
        background: url(/index/img/sidebox-template/sidebox-help-center-hover.png) center
            no-repeat;
    }
    .art-index-main-page .sidebox-barrier-free-icon {
        background: url(/index/img/sidebox-template/sidebox-barrier-free.png) center no-repeat;
    }
    .art-index-main-page .sidebox-consult-item:hover .sidebox-barrier-free-icon {
        background: url(/index/img/sidebox-template/sidebox-barrier-free-hover.png) center
            no-repeat;
    }
    .art-index-main-page .sidebox-scroll-to-top {
        background-image: url(/index/img/sidebox-template/sidebox-return-top.png);
    }
    .art-index-main-page .sidebox-scroll-to-top:hover {
        background-image: url(/index/img/sidebox-template/sidebox-return-top-hover.png);
    }
</style>
<div class="sidebox-wrapper">
    <div class="sidebox-wechat-consult">
        <div class="wechat-consult-img"></div>
        <span>微信咨询</span>
    </div>
    <div class="sidebox-consult-list">
        <div x-track-id class="sidebox-consult-item">
            <i class="sidebox-online-consult-icon"></i>
            <span>在线咨询</span>
        </div>
        <div x-track-id class="sidebox-consult-item">
            <i class="sidebox-message-consult-icon"></i>
            <span>留言咨询</span>
        </div>
        <a x-track-id href="/helpapp/#/help-main" class="sidebox-consult-item" target="_blank" rel="opener">
            <i class="sidebox-help-center-icon"></i>
            <span>帮助中心</span>
        </a>
        <a x-track-id class="sidebox-consult-item" id="assist-open-container">
            <i class="sidebox-barrier-free-icon" id="assist-open"></i>
            <span>无障碍</span>
        </a>
    </div>
    <div class="sidebox-scroll-to-top-wrapper">
        <div class="sidebox-scroll-to-top"></div>
    </div>
</div>
<script>
    (function() {
        if (window.navigator.userAgent.includes('DingTalk')) {
            document.getElementById('assist-open-container').style.display = 'none';
        } else {
            document.getElementById('assist-open-container').style.display = 'block';
        }
    })()
</script>
<script>
    var consultTypeDataSource = [
        {
            parentCode: '',
            code: '0',
            name: '售前咨询（未注册用户）'
        },
        {
            parentCode: '',
            code: '1',
            name: '使用咨询（已注册用户）'
        }
    ];
    subscribeLoaded(setSideboxOnlineConsult);
    // 在线客服
    function setSideboxOnlineConsult() {
        var sideboxConsultList = document.querySelectorAll('.sidebox-consult-item');
        if (sideboxConsultList.length === 0) {
            return;
        }
        var onlineConSultItem = sideboxConsultList[0];
        var messageConsultItem = sideboxConsultList[1];
        var scrollTopItem = document.querySelector('.sidebox-scroll-to-top');
        var scrollTopItemWrapper = document.querySelector('.sidebox-scroll-to-top-wrapper');
        var layoutWrapper = document.querySelector('.layout-art');
        onlineConSultItem && compatibleAddEvent(onlineConSultItem, 'click', function () {
            // 在线客服，侧边展示
            ExtJsUtil.showOnlineService();
        });
        messageConsultItem && compatibleAddEvent(messageConsultItem, 'click', function () {
            // 留言咨询
            ExtJsUtil.showConsult();
        });
        scrollTopItem && compatibleAddEvent(scrollTopItem, 'click', function () {
            topScroll();
        });
        layoutWrapper && compatibleAddEvent(layoutWrapper, 'scroll', function() {
            if (layoutWrapper.scrollTop > 0) {
                scrollTopItemWrapper.style.display = 'block';
            } else {
                scrollTopItemWrapper.style.display = 'none';
            }
        })
    }
    function topScroll() {
        var layoutWrapper = document.querySelector('.layout-art');
        if (!layoutWrapper) {
            return;
        }
        // var stopScrollHandle = true;
        var timer, itv;
        if (!!window.ActiveXObject || "ActiveXObject" in window) { //IE与其他浏览器速率不同
            itv = 4;
        } else {
            itv = 8;
        }
        timer = setInterval(function() {
            //设置速度由快到慢
            var ispeed = Math.floor(-layoutWrapper.scrollTop / itv);
            layoutWrapper.scrollTop = layoutWrapper.scrollTop + ispeed;
            if (layoutWrapper.scrollTop == 0) {
                clearInterval(timer);
                // stopScrollHandle = false;
            }
        }, 10);
    }
    function handleCmbAssist(){
           setTimeout(function(){
            var owncookies = document.cookie.split('; ') || [];
            var assists = owncookies.filter((v) => v.startsWith('cmb-assist='));
            console.log('window.location.hash', window.location.hash)
            if(window.location.hash!=='') {
               
                document.body.style.marginTop=0;
            } else {
                if(assists.length>0 && unescape(assists[0].split('=')[1])) {
                    var showAssits = JSON.parse( unescape(assists[0].split('=')[1])) || {};
                    console.log(showAssits);
                    if (showAssits.show === true) {
                        document.body.style.marginTop='155px';
                    }
                }
            }
        },200)
    }
    handleCmbAssist();
    function listenerUnload() {
        var now = Date.now();
        var expireTime = new Date(now - 86400000);  
        document.cookie = "cmb-assist=;expires=" + expireTime.toUTCString();
    }
    if (window.addEventListener) { // 标准浏览器
        window.addEventListener('beforeunload', listenerUnload, false);
    } else if (window.attachEvent) { // IE浏览器
        window.attachEvent("beforeunload", listenerUnload);
    }
</script>

        <style>
    /* 引导注册样式 */
    .art-index-main-page .guide-register-wrapper {
        height: 320px;
        background: url(/index/img/guide-register/guide_register_bg.png) no-repeat;
        background-size: 100% 100%;
        padding-top: 58px;
    }

    .art-index-main-page .guide-register-wrapper .guide-title {
        margin: 0 auto 40px;
        width: 366px;
        height: 98px;
        background: url(/index/img/guide-register/slogan.png) no-repeat;
        background-size: 100% 100%;
    }

    .art-index-main-page .guide-register-wrapper .guide-btn-area {
        text-align: center;
        font-size: 0;
    }

    .art-index-main-page .guide-register-wrapper .guide-btn-area button,
    .art-index-main-page .guide-register-wrapper .guide-btn-area .xft-btn-register {
        width: 184px;
        height: 52px;
        font-size: 18px;
        letter-spacing: 0.38px;
        outline: none;
        border-radius: 6px;
        box-shadow: inset 0px 1px 3px 0px rgba(255, 255, 255, 0.5);
        padding: 0;
        font-weight: bold;
    }

    .art-index-main-page .guide-register-wrapper .xft-btn-register {
        background: #ffffff;
        margin-right: 32px;
        text-decoration: none;
        color: #0081ff;
        line-height: 52px;
        display: inline-block;
    }

    .art-index-main-page .guide-register-wrapper .consult-us-btn {
        border: 1px solid rgba(255, 255, 255, 1);
        background: transparent;
        color: #ffffff;
    }
</style>
<div class="guide-register-wrapper">
    <div class="guide-title"></div>
    <div class="guide-btn-area">
        <a
            x-track-id
            class="xft-btn-register"
            href="/#/register"
            target="_blank"
            rel="opener"
        >
            免费注册
        </a>
        <button class="consult-us-btn">留言咨询</button>
    </div>
</div>

<script type="text/javascript">
    subscribeLoaded(setConsultClick);
    function setConsultClick() {
        var contactBtn = document.querySelector(".consult-us-btn");
        contactBtn && compatibleAddEvent(contactBtn, 'click', function () {
            // 留言咨询
            ExtJsUtil.showConsult();
        });
    }
</script>
        <style>
    /* 底部模板样式 */
    .art-index-main-page .footer-container {
        height: 525px;
        background: #282f3d;
        position: relative;
    }
    .art-index-main-page .footer-container .footer-content {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 1218px;
        height: 368px;
    }
    .art-index-main-page .footer-container .top-area {
        overflow: hidden;
    }
    .art-index-main-page .footer-container .contact-us-area {
        float: left;
    }
    .art-index-main-page .footer-container .contact-us-area .logo-box{
        display:flex;
        align-items:center;
        margin-bottom: 32px;
    }
    .art-index-main-page .footer-container .contact-us-area .navigation-ipv6{
        float: left;;
        margin-left: 20px;
        height: 48px;
        width: 48px;
        background: url(/index/img/IPv6.svg) center no-repeat;
    }
    .art-index-main-page .footer-container .logo-area {
        width: 194px;
        height: 30px;
    }
    .art-index-main-page .footer-container .customer-phone {
        font-size: 18px;
        color: #ffffff;
        line-height: 18px;
        font-weight: 700;
    }
    .art-index-main-page .footer-container .customer-phone i {
        width: 14px;
        height: 14px;
        background-size: contain;
        display: inline-block;
        margin-right: 4px;
    }
    .art-index-main-page .footer-container .serve-time {
        font-size: 12px;
        color: #82899e;
        line-height: 14px;
        padding-left: 20px;
        margin-top: 4px;
    }
    .art-index-main-page .footer-container .qr-code-area {
        display: flex;
        margin-top: 32px;
    }
    .art-index-main-page .footer-container .wechat-code {
        float: left;
        text-align: center;
    }
    .art-index-main-page .footer-container .wechat-code:first-child {
        margin-right: 24px;
    }
    .art-index-main-page .footer-container .wechat-code img {
        width: 100px;
        height: 100px;
    }
    .art-index-main-page .footer-container .wechat-code span {
        font-size: 14px;
        color: #82899e;
        line-height: 22px;
        margin-top: 4px;
        display: block;
    }
    .art-index-main-page .footer-container .more-links-area {
        margin-left: 134px;
        display:flex;
    }

    .art-index-main-page .footer-container .link-group {
       margin-left:97px;
    }
    .art-index-main-page .footer-container .link-group-list{
        display:flex;
        flex-direction: column;
    }
    .art-index-main-page .footer-container .link-group.product{
        width:116px;
    }
    .art-index-main-page .footer-container .link-group.product .link-group-list{
        width:116px;
        flex-direction: row;
        flex-wrap:wrap;
    }
    .art-index-main-page .footer-container .link-group.product .link-group-list li:nth-child(even){
         margin-left:10px;
    }
    .art-index-main-page .footer-container .link-group.solution{
         width:96px;
    }
    .art-index-main-page .footer-container .link-group.solution .link-group-list{
        width:96px;
    }
    .art-index-main-page .footer-container .link-group.about-xft{
         width:96px;
    }
    .art-index-main-page .footer-container .surpport{
         width:56px;
    }
    .art-index-main-page .footer-container .law {
         width:96px;
    }
    
    .art-index-main-page .footer-container h3.link-group-title {
        font-size: 14px;
        color: #ffffff;
        line-height: 22px;
        font-weight: 500;
        margin-bottom: 16px;
    }
    .art-index-main-page .footer-container .link-group-list li {
        margin-bottom: 8px;
        line-height: 20px;
    }
    
    .art-index-main-page .footer-container .link-group-list li {
        
    }
    .art-index-main-page .footer-container .link-group-list a {
        text-decoration: none;
        color: #82899e;
        font-size: 12px;
    }
    .art-index-main-page .footer-container .link-group-list a:hover {
        color: #2C82FF;
    }

    .art-index-main-page .footer-container .bottom-area {
        margin-top: 42px;
        width: 100%;
    }
    .art-index-main-page .footer-container .exchange-links span {
        font-size: 14px;
        color: #ffffff;
        line-height: 22px;
    }
    .art-index-main-page .footer-container a.exchange-link {
        font-size: 14px;
        color: #82899e;
        line-height: 22px;
        margin-right: 24px;
        text-decoration: none;
    }
    .art-index-main-page .footer-container a.exchange-link:hover {
        color: #2C82FF;
    }
    .art-index-main-page .footer-container .bottom-area hr {
        opacity: 0.09;
        background: #ffffff;
        margin: 16px 0;
        height: 1px;
        border: none;
    }
    .art-index-main-page .footer-container p.site-record {
        font-size: 12px;
        color: #82899e;
        line-height: 12px;
    }
    .art-index-main-page .footer-container p.site-record  a.link{
        font-size: 12px;
        color: #82899e;
        line-height: 12px;
        text-decoration: none;
    }
    .art-index-main-page .footer-container p.site-record  a.link:hover {
        color: #2C82FF;
    }
    .art-index-main-page .footer-container .logo-area {
        background: url(/index/img/footer-template/logo_white.svg) no-repeat;
    }
    .art-index-main-page .footer-container .customer-phone i {
        background: url(/index/img/footer-template/ic_phone_white.svg) no-repeat;
    }
</style>
<div class="footer-container">
    <div class="footer-content">
        <div class="top-area">
            <div class="contact-us-area">
                <div class="logo-box">
                    <div class="logo-area"></div>
                    <div class="navigation-ipv6"></div>
                </div>
                <div class="customer-phone-area">
                    <div class="customer-phone">
                        <i></i>400-0695-555
                    </div>
                    <p class="serve-time">工作日 08:30-18:00</p>
                </div>
                <div class="qr-code-area">
                    <div class="wechat-code">
                        <img
                            src="/index/img/footer-template/wechat_official_account.png"
                            alt=""
                        />
                        <span>薪福通公众号</span>
                    </div>
                    <div class="wechat-code">
                        <img
                            src="/index/img/footer-template/download.png"
                            alt=""
                        />
                        <span>掌上薪福通App</span>
                    </div>
                </div>
            </div>
            <div class="more-links-area">
                <div class="link-group product">
                    <h3 class="link-group-title">产品介绍</h3>
                    <ul class="link-group-list">
                        <li>
                            <a href="/index/subproduct-new/subproduct-new1.html" target="_self">组织员工</a>
                        </li>
                        <li>
                            <a href="/index/subproduct-new/subproduct-new7.html" target="_self">发票管理</a>
                        </li>
                        <li>
                            <a href="/index/subproduct-new/subproduct-new2.html" target="_self">假勤管理</a>
                        </li>
                        <li>
                            <a href="/index/subproduct-new/subproduct-new8.html" target="_self">费用管理</a>
                        </li>
                        <li>
                            <a href="/index/subproduct-new/subproduct-new3.html" target="_self">薪酬管理</a>
                        </li>
                        <li>
                            <a href="/index/subproduct-new/subproduct-new9.html" target="_self">财务核算</a>
                        </li>
                        <li>
                            <a href="/index/subproduct-new/subproduct-new4.html" target="_self">社保管理</a>
                        </li>
                        <li>
                            <a href="/index/subproduct-new/subproduct-new10.html" target="_self">应收应付</a>
                        </li>
                        <li>
                            <a href="/index/subproduct-new/subproduct-new5.html" target="_self">个税管理</a>
                        </li>
                        <li>
                            <a href="/index/subproduct-new/subproduct-new13.html" target="_self">审批管理</a>
                        </li>
                        <li>
                            <a href="/index/subproduct-new/subproduct-new6.html" target="_self">薪资代发</a>
                        </li>
                        <li>
                            <a href="/index/subproduct-new/subproduct-new12.html" target="_self">数据分析</a>
                        </li>
                        <li>
                            <a href="/index/subproduct-new/subproduct-new11.html" target="_self">团体福利</a>
                        </li>
                    </ul>
                </div>
                <div class="link-group solution">
                    <h3 class="link-group-title">解决方案</h3>
                    <ul class="link-group-list">
                        <li><a href="/index/solution/solution1.html" target="_self">制造业</a></li>
                        <li><a href="/index/solution/solution13.html" target="_self">国有企业</a></li>
                        <li><a href="/index/solution/solution9.html" target="_self">科技（软件）</a></li>
                        <li><a href="/index/solution/solution3.html" target="_self">零售连锁（餐饮）</a></li>
                        <li><a href="/index/solution/solution2.html" target="_self">人力资源</a></li>
                        <li><a href="/index/solution/solution10.html" target="_self">集团企业</a></li>
                    </ul>
                </div>
                <div class="link-group about-xft">
                    <h3 class="link-group-title">了解薪福通</h3>
                    <ul class="link-group-list">
                        <li>
                            <a href="/index/about-us/about-us.html" target="_self">关于我们</a>
                        </li>
                        <li><a href="/zx" target="_self">新闻资讯</a></li>
                        <li><a href="/index/apply-center/apply-center.html" target="_self">应用中心</a></li>
                        <li>
                            <a href="/index/safety-protect/safety-protect.html" target="_self">安全保障</a>
                        </li>
                    </ul>
                </div>
                <div class="link-group surpport">
                    <h3 class="link-group-title">服务支持</h3>
                    <ul class="link-group-list">
                        <li>
                            <a href="/helpapp/#/help-main" target="_blank" rel="opener">帮助中心</a>
                        </li>
                        <li>
                            <a
                                href="javascript:;"
                                class="online-consult"
                                >在线咨询</a
                            >
                        </li>
                    </ul>
                </div>
                <div class="link-group law">
                    <h3 class="link-group-title">法律与合规</h3>
                    <ul class="link-group-list">
                        <li>
                            <a href="/index/service-agreement.html" target="_blank"
                                >服务协议</a
                            >
                        </li>
                        <li>
                            <a href="/index/privacy-policy.html" target="_blank"
                                >个人信息保护政策</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="bottom-area">
            
            <hr />
            <p class="site-record">
                招商银行一网通&nbsp;创建于一九九七年&nbsp;©&nbsp;<span id="portal_footer_copyright_year">2025</span>&nbsp;招商银行&nbsp;版权所有&nbsp;
                <a
                    href="http://beian.miit.gov.cn/"
                    target="_blank"
                    class="link"
                >粤ICP备17088997号</a>
                <a
                    href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030402004984"
                    target="_blank"
                    class="link"
                >粤公网安备&nbsp;44030402004984号</a>
            </p>
        </div>
    </div>
</div>
<script type="text/javascript">
    subscribeLoaded(setOnlineConsult);
    function setOnlineConsult() {
        var onlineConSult = document.querySelector(".online-consult");
        // 在线客服
        onlineConSult && compatibleAddEvent(onlineConSult, 'click', function () {
            ExtJsUtil.showOnlineServiceCenter();
        });

        document.querySelector('#portal_footer_copyright_year').innerText = (new Date()).getFullYear();
    }
</script>


   </div>
   <!-- 新的埋点 -->
   <script src="https://s3gw.cmbimg.com/lw3601-xftcdn-prd/track/xft-web-track-sdk@1.0.6.js?t=1740559684082" async></script>
   
    <!-- 首页banner&新闻咨询加载 -->
    <script type="text/javascript">
        (function() {
            var baseEle = document.querySelector('.art-index-main-page');
            listenColorChange();
            function initRequest(){
                reqBanner();
                reqIndexNewsConsultBanner();
            }
            function listenColorChange() {
                var initClass;
                document.body.addEventListener('click', function(event) {
                    initClass = document.body.className;
                }, true);
                document.body.addEventListener('click', function(event) {
                   
                    // 获取点击对象
                    var clickedElement = event.target;
                    var classList = ['black-white-blue','blue-yellow-white','yellow-blue-black','black-yellow-white','normal-colors'];
                    if (classList.indexOf(clickedElement.id) !== -1) {
                        var splitClass = initClass.split(' ');
                        for (var splitClassName of splitClass) {
                            if (document.body.className.indexOf(splitClassName) === -1 && classList.indexOf(splitClassName) === -1) {
                                // 已增加对比色不二次添加 
                                document.body.classList.add(splitClassName);
                            }
                        }
                    }
                });
                
            }
            function hashchangeFunc(){
                if(!location.hash){
                    startTime = Date.now();
                    loadSource();
                    window.removeEventListener("hashchange", hashchangeFunc, false);
                    window.removeEventListener("pushState", hashchangeFunc, false);
                    setTimeout(function () {
                        initRequest();
                    }, 0);
                }
            }

            function loadSource() {
                var eleList = baseEle.querySelectorAll('[data-src]');
                if(eleList && eleList.length){
                    for (var i = 0; i < eleList.length; i++) {
                        var ele = eleList[i];
                        ele.setAttribute('src', ele.getAttribute('data-src'))
                    }
                }
            }

            function addWindowEvent(type){
                var orig = window.history[type];
                return function () {
                    var rv = orig.apply(this, arguments);
        
                    if (!document.createEvent) {
                        // IE浏览器支持fireEvent方法
                        var evt = document.createEventObject();
                        evt.arguments = arguments;
                        document.fireEvent('on' + type, evt);
                    } else {
                        // 其他标准浏览器使用dispatchEvent方法
                        var evtEvent = document.createEvent('HTMLEvents');
                        evtEvent.initEvent(type, true, true);
                        evtEvent.arguments = arguments;
                        window.dispatchEvent(evtEvent);
                    }
                    return rv;
                };
            };
            history.pushState = addWindowEvent('pushState');
            history.replaceState = addWindowEvent('replaceState');

            if(!location.hash){
                loadSource();
                initRequest();
            } else {
                compatibleAddEvent(window, "hashchange", hashchangeFunc);
                compatibleAddEvent(window, "pushState", hashchangeFunc);
            }
        })();
    </script>
    <!-- cdn探针 -->
    <script src="/cdn.js" onerror="window.__CDN_HOST = ''" async></script>
    <script src="/mainapp2/common/js/common.js" defer></script>
    <script src="/microbase/main.js" defer></script>
    <script src="/mainapp/js/xft_mainapp_common.min.js" defer></script>

   <script>
    (function() {
        if (!window.navigator.userAgent.includes('DingTalk') && window.location.hash === '') {
            addScriptTag()
        }
        function addScriptTag() {
            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.src = '//www.cmbchina.com/jk-aging/assist-entry.js';
            document.body.appendChild(script);
        }
    })()
    </script>
</body>
</html>
