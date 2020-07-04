/*
 * A central point to which all lines from the edges of the canvas are drawn to.
 * -----------------------------------------------------------------------------
 * @author:    Caleb Nii Tetteh Tsuru Addy
 * @date:      27th June, 2020 
 * @email:     calebniitettehaddy@gmail.com 
 * @twitter:   @cnttaddy
 * @github :   https://github.com/niitettehtsuru/InfinityHallway
 * @codepen:   https://codepen.io/niitettehtsuru/pen/Yzwewzq
 * @license:   GNU General Public License v3.0 
 * */
class Point
{
    constructor(screenWidth,screenHeight,interval,position)
    {         
        this.screenWidth = screenWidth;
        this.halfWidth = this.screenWidth/2;
        this.screenHeight = screenHeight;  
        this.interval = interval;//amount of space between adjacent points on the edge of the canvas
        this.toggleInterval = true;//switches between increasing and decreasing the interval 
        this.position = position;//whether the point is left or right oriented 
        this.xCoord = this.halfWidth;
        this.yCoord = this.screenHeight/2;  
        this.unitDistance = 5;//distance moved per animation frame 
        this.speed   = this.setInitialSpeed();   
        this.strokeWeight = 0.5;    
        this.borderPoints = this.getBorderPoints();//the points on the edges of the canvas
    }  
    resize(screenWidth,screenHeight)
    {
        if(this.screenHeight !== screenHeight || this.screenWidth !== screenWidth)//if the screen size has changed
        {    
            let dy              = screenHeight/this.screenHeight;//percentage change in browser window height 
            let dx              = screenWidth/this.screenWidth;//percentage change in browser window width  
            this.screenHeight   = screenHeight;  
            this.screenWidth    = screenWidth; 
            this.halfWidth = this.screenWidth/2;
            this.xCoord *= dx; 
            this.yCoord *= dy;   
            this.speed.y*=dy; 
        }
    }
    getBorderPoints()//get points on the edges of the canvas
    {
        let borderPoints = [];  
        //if this point is to the left of the horizontal center  
        if(this.position === 'left') 
        {
            //get border points on the left wall 
            for(let y = 0; y < this.screenHeight; y+=this.interval) 
            {
                borderPoints.push({x:0,y:y});//points on the left wall 
            } 
            //get border points on the top wall  
            for(let x = 0; x < this.halfWidth; x+=this.interval) 
            {
                borderPoints.push({x:x,y:0});//points on the top wall 
            }
            //get border points on the bottom wall
            for(let x = 0; x < this.halfWidth; x+=this.interval) 
            { 
                borderPoints.push({x:x,y:this.screenHeight});//points on the bottom wall
            }
        }
        else //if this point is to the right of the horizontal center
        {   
            //get border points on the right wall 
            for(let y = 0; y < this.screenHeight; y+=this.interval) 
            { 
                borderPoints.push({x:this.screenWidth,y:y});//points on the right wall
            }
            //get border points on the top wall  
            for(let x = this.halfWidth; x < this.screenWidth; x+=this.interval) 
            {
                borderPoints.push({x:x,y:0});//points on the top wall 
            }
            //get border points on the bottom wall
            for(let x = this.halfWidth; x < this.screenWidth; x+=this.interval) 
            { 
                borderPoints.push({x:x,y:this.screenHeight});//points on the bottom wall
            }
        } 
        return borderPoints; 
    }
    setInitialSpeed()//Set the speed at start. 
    {   
        let x = 0;//no horizontal movement   
        let y = Math.random() > 0.5? -this.unitDistance:this.unitDistance; //move up
        return {x:x,y:y};  
    } 
    pointHitsTopWall()
    {
        if(this.yCoord < 0)
        {
            return true;
        }
        return false; 
    }
    pointHitsBottomWall()
    {
        if(this.yCoord > this.screenHeight)
        {
            return true;
        }
        return false; 
    }   
    checkCollisionWithWall( )
    { 
        if(this.pointHitsTopWall())
        {   
            this.yCoord = 1;//ensure point never goes beyond the top edge 
            this.speed.y = -this.speed.y;   
        }
        else if(this.pointHitsBottomWall())
        {   
            this.yCoord =  this.screenHeight - 1;//ensure point never goes beyond the bottom edge 
            this.speed.y = -this.speed.y;   
        }  
    }    
    update( )
    {     
        this.yCoord += this.speed.y;//keep the point moving in its current direction  
        this.checkCollisionWithWall();  
        //this darkens and then lightens up the screen
        if(this.toggleInterval)
        {
            this.interval-=0.1;//keep reducing the interval...
            if(this.interval < 1)//...until it reaches 1,...
            {
                this.toggleInterval = !this.toggleInterval;//...then stop and switch
            }
        }
        else 
        {
            this.interval+=0.1;//keep increasing the interval...
            if(this.interval > 5)//...until it reaches 5,...
            {
                this.toggleInterval = !this.toggleInterval;//...then stop and switch
            }
        }  
        this.borderPoints = this.getBorderPoints(); 
    }
    draw()
    {   
        stroke(0);//black 
        strokeWeight(this.strokeWeight);
        let xCoord = this.xCoord, 
            yCoord = this.yCoord; 
        this.borderPoints.forEach(function(bp)
        {   
            line(bp.x,bp.y,xCoord,yCoord); 
        });   
    } 
} 
 