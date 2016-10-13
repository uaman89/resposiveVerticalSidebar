
$(function(){

  var tableOfContent = $('#TableOfContents');

  // update side bar behaviour ( and not only... :( )
  //---------------------------------------

  if ( tableOfContent.length > 0 ) {

    var contentBlock = $('#main > article > .row');


    // highlight selected menu item
    tableOfContent.find('li a').click(function(){
      tableOfContent.find('li').removeClass('active current');
      $(this).parent().addClass('active current');
      $(this).parents('li').addClass('active');
    });


    tableOfContent.parents(".row").before('<div id="hideWhenLarge"></div>');

    var sideMenuWrapper = tableOfContent.find('ul:first');
    var sideMenuTop = tableOfContent.offset().top + 40; //40px - height of its title

    correctSideBarWidth();

    $('#main[role=main] article').css("opacity", "1");

    //check if sideBar taller than content

    contentHeight = contentBlock.height();
    // console.log("sideMenuHeight", sideMenuHeight);
    // console.log("contentHeight", contentHeight);

    if ( sideMenuWrapper.height() >  contentHeight ){
      sideMenuWrapper.height( contentHeight + 53 );
    }
    else{
      correctSideBarTopPosition();
      $(window).scroll(correctSideBarTopPosition);
    }

    $(window).resize(correctSideBarWidth);

    var curPage = tableOfContent.find('li a[href="'+location.pathname+'"]').parent().addClass("active open");
    curPage.parents("ul").parent("li").addClass("active open");

    // toogle submenu
    //-----------------------------------
    $("span.level-name").click(function(){
      var submenu = $(this).siblings("ul");
      $(submenu[0]).parent("li").toggleClass("open");
      checkSidebarHeight();
    });


    // build Prev/Next buttons
    // ( get urls from sidebar menu )
    //-----------------------------------

    if ( curPage.length > 0 ) {
      curPage.addClass('current');

      var prevPageLink, nextPageLink;
      var showPrevButton = true;


      if (curPage.index() == 0) {
        prevPageLink = curPage.closest('ul').prev().prev().find('a:first');

        if ( prevPageLink.length == 0){
          //console.log('don"t show it!');
          showPrevButton = false;
        }
      }
      else {
        prevPageLink = curPage.prev().find("a");
      }

      nextPageLink = curPage.next().find("a");

      if (prevPageLink.length == 0) {
        //try get prevMenuSection first item link
        prevPageLink = curPage.closest('ul').prev().find('a:first');
      }

      if (nextPageLink.length == 0) {
        //try get next MenuSection first item link
        nextPageLink = curPage.closest('ul').next().find('a:first');
      }

      var prevPageUrl = prevPageLink.attr("href");
      var nextPageUrl = nextPageLink.attr("href");

      var prevPageTitle = prevPageLink.html();
      var nextPageTitle = nextPageLink.html();


      // console.log('prevPageUrl', prevPageUrl);
      // console.log('prevPageUrl', prevPageUrl);


      if (prevPageUrl && showPrevButton) {
        $('#prevPageBtn').attr("href", prevPageUrl).find('span').html(prevPageTitle).end().show();
      }

      if (nextPageUrl) {
        $('#nextPageBtn').attr("href", nextPageUrl).find('span').html(nextPageTitle).end().show();
      }

    }
    // end  build Prev/Next buttons ------------------------------------------------------------------------------------


    // functions:
    //-----------------------

    function correctSideBarWidth() {
      isDesktopSize = $('#hideWhenLarge').css("display") === "none";

      if (isDesktopSize) {
        tableOfContent.addClass("col-md-1 col-lg-2");
        var outerWidth = tableOfContent.outerWidth();
        var padding =  outerWidth - tableOfContent.width();
        var newWidth = outerWidth*2 - padding;
        sideMenuWrapper.css({"width": newWidth, "margin-right": padding / 2});
      }
      else {
        tableOfContent.removeClass("col-md-1 col-lg-2");
        sideMenuWrapper.removeAttr("style");
      }

    }// correctSideBarWidth() ------------------------------------------------------------------------------------------


    function correctSideBarTopPosition() {


      //let sidebar follow down when user is scrolling
      if (isDesktopSize) {


        var marginTop = 15;

        var socShareTop = $('.social-share').offset().top;
        var sideBarBottomPosition =  window.scrollY + sideMenuWrapper.height() + marginTop;

        if ( sideBarBottomPosition >= socShareTop) {

          // pin sideBar to bottom
          sideMenuWrapper.css({
            top: socShareTop - sideMenuWrapper.height() - sideMenuWrapper.parent().offset().top,
            position: "absolute",
          });

        } else {

          sideMenuWrapper.css({
            position: ""
          });

          if ( window.scrollY > sideMenuTop - marginTop - 40 ) {

            // make it fixed
            sideMenuWrapper.css({
              top: marginTop + "px",
              position: "fixed"
            });

          } else {

            // pin sideBar at top
            sideMenuWrapper.css({
              top: "auto",
              position: ""
            });

          }

        }

      } // end isDesktop

    } // end correctSideBarTopPosition() -------------------------------------------------------------------------------


    function checkSidebarHeight() {

      var contentHeight = contentBlock.height();
      // console.log("contentHeight:",contentBlock.height() );
      // console.log("sideMenuWrapper.height():", sideMenuWrapper.height() );
      if ( sideMenuWrapper.height() > contentBlock.height() ){
        sideMenuWrapper.height( contentHeight + 53 );
      } else {
        correctSideBarTopPosition();
      }

    }


  } // end is #TableOfContents

  else{

    $('#main[role=main] article').css("opacity", "1");

  }

});
//----------------------------------------------------------------------------------------------------------------------
// end handle sidebar
