///////////////////////////////////////////////////
//                                               //
//       Aetrex FitGenius API 1.0.0.0            //
//          All Rights Reserved. 2021            //
//                                               //
///////////////////////////////////////////////////
class WidgetFactory {
    constructor(controlIdent, container) {
      this._controlIdent = controlIdent;
      this._container = container;
    }
    get controlIdent() {
      return this._controlIdent;
    }
    get container() {
      return this._container;
    }
    get urlProfile() {
        return 'https://fitgeniuswebpluginapi.aetrextechnology.com/check_profile';
    }
    get urlFGscore2() {
        return 'https://fitgeniuswebpluginapi.aetrextechnology.com/shoeid_em_fgscores';
    }
    static getInstance(controlIdent, container) {
        var inst = null;
        switch(controlIdent) {
            case 'aetrex_profile_container': 
                inst = new AetrexFitGeniusProfileWidget(controlIdent, container);
                break;
            case 'aetrex_foot_profile_container': 
                inst = new AetrexFitGeniusFootProfileWidget(controlIdent, container);
                break;
            case 'aetrex_fitgenius_score_container': 
                inst = new AetrexFitGeniusScoreWidget(controlIdent, container);
                break;
            case 'aetrex_three_d_feet_container': 
                inst = new AetrexFitGenius3DFeetWidget(controlIdent, container);
                break;
            case 'aetrex_fitvision_container': 
                inst = new AetrexFitGeniusFitVisionWidget(controlIdent, container);
                break;
        }
        return inst;
    }
    draw () { }
    // date ordinal (ie: rd, th etc.)
    ordi(n) {
        var s='th';
        if(n===1 || n==21 || n==31) s='st';
        if(n===2 || n==22) s='nd';
        if(n===3 || n==23) s='rd';
        return n+s;
    }
    // draggable by https://www.w3schools.com/howto/howto_js_draggable.asp
    dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            // if present, the header is where you move the DIV from:
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            elmnt.onmousedown = dragMouseDown;
        }    
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }    
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }    
        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
}
class AetrexFitGeniusProfileWidget extends WidgetFactory {
    constructor(controlIdent, container) {
        super(controlIdent, container);
    }
    draw () {
        //let email = new URLSearchParams(location.search).get('email'); // querystring
        let email = this.container.getAttribute('user'); // custom attribute
        var top_container = document.createElement('fg-profile');
        top_container.setAttribute('user', email);
        this.container.appendChild(top_container);
    }
}
class AetrexFitGeniusFootProfileWidget extends WidgetFactory {
    constructor(controlIdent, container) {
        super(controlIdent, container);
    }
    draw () {
        //let email = new URLSearchParams(location.search).get('email'); // querystring
        let email = this.container.getAttribute('user'); // custom attribute
        let sku = this.container.getAttribute('sku'); // custom attribute
        let domain = this.container.getAttribute('domain'); // custom attribute
        var top_container = document.createElement('fg-foot-profile');
        top_container.setAttribute('user', email);
        top_container.setAttribute('sku', sku);
        top_container.setAttribute('domain', domain);
        this.container.appendChild(top_container);
    }
    get_ui_footProfileCondensed(container, responseObj) {  
        //#region Container
        var top_container = document.createElement('div');
        top_container.setAttribute('id', 'aetrex_profile_top_container');
        top_container.classList.add('container', 'px-0','text-center');
        container.appendChild(top_container);
        
        var container1 = document.createElement('div');
        container1.classList.add('row', 'px-0');        
        container1.setAttribute('id', 'aetrex_no_profile_container');
        top_container.appendChild(container1);

        //#region left
        var containerLeft = document.createElement('div');
        containerLeft.classList.add('col-12','col-sm-6','col-md-12','col-lg-12','col-xl-5',);
        containerLeft.setAttribute('id', 'aetrex_profile_container_left');

        var imgScanner = document.createElement('img');
        imgScanner.setAttribute('id', 'aetrex_profile_container_left_img');
        imgScanner.setAttribute('src', 'https://fitgenius-widgets.aetrextechnology.com/assets/images/demo-right-foot.png');
        containerLeft.appendChild(imgScanner);
        container1.appendChild(containerLeft);
        //#endregion

        //#region right
        var containerRight = document.createElement('div');
        containerRight.classList.add('col-12','col-sm-6','col-md-12','col-lg-12','col-xl-7', 'undoCapGemAttribute');
        containerRight.setAttribute('id', 'aetrex_profile_container_right');            

        var lblFigGeniusTextSmall = document.createElement('div');
        lblFigGeniusTextSmall.setAttribute('id', 'aetrex_foot_profile_container_right_header_top');
        lblFigGeniusTextSmall.innerText = 'Your 3D Foot Profile';
        containerRight.appendChild(lblFigGeniusTextSmall);
        container1.appendChild(containerRight);
        //#endregion
        
        var lblTableHeader = document.createElement('div');
        lblTableHeader.setAttribute('id', 'aetrex_foot_profile_container_right_header_sub');
        
        var lblTableHeaderText1 = document.createElement('span');
        lblTableHeaderText1.setAttribute('id', 'aetrex_foot_profile_container_right_header_sub_text1');
        lblTableHeaderText1.innerText = 'CM';

        var lblTableHeaderText2 = document.createElement('span');
        lblTableHeaderText2.setAttribute('id', 'aetrex_foot_profile_container_right_header_sub_text2');
        lblTableHeaderText2.innerText = 'Percentile';

        lblTableHeader.appendChild(lblTableHeaderText1);
        lblTableHeader.appendChild(lblTableHeaderText2);

        containerRight.appendChild(lblTableHeader);
        
        //#region body 
        var rightBody = document.createElement('div');
        rightBody.setAttribute('id', 'aetrex_foot_profile_container_right_body');
        containerRight.appendChild(rightBody);

        var tableFooter = document.createElement('div');
        tableFooter.setAttribute('id', 'aetrex_foot_profile_container_right_footer');

        var lFootLink = document.createElement('a');
        lFootLink.setAttribute('id', 'aetrex_foot_profile_container_right_footer_text1');
        
        lFootLink.onclick = () => {
            this.get_ui_footProfileBody(rightBody, responseObj, true);
        }
        lFootLink.innerText = 'Left Foot';
        tableFooter.appendChild(lFootLink);

        var rFootLink = document.createElement('a');
        rFootLink.setAttribute('id', 'aetrex_foot_profile_container_right_footer_text2');
        rFootLink.onclick = () => {
            this.get_ui_footProfileBody(rightBody, responseObj, false);
        }
        rFootLink.innerText = 'Right Foot';
        tableFooter.appendChild(rFootLink);

        containerRight.appendChild(tableFooter);
        container1.appendChild(containerRight);

        var lblRecommendedSize = document.createElement('div');
        lblRecommendedSize.setAttribute('id', 'aetrex_foot_profile_container_recommendedSize');
        // lblRecommendedSize.classList.add('undoCapGemAttribute');
        lblRecommendedSize.innerHTML = '<p><b>FitGenius</b> Recommended Size for this style <span class="redText">US ' + responseObj.footdata.medianshoesize + '</span></p>';
        container.appendChild(lblRecommendedSize);

        var img = document.createElement('span');
        img.setAttribute('id', 'aetrex_fitgenius_score_info_icon');
        img.setAttribute('type', 'button');
        img.setAttribute('data-bs-toggle', 'modal');
        img.setAttribute('data-bs-target', '#aetrex_fitgenius_recommended_size_container_expanded');
        // img.onclick = () => {
        //     var dialog = document.getElementById('aetrex_fitgenius_recommended_size_container_expanded');
        //     if(dialog) {
        //         container1.removeChild(dialog)
        //     } else {
        this.get_ui_fitgeniusRecommendedSizeContainerExpandedFactory(container,responseObj);
        //     }
        // }
        lblRecommendedSize.appendChild(img);
        //#endregion

        //default body to left foot 
        this.get_ui_footProfileBody(rightBody, responseObj, true);
        
        container1.appendChild(containerRight);
                                    
        return container;
    }
    get_ui_footProfileBody(container, responseObj, isLeft) {
        if(!container || !responseObj) {
            return;
        }

        var responseObjFoot = (isLeft) ? responseObj.footdata.leftfoot : responseObj.footdata.rightfoot;

        // underline clicked button
        var lfoot = document.getElementById('aetrex_foot_profile_container_right_footer_text1');
        var rfoot = document.getElementById('aetrex_foot_profile_container_right_footer_text2');
        
        if(isLeft) {
            rfoot.classList.remove('linkActive');
            lfoot.classList.add('linkActive');            
        } else {
            lfoot.classList.remove('linkActive');
            rfoot.classList.add('linkActive');
        }

        //clear all children first
        while (container.firstChild) {
            container.firstChild.remove();
        }

        //length
        var lblLength = document.createElement('div');
        lblLength.setAttribute('id', 'aetrex_foot_profile_container_right_body_length');
        lblLength.innerText = 'Length';
        container.appendChild(lblLength);

        var lblLengthCm = document.createElement('div');
        lblLengthCm.setAttribute('id', 'aetrex_foot_profile_container_right_body_length_text1');
        lblLengthCm.innerText = Number(responseObjFoot.length).toFixed(2);
        container.appendChild(lblLengthCm);

        var lblLengthPercent = document.createElement('div');
        lblLengthPercent.setAttribute('id', 'aetrex_foot_profile_container_right_body_length_text2');
        lblLengthPercent.innerText = responseObjFoot.lengthPercentile;
        container.appendChild(lblLengthPercent);

        //width
        var lblWidth = document.createElement('div');
        lblWidth.setAttribute('id', 'aetrex_foot_profile_container_right_body_width');
        lblWidth.innerText = 'Width';
        container.appendChild(lblWidth);

        var lblWidthCm = document.createElement('div');
        lblWidthCm.setAttribute('id', 'aetrex_foot_profile_container_right_body_width_text1');
        lblWidthCm.innerText = Number(responseObjFoot.width).toFixed(2);
        container.appendChild(lblWidthCm);

        var lblWidthPercent = document.createElement('div');
        lblWidthPercent.setAttribute('id', 'aetrex_foot_profile_container_right_body_width_text2');
        lblWidthPercent.innerText =  responseObjFoot.widthPercentile;
        container.appendChild(lblWidthPercent);

        //Instep
        var lblInstep = document.createElement('div');
        lblInstep.setAttribute('id', 'aetrex_foot_profile_container_right_body_Instep');
        lblInstep.innerText = 'Instep';
        container.appendChild(lblInstep);

        var lblInstepCm = document.createElement('div');
        lblInstepCm.setAttribute('id', 'aetrex_foot_profile_container_right_body_Instep_text1');
        lblInstepCm.innerText = Number(responseObjFoot.instep).toFixed(2);
        container.appendChild(lblInstepCm);

        var lblInstepPercent = document.createElement('div');
        lblInstepPercent.setAttribute('id', 'aetrex_foot_profile_container_right_body_Instep_text2');
        lblInstepPercent.innerText = responseObjFoot.instepPercentile;
        container.appendChild(lblInstepPercent);


        //Girth
        var lblGirth = document.createElement('div');
        lblGirth.setAttribute('id', 'aetrex_foot_profile_container_right_body_Girth');
        lblGirth.innerText = 'Girth';
        container.appendChild(lblGirth);

        var lblGirthCm = document.createElement('div');
        lblGirthCm.setAttribute('id', 'aetrex_foot_profile_container_right_body_Girth_text1');
        lblGirthCm.innerText = Number(responseObjFoot.girth).toFixed(2);
        container.appendChild(lblGirthCm);

        var lblGirthPercent = document.createElement('div');
        lblGirthPercent.setAttribute('id', 'aetrex_foot_profile_container_right_body_Girth_text2');
        lblGirthPercent.innerText = responseObjFoot.girthPercentile;
        container.appendChild(lblGirthPercent);
    }
    get_ui_fitgeniusRecommendedSizeContainerExpandedFactory(container,responseObj) { 
        /*ORIGINAL */
        // var container = document.createElement('div');
        // container.classList.add('modal');
        // container.setAttribute('id', 'aetrex_profile_top_container_expanded');  
        // container.setAttribute('aria-labelledby', 'exampleModalLabel');  
        // container.setAttribute('aria-hidden', 'true');
        
        // var innerContainer = document.createElement('div');
        // innerContainer.classList.add('modal-dialog', 'modal-lg'); 
        // container.appendChild(innerContainer);

        // var body = document.createElement('div');
        // body.classList.add('modal-content');
        // innerContainer.appendChild(body);

        // var dialogHeader = document.createElement('div');
        // dialogHeader.setAttribute('id', 'aetrex_profile_expanded_header_container');

        // var dialogHeaderLabel = document.createElement('div');
        // dialogHeaderLabel.innerText = "FIT PROFILE";
        // dialogHeaderLabel.setAttribute('id', 'aetrex_profile_expanded_header_container_label');                    
        // dialogHeader.appendChild(dialogHeaderLabel);    

        // var cmdClose = document.createElement('button');
        // cmdClose.setAttribute('id', 'aetrex_profile_expanded_header_close_cmd');
        // cmdClose.setAttribute('data-bs-dismiss', 'modal');
        // cmdClose.innerText = 'x';
        
        // dialogHeader.appendChild(cmdClose);        
        // body.appendChild(dialogHeader);

        // var welcomeBackLabel = document.createElement('div');
        // var name = (responseObj && responseObj.profileName) ? ', ' + responseObj.profileName : '';
        // welcomeBackLabel.innerText = "Welcome back" + name + "!";
        // welcomeBackLabel.setAttribute('id', 'aetrex_profile_expanded_welcome_back_label');                    
        // body.appendChild(welcomeBackLabel);    

        // var mostRecentScanContainer = document.createElement('div');
        // mostRecentScanContainer.setAttribute('id', 'aetrex_profile_expanded_recent_scan_container');    

        // var mostRecentScan = document.createElement('div');
        // mostRecentScan.innerText = "Your most recent scan was at";
        // mostRecentScan.setAttribute('id', 'aetrex_profile_expanded_recent_scan_label');                    
        // mostRecentScanContainer.appendChild(mostRecentScan);    

        // var mostRecentScanValue = document.createElement('div');
        // mostRecentScanValue.innerText = responseObj.scandata.StoreName;
        // mostRecentScanValue.setAttribute('id', 'aetrex_profile_expanded_recent_scan_value_label');                    
        // mostRecentScanContainer.appendChild(mostRecentScanValue);    

        // body.appendChild(mostRecentScanContainer);   


        // var mostRecentScanDateContainer = document.createElement('div');
        // mostRecentScanDateContainer.setAttribute('id', 'aetrex_profile_expanded_recent_scan_date_container');  
        
        // var pinImg = document.createElement('img');
        // pinImg.setAttribute('id', 'aetrex_profile_expanded_recent_scan_date_pin_img')
        // pinImg.setAttribute('src', 'https://fitgenius-widgets.aetrextechnology.com/assets/images/pin.png');
        // mostRecentScanDateContainer.appendChild(pinImg);

        // var calendarImg = document.createElement('img');
        // calendarImg.setAttribute('id', 'aetrex_profile_expanded_recent_scan_date_calendar_img')
        // calendarImg.setAttribute('src', 'https://fitgenius-widgets.aetrextechnology.com/assets/images/calendar.png');
        // mostRecentScanDateContainer.appendChild(calendarImg);

        // var mostRecentScanDate = document.createElement('div');
        // var date = new Date(responseObj.scandata.ScanDate);
        // var day = date.getDate();        
        // var month = date.toLocaleString('default', { month: 'long' });
        // var year = date.getFullYear();
        // var time = date.toLocaleTimeString();
        // mostRecentScanDate.innerText = "on " + this.ordi(day) + ' ' + month + ' ' + year + ', ' + time;
        // mostRecentScanDate.setAttribute('id', 'aetrex_profile_expanded_recent_scan_date_label');                    
        // mostRecentScanDateContainer.appendChild(mostRecentScanDate);    

        // body.appendChild(mostRecentScanDateContainer);

        
        //#endregion
        
        
        //#endregion
    
        // document.body.insertBefore(container, document.body.firstChild);

        // // inject bootstrap (for dialog behavior)
        // var bootstrap = document.createElement('script');
        // bootstrap.setAttribute('src','https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js');
        // bootstrap.setAttribute('integrity','sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p');
        // bootstrap.setAttribute('crossorigin','anonymous');
        // document.head.appendChild(bootstrap);

        /*END OF ORIGINAL */

        var container1 = document.createElement('div');
        container1.classList.add('modal');
        container1.setAttribute('id', 'aetrex_fitgenius_recommended_size_container_expanded');  
        container1.setAttribute('aria-labelledby', 'exampleModalLabel');  
        container1.setAttribute('aria-hidden', 'true');

        
        var dialogContainer = document.createElement('div');
        // dialogContainer.setAttribute('id', 'aetrex_fitgenius_recommended_size_container_expanded');
        dialogContainer.classList.add('modal-dialog');
        // dialogContainer.classList.add('undoCapGemAttribute');
        
        var dialogHeader = document.createElement('div');
        dialogHeader.setAttribute('id', 'aetrex_fitgenius_recommended_size_container_expanded_header');

        var pill = document.createElement('div');
        pill.innerHTML = '<b>FitGenius</b> Size Recommendation';
        pill.setAttribute('id', 'aetrex_fitgenius_recommended_size_container_expanded_header_button');
        dialogHeader.appendChild(pill);   

        var cmdClose = document.createElement('button');
        cmdClose.setAttribute('id', 'aetrex_profile_expanded_header_close_cmd');
        cmdClose.setAttribute('data-bs-dismiss', 'modal');
        cmdClose.innerText = 'x';
        dialogHeader.appendChild(cmdClose);   
        
        // var cmdClose = document.createElement('button');
        // cmdClose.setAttribute('id', 'aetrex_fitgenius_score_container_expanded_close');
        // // cmdClose.onclick = () => {
        // //     container.removeChild(document.getElementById('aetrex_fitgenius_recommended_size_container_expanded'));
        // // }
        
        var dialogBody = document.createElement('div');
        dialogBody.classList.add('modal-content');        

        dialogBody.setAttribute('id', 'aetrex_fitgenius_score_container_expanded_body');
        dialogBody.innerHTML = '<br/>As you may know, some shoes run small, some shoes run big, while others seem to fit truer to your most common shoe size.  That’s why most of us have different sized footwear in our closet.<br/><br/>';
        dialogBody.innerHTML += 'FitGenius uses Artificial Intelligence to help determine how a particular shoe runs, to help you get the right fit the first time. A “FitGenius Size Recommendation” is the size recommendation of that particular footwear style for you.  You will most likely have several different sizes recommended to you between the different shoes on this website.';
        dialogBody.appendChild(dialogBody.firstChild);  
             
          

        var top_container = document.createElement('div');
        top_container.setAttribute('id', 'aetrex_profile_top_container');
        top_container.classList.add('container', 'px-0','text-center','d-block' ,'d-sm-none','d-none','d-sm-block','d-md-none');
        container.appendChild(top_container);

        var content = document.createElement('div');
        content.classList.add('row', 'px-0');        
        content.setAttribute('id', 'aetrex_no_profile_container');
        top_container.appendChild(content);

        //#region left
        var containerLeft = document.createElement('div');
        containerLeft.classList.add('col-12','col-sm-6','col-md-12','col-lg-12','col-xl-5',);
        containerLeft.setAttribute('id', 'aetrex_profile_container_left');

        var imgScanner = document.createElement('img');
        imgScanner.setAttribute('id', 'aetrex_profile_container_left_img');
        imgScanner.setAttribute('src', 'https://fitgenius-widgets.aetrextechnology.com/assets/images/demo-right-foot.png');
        containerLeft.appendChild(imgScanner);
        content.appendChild(containerLeft);
        //#endregion

        //#region right
        var containerRight = document.createElement('div');
        containerRight.classList.add('col-12','col-sm-6','col-md-12','col-lg-12','col-xl-7', 'undoCapGemAttribute');
        containerRight.setAttribute('id', 'aetrex_profile_container_right');            

        var lblFigGeniusTextSmall = document.createElement('div');
        lblFigGeniusTextSmall.setAttribute('id', 'aetrex_foot_profile_container_right_header_top');
        lblFigGeniusTextSmall.innerText = 'Your 3D Foot Profile';
        containerRight.appendChild(lblFigGeniusTextSmall);
        content.appendChild(containerRight);
        //#endregion
        
        var lblTableHeader = document.createElement('div');
        lblTableHeader.setAttribute('id', 'aetrex_foot_profile_container_right_header_sub');
        
        var lblTableHeaderText1 = document.createElement('span');
        lblTableHeaderText1.setAttribute('id', 'aetrex_foot_profile_container_right_header_sub_text1');
        lblTableHeaderText1.innerText = 'CM';

        var lblTableHeaderText2 = document.createElement('span');
        lblTableHeaderText2.setAttribute('id', 'aetrex_foot_profile_container_right_header_sub_text2');
        lblTableHeaderText2.innerText = 'Percentile';

        lblTableHeader.appendChild(lblTableHeaderText1);
        lblTableHeader.appendChild(lblTableHeaderText2);

        containerRight.appendChild(lblTableHeader);
        
        //#region body 
        var rightBody = document.createElement('div');
        rightBody.setAttribute('id', 'aetrex_foot_profile_container_right_body');
        containerRight.appendChild(rightBody);

        var tableFooter = document.createElement('div');
        tableFooter.setAttribute('id', 'aetrex_foot_profile_container_right_footer');

        var lFootLink = document.createElement('a');
        lFootLink.setAttribute('id', 'aetrex_foot_profile_container_right_footer_text1');
        
        lFootLink.onclick = () => {
            this.get_ui_footProfileBody(rightBody, responseObj, true);
        }
        lFootLink.innerText = 'Left Foot';
        tableFooter.appendChild(lFootLink);

        var rFootLink = document.createElement('a');
        rFootLink.setAttribute('id', 'aetrex_foot_profile_container_right_footer_text2');
        rFootLink.onclick = () => {
            this.get_ui_footProfileBody(rightBody, responseObj, false);
        }
        rFootLink.innerText = 'Right Foot';
        tableFooter.appendChild(rFootLink);

        containerRight.appendChild(tableFooter);
        content.appendChild(containerRight);

        dialogBody.appendChild(content);
        dialogContainer.appendChild(dialogHeader); 
        dialogContainer.appendChild(dialogBody);           
        container1.appendChild(dialogContainer);      
        
        container.appendChild(container1);

        document.body.insertBefore(container1, document.body.firstChild);

        // inject bootstrap (for dialog behavior)
        var bootstrap = document.createElement('script');
        bootstrap.setAttribute('src','https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js');
        bootstrap.setAttribute('integrity','sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p');
        bootstrap.setAttribute('crossorigin','anonymous');
        document.head.appendChild(bootstrap);

    }
}
class AetrexFitGeniusScoreWidget extends WidgetFactory {
    constructor(controlIdent, container) {
        super(controlIdent, container);
    }
    draw () {
        let user        = this.container.getAttribute('user');
        // let profileid   = p.getAttribute('profileid');
        let sku         = this.container.getAttribute('sku');
        let domain      = this.container.getAttribute('domain');     
        let showInfo    = (this.container.getAttribute('showInfoIcon') == 'true')  ? true : false;
        //this.get_ui_gitGeniusScoreFactory(this.container, user, domain, sku, showInfo);
        var top_container = document.createElement('fg-score');
        top_container.setAttribute('user', user);
        top_container.setAttribute('sku', sku);
        top_container.setAttribute('domain', domain);
        top_container.setAttribute('showInfo', showInfo);
        this.container.appendChild(top_container);  
    }
        get_ui_gitGeniusScoreFactory(container, user, domain, sku, showInfo) {
            if(container) {
                let request = new XMLHttpRequest();
                request.open('POST', this.urlFGscore2);
                request.setRequestHeader('Content-type', 'application/json');
                // request.send(JSON.stringify({"profileId": profileId, "domain": domain, "skus": [sku]}));
                request.send(JSON.stringify({"profile_email": user, "domain": domain, "skus": [sku]}));
                request.onload = () => {
                    if(request.status == 200) {
                        var responseObj = JSON.parse(request.response);
                        console.log('fitGenius score response', responseObj);
    
                        if(responseObj.results) {
                            var obj = responseObj.results[0];
                            if(obj) {
                                var scoreThreshold = 60;
    
                                if (obj.FitGenius_Score == null && obj.FitGenius_Rec == null) {
                                    return;
                                }
    
                                var score = Number(obj.FitGenius_Score);
                                var ctrl = document.createElement('span');
                                ctrl.innerHTML = (score >= scoreThreshold) ? "<b>FitGenius</b> Score " + score + "<span class='star'></span>" : "FitGenius Recommended";
                                ctrl.setAttribute('id', 'aetrex_fitgenius_score_label');
                                container.appendChild(ctrl);   
    
                                if (showInfo) {
                                    var img = document.createElement('span');
                                    img.setAttribute('id', 'aetrex_fitgenius_score_info_icon');
                                    img.onclick = () => {
                                        var dialog = document.getElementById('aetrex_fitgenius_score_container_expanded');
                                        if(dialog) {
                                            container.removeChild(dialog)
                                        } else {
                                            (score >= scoreThreshold) ? this.get_ui_fitgeniusScoreContainerExpandedFactory(container) : this.get_ui_fitgeniusRecommendedContainerExpandedFactory(container);
                                        }
                                    }
                                    container.appendChild(img);
                                }
                            }
                        }
                    }
                    else {
                        console.log('response returned status ' + request.status, request.responseText);
                    }
                }
            }
        }
        get_ui_fitgeniusScoreContainerExpandedFactory(container) { 
            var dialogContainer = document.createElement('div');
            dialogContainer.setAttribute('id', 'aetrex_fitgenius_score_container_expanded');
            
            var dialogHeader = document.createElement('div');
            dialogHeader.setAttribute('id', 'aetrex_fitgenius_score_container_expanded_header');
    
            var pill = document.createElement('div');
            pill.innerHTML = '<b>FitGenius</b> Score';
            pill.setAttribute('id', 'aetrex_fitgenius_score_container_expanded_header_button');
            dialogHeader.appendChild(pill);   
    
            var cmdClose = document.createElement('button');
            cmdClose.setAttribute('id', 'aetrex_fitgenius_score_container_expanded_close');
            cmdClose.onclick = () => {
                container.removeChild(document.getElementById('aetrex_fitgenius_score_container_expanded'));
            }
            
            var dialogBody = document.createElement('div');
            dialogBody.setAttribute('id', 'aetrex_fitgenius_score_container_expanded_body');
            dialogBody.innerHTML = 'Your feet are 3-dimensional.  So are your shoes. Since most people only know the length and width of their feet, return rates for shopping for footwear online can be very high. FitGenius AI Software was developed to improve this shopping experience. <br/><br/>';
            dialogBody.innerHTML += 'A “FitGenius Score” is when the software assigns a number between 1-100 based on the likelihood of a shoe fitting the 3-Dimensional characteristics of your actual feet. The higher the number the more likely the shoe will feet your feet. Scores will vary between different shoppers, so a style with a high score for you may have a low score for others. ';
    
            dialogHeader.appendChild(cmdClose);        
            dialogContainer.appendChild(dialogHeader);    
            dialogContainer.appendChild(dialogBody);           
            container.appendChild(dialogContainer);      
        }
        get_ui_fitgeniusRecommendedContainerExpandedFactory(container) { 
            var dialogContainer = document.createElement('div');
            dialogContainer.setAttribute('id', 'aetrex_fitgenius_score_container_expanded');
            
            var dialogHeader = document.createElement('div');
            dialogHeader.setAttribute('id', 'aetrex_fitgenius_score_container_expanded_header');
    
            var pill = document.createElement('div');
            pill.innerHTML = '<b>FitGenius</b> Recommended';
            pill.setAttribute('id', 'aetrex_fitgenius_score_container_expanded_header_button');
            dialogHeader.appendChild(pill);   
    
            var cmdClose = document.createElement('button');
            cmdClose.setAttribute('id', 'aetrex_fitgenius_score_container_expanded_close');
            cmdClose.onclick = () => {
                container.removeChild(document.getElementById('aetrex_fitgenius_score_container_expanded'));
            }
            
            var dialogBody = document.createElement('div');
            dialogBody.setAttribute('id', 'aetrex_fitgenius_score_container_expanded_body');
            dialogBody.innerHTML = 'Your feet are 3-dimensional.  So are your shoes. Since most people only know the length and width of their feet, return rates for shopping for footwear online can be very high. FitGenius AI Software was developed to improve this shopping experience. <br/><br/>';
            dialogBody.innerHTML += '“FitGenius Recommended” is a designation assigned to shoes that have the best fit characteristics for you based on the 3-Dimensional measurements of your feet. Footwear styles recommended for you, may or may not be recommended for others with different 3D foot profiles.';
    
            dialogHeader.appendChild(cmdClose);        
            dialogContainer.appendChild(dialogHeader);    
            dialogContainer.appendChild(dialogBody);           
            container.appendChild(dialogContainer);        
    }
}
class AetrexFitGenius3DFeetWidget extends WidgetFactory {
    constructor(controlIdent, container) {
        super(controlIdent, container);
    }
    draw () {
        //let email = new URLSearchParams(location.search).get('email'); // querystring
        let email = this.container.getAttribute('user'); // custom attribute
        var top_container = document.createElement('three-feet');
        top_container.setAttribute('user', email);
        this.container.appendChild(top_container);
    }    
}
class AetrexFitGeniusFitVisionWidget extends WidgetFactory {
    constructor(controlIdent, container) {
        super(controlIdent, container);
    }
    draw () {
        var aetrex_fitvision_top = document.createElement('div');
        aetrex_fitvision_top.setAttribute('id', 'aetrex_fitvision_top');                        

        var aetrex_fitvision_bottom = document.createElement('div');
        aetrex_fitvision_bottom.setAttribute('id', 'aetrex_fitvision_bottom');
        aetrex_fitvision_top.appendChild(aetrex_fitvision_bottom);

        this.container.appendChild(aetrex_fitvision_top);

        //allow drag/drop 
        this.dragElement(aetrex_fitvision_top);
    }    
}

