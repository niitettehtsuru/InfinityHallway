/*
 * Sets everything up
 * ------------------
 * @author:    Caleb Nii Tetteh Tsuru Addy
 * @date:      27th June, 2020 
 * @email:     calebniitettehaddy@gmail.com 
 * @twitter:   @cnttaddy
 * @github :   https://github.com/niitettehtsuru/InfinityHallway
 * @codepen:   https://codepen.io/niitettehtsuru/pen/yLeJwrG
 * @license:   GNU General Public License v3.0 
 * */
let 
points = [], 
interval = 5,//amount of space between adjacent points on the edge of the canvas
backgroundColor = 'rgba(255,255,255,0.3)';//white
function createPoints(width,height)
{
    let points = []; 
    let positions = ['left','right'];
    let numOfPoints = 2; 
    for(let i = 0; i < numOfPoints; i++)
    {  
        points.push(new Point(width,height,interval,positions[i])); 
    }
    return points;  
}
//get the width and height of the browser window 
function getBrowserWindowSize() 
{
    let win = window,
    doc = document,
    offset = 20,//
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0],
    browserWindowWidth = win.innerWidth || docElem.clientWidth || body.clientWidth,
    browserWindowHeight = win.innerHeight|| docElem.clientHeight|| body.clientHeight;  
    return {width:browserWindowWidth-offset,height:browserWindowHeight-offset}; 
} 
function onWindowResize()//called every time the window gets resized. 
{  
    let browserWindowSize = getBrowserWindowSize(); 
    resizeCanvas(browserWindowSize.width,browserWindowSize.height); 
    points.forEach(function(point)
    {  
        point.resize(width,height);  
    });   
}
function setup() 
{
    let browserWindowSize = getBrowserWindowSize();  
    createCanvas(browserWindowSize.width,browserWindowSize.height);  
    points = createPoints(width,height);
    window.addEventListener('resize',onWindowResize);
} 
function draw() 
{  
    background(backgroundColor);  
    points.forEach(function(point)
    {  
        point.update(); 
        point.draw(); 
    });    
}