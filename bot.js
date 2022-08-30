const puppeteer = require('puppeteer');

const product_url = "https://www.walmart.com/ip/EVGA-GeForce-RTX-3060-XC-Gaming-12G-Graphic-Card/381307598";

//console.log('Hello Holder');

async function GivePage(){
    const browser = await puppeteer.launch({headless: false}); //can set to true but wont see browser but it is faster
    const page = await browser.newPage();
    //await page.goto(product_url);
    return page;
}

async function AddToCart(page){
    await page.goto(product_url);
    //Product page
    await page.waitForSelector("button[class='button spin-button prod-ProductCTA--primary button--primary']");
    await page.click("button[class='button spin-button prod-ProductCTA--primary button--primary']", elem => elem.click());
   // await page.waitForSelector("div[class='hClAqgjXrrZgxxD']");
   // await page.click("div[class='hClAqgjXrrZgxxD']", elem => elem.delay({delay: 7000}));

    //Cart Page
    await page.waitForNavigation();
    await page.waitForSelector("button[class='button ios-primary-btn-touch-fix hide-content-max-m checkoutBtn button--primary']");
    await page.click("button[class='button ios-primary-btn-touch-fix hide-content-max-m checkoutBtn button--primary']", elem => elem.click());

    //Account Page - Continue without a account
    await page.waitForNavigation();
    await page.waitForSelector("button[data-automation-id='new-guest-continue-button']");
    await page.click("button[data-automation-id='new-guest-continue-button']", elem => elem.click());

    //Delivery and pickup options - Page 1
    await page.waitForNavigation();
    await page.waitFor(1000); //Adding 10 second delay
    await page.waitForSelector("button[data-automation-id='fulfillment-continue']");
    await page.click("button[data-automation-id='fulfillment-continue']", elem => elem.click());

    
}
//Enter delivery address
async function FillBilling(page){
    await page.waitFor(2000);
    await page.type ("input[id='firstName']", 'Joshua');
    await page.waitFor(200);
    await page.type ("input[id='lastName']", 'Phoenix');
    await page.waitFor(200);
    await page.type ("input[id='phone']", '5613555034');
    await page.waitFor(200);
    await page.type ("input[id='email']", 'Phoenix@hotmail.com');
    await page.waitFor(200);
    await page.type ("input[id='addressLineOne']", '149 Woodside Circle');
    await page.waitFor(200);
    await page.type ("input[id='addressLineTwo']", '');
   // await page.type ("input[id='city']", 'Phoenix');
   const input = await page.$("input[id='city']");
   await input.click({clickCount: 3}); //Making it get clicked 3 times to over ride text
   await input.type ('Panama City');
   await page.waitFor(200);
   const input2 = await page.$("input[id='postalCode']");
   await input2.click({clickCount: 3}); 
   await input2.type ('32401');
   await page.waitFor(200);
   await page.type ("select[id='state']", 'FL');
   await page.waitForSelector("button[data-automation-id='address-book-action-buttons-on-continue']");
   await page.click("button[data-automation-id='address-book-action-buttons-on-continue']", elem => elem.click());
   await page.waitForSelector("button[data-automation-id='address-validation-message-close-button']");
   await page.click("button[data-automation-id='address-validation-message-close-button']", elem => elem.click());

}

async function FillPayment(page){
    await page.waitFor(5000);
    await page.type ("input[id='creditCard']", '5419645353017433');
    await page.waitFor(500);
    await page.type ("input[id='cvv']", '670');
    await page.waitFor(500);
    await page.select("select[id='month-chooser']", '12');
    await page.waitFor(500);
    await page.select("select[id='year-chooser']", '2022');
    await page.waitForSelector("button[data-automation-id='save-cc']");
   await page.click("button[data-automation-id='save-cc']", elem => elem.click());

}

async function SubmitOrder(page){
    await page.waitFor(5000);
    await page.waitForSelector("button[class='button auto-submit-place-order no-margin set-full-width-button pull-right-m place-order-btn btn-block-s button--primary']");
    await page.click("button[class='button auto-submit-place-order no-margin set-full-width-button pull-right-m place-order-btn btn-block-s button--primary']", elem => elem.click());

}

async function CheckOut(){
    var page = await GivePage();
    await AddToCart(page);
    await FillBilling(page);
    await FillPayment(page);
    await SubmitOrder(page);
}

CheckOut();