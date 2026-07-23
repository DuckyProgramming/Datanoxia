slides=[
    {
        text:[
            {text:`DATANOXIA`,size:80},
            {text:`Hayden Qi`,size:40},
        ],
    },{
        text:[
            {text:`Definition`,size:80},
            {text:`(Noun)`,size:40},
            {text:`1. The diminishing quality of public information caused by the increase in its volume`,size:30},
            {text:`2. The difficulties caused by such a loss of information`,size:30},
        ],
    },{
        text:[
            {text:`Works Cited`,size:80},
            {text:`He, T. (2017). Isotopic constraints on the palaeoenvironmental conditions during the cambrian radiation of animals (Order No. 11001456). Available from ProQuest Dissertations & Theses A&I; ProQuest One Academic. (2116938004). Retrieved from https://www.proquest.com/dissertations-theses/isotopic-constraints-on-palaeoenvironmental/docview/2116938004/se-2`,size:30},
            {text:`Pilgrim, C., Guo, W., & Hills, T. T. (2021). Information foraging in the attention economy. St. Louis: Retrieved from https://www.proquest.com/working-papers/information-foraging-attention-economy/docview/2585952743/se-2`,size:30},
        ],
    },{
        text:[
            {text:`END`,size:80},
        ],
    },
]
let loose=`1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,.`
queue=[]
letters=[]
time=0
tick=600
slide=-1
grav=1
spin=0
class letter{
    constructor(text,size,slide,goalX,goalY){
        this.text=text
        this.size=size
        this.slide=slide
        this.x=random(40,width-40-this.size)
        this.y=-100
        this.velX=0
        this.velY=0
        this.goalX=goalX
        this.goalY=goalY
        this.stuck=0
        this.deviation=random(-15,15)
        this.spin=0
        this.spent=false
        this.remove=false
    }
    display(){
        fill(255)
        textSize(this.size)
        push()
        translate(this.x+this.size,this.y+this.size*1.25)
        rotate(this.spin)
        text(this.text,-this.size,-this.size)
        pop()
    }
    update(){
        if(this.slide==slide){
            if(dist(this.x,this.y,this.goalX,this.goalY)<sqrt(this.velX**2+this.velY**2)){
                this.x=this.goalX
                this.y=this.goalY
                this.velX=0
                this.velY=grav
                this.stuck=random(0,60)
            }else{
                let dir=atan2(this.goalX-this.x,this.goalY-this.y)+this.deviation
                this.velX+=sin(dir)*2
                this.velY+=cos(dir)*2
                this.velX*=0.95
                this.velY*=0.95
                this.deviation*=0.98
                this.x+=this.velX
                this.y+=this.velY
                this.spin=0
            }
        }else if(this.stuck>0){
            this.stuck--
            this.spent=true
        }else if(this.spent){
            this.velY+=grav
            this.y+=this.velY
            if(this.y>height+100){
                this.remove=true
            }
        }else{
            if(this.y>=height-50){
                this.y=height-50
                this.velX=time%120<80?4:0
                this.velY=0
                this.spin=spin
                this.x+=this.velX
                if(this.x>width+50){
                    this.x=-100
                }
            }else{
                this.velY+=grav
                this.y+=this.velY
                this.y=min(this.y,height-50)
            }
        }
    }
}
function setup(){
    noStroke()
    createCanvas(windowWidth-50,windowHeight-50)
    textAlign(LEFT,BOTTOM)
    angleMode(DEGREES)
    slides.forEach((slide,index)=>{
        let y=100
        let clump=[]
        slide.text.forEach(text=>{
            let sum=0
            let x=200
            textSize(text.size)
            y+=text.size
            for(let a=0,la=text.text.length;a<la;a++){
                if(text.text[a]!=` `){
                    clump.push(new letter(text.text[a],text.size,index,x,y))
                }
                x+=textWidth(text.text[a])
            }
            y+=text.size*0.2+40
        })
        queue.push(...clump
            .map(value=>({value,sort:random(0,1)}))
            .sort((a,b)=>a.sort-b.sort)
            .map(({value})=>value)
        )
    })
}
function keyPressed(){
    switch(key){
        case ` `:
            if(slide<slides.length-1&&(queue.length<=0||queue[0].slide>slide+1)){
                slide++
            }
        break
    }
}
function draw(){
    background(0)
    letters.forEach(letter=>letter.display())
    letters.forEach(letter=>letter.update())
    for(let a=0,la=letters.length;a<la;a++){
        if(this.letters[a].remove){
            this.letters.splice(a,1)
            a--
            la--
        }
    }
    spin=time%120>=80&&time%120<90?sin((time%120-80)*18)*5:0
    time++
    if(time%5==0&&slide<slides.length-1&&queue.length>0){
        if(queue[0].slide<=slide+1){
            letters.push(queue[0])
            queue.splice(0,1)
        }
    }
    if(tick>0){
        tick--
    }else{
        letters.push(new letter(loose[floor(random(0,loose.length))],floor(random(2,9))*10,-2,0,0))
        tick=600-slide*60
    }
}