;
$(function() {
    'use strict';

    var sidebar = $('#sidebar'), //选择侧栏
        mask = $('.mask'), //选择遮罩
        sidebar_trigger = $('#sidebar_trigger'), //选择侧边栏按钮
        backBtn = $('.back-to-top'); //选择返回顶部

    function showSideBar() { //显示侧栏
        mask.fadeIn();
        sidebar.animate({ 'right': 0 });
    }

    function hideSideBar() { //隐藏侧栏
        mask.fadeOut();
        sidebar.animate({ 'right': -sidebar.width() });
    }
    sidebar_trigger.on('click', showSideBar)
    mask.on('click', hideSideBar)
    backBtn.on('click', function() { //点击返回顶部
        $('html,body').animate({
            scrollTop: 0
        }, 800)
    })
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > $(window).height())
            backBtn.fadeIn();
        else
            backBtn.fadeOut();
    })
    $(window).trigger('scroll');
})