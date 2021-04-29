const puppeteer = require("puppeteer");

async function fn()
{
    try{

        const browser = await puppeteer
        .launch({
            headless : false,
            defaultViewport : null,
            args : ["--start-maximized"],
            //slowMo : 20,
    })
    let pages = await browser.pages();
    let page = pages[0];

    //{waitUntil: 'load', timeout: 0} --> added this due to timeout exceed error
    
    await page.goto("https://www.youtube.com/playlist?list=PLzkuLC6Yvumv_Rd5apfPRWEcjf9b1JRnq", {waitUntil: 'load', timeout: 0});

    await page.waitForSelector("#stats>.style-scope.ytd-playlist-sidebar-primary-info-renderer", {visible : true});

    await page.waitForSelector("#stats>.style-scope.ytd-playlist-sidebar-primary-info-renderer", {visible : true});

    //await page.waitForSelector("h1#title", {visible : true});

    let obj = await page.evaluate(function ()
    {
        let allElements = document.querySelectorAll("#stats>.style-scope.ytd-playlist-sidebar-primary-info-renderer");

        let noOfVideos = allElements[0].innerText;

        let noOfViews = allElements[1].innerText;

        let title = document.querySelector("h1#title").innerText;

        //line 34 n line 40 obj same
        let obj = {
            nfVideos : noOfVideos,
            nfViews : noOfViews,                        
            title
        }

        return obj;
    })
        console.log("Title :", obj.title, "\nVideos :" , obj.nfVideos,"\nViews:", obj.nfViews);
    }
    //line 23 n line 44 obj same
    catch(err)
    {
        console.log(err);
    }

}

fn();