var fg = (() => {

    init3dFeet = () => {
        let selectorFitGenius3dFeet = 'aetrex_three_d_feet_container';
        document.querySelectorAll('[id=' + selectorFitGenius3dFeet + ']').forEach(x => {WidgetFactory.getInstance(selectorFitGenius3dFeet, x)?.draw() });
    }
    initFitGeniusProfile = () => {
        let selectorFitGeniusProfile = 'aetrex_profile_container';
        document.querySelectorAll('[id=' + selectorFitGeniusProfile + ']').forEach(x => { WidgetFactory.getInstance(selectorFitGeniusProfile, x)?.draw() });
    }
    initFootProfile = () => {
        let selectorFitGeniusFootProfile = 'aetrex_foot_profile_container';
        document.querySelectorAll('[id=' + selectorFitGeniusFootProfile + ']').forEach(x => { WidgetFactory.getInstance(selectorFitGeniusFootProfile, x)?.draw() });    
    }
    initFitGeniusScore = () => {
        let selectorFitGeniusScore = 'aetrex_fitgenius_score_container';
        document.querySelectorAll('[name=' + selectorFitGeniusScore + ']').forEach(x => { WidgetFactory.getInstance(selectorFitGeniusScore, x)?.draw() });
    }
    initFitVision = () => {
        let selectorFitGeniusFitVision = 'aetrex_fitvision_container';
        document.querySelectorAll('[id=' + selectorFitGeniusFitVision + ']').forEach(x => {WidgetFactory.getInstance(selectorFitGeniusFitVision, x)?.draw() });
    }

    this.init3dFeet();
    this.initFitGeniusProfile();
    this.initFootProfile();
    this.initFitGeniusScore();
    this.initFitVision();

    return {
        init3dFeet:             init3dFeet, 
        initFitGeniusProfile:   initFitGeniusProfile,
        initFootProfile:        initFootProfile,
        initFitGeniusScore:     initFitGeniusScore,
        initFitVision:          initFitVision
    };
})();
