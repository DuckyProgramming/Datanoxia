slides=[
    {
        text:[
            {text:`DATANOXIA`,size:80},
            {text:`(ˈdeɪtəˈnɒksiə)`,size:25},
            {text:`Hayden Qi`,size:40},
            {text:`English 1102`,size:15},
            {text:`The Information Age and the Anthropocene`,size:25},
        ],
        img:-1,
        speed:false,
    },{
        text:[
            {text:`A Cyclical Struggle`,size:80},
            {text:`A Cyclical Struggle`,size:40},
            {text:`A Cyclical Struggle`,size:20},
            {text:`A Cyclical Struggle`,size:10},
            {text:`Pictured: [PLACEHOLDER]`,size:15},
            {text:`Is more information always a good thing?`,size:40},
            {text:`• A simple question`,size:25},
            {text:`• Why did research this on the internet take me two months?`,size:25},
            {text:`• The depth problem - even correct information can be harmful`,size:25},
            {text:`• The cognitive paradox of Wikipedia`,size:25},
            {text:`• The Ufficio Storico Esercito - a shaky foundation`,size:25},
        ],
        img:0,
        speed:false,
    },{
        text:[
            {text:`Definition`,size:80},
            {text:`Pictured: [PLACEHOLDER]`,size:15},
            {text:`(Noun)`,size:40},
            {text:`1. The diminishing quality of public information caused by the increase in its volume`,size:25},
            {text:`2. The difficulties caused by such a loss of information`,size:25},
            {text:`Etymology`,size:80},
            {text:`Pormanteau of DATA and ANOXIA`,size:40},
            {text:`• Data: plural of datum, information`,size:25},
            {text:`• Anoxia: The lack of oxygen; suffocation`,size:25},
        ],
        img:0,
        speed:false,
    },{
        text:[
            {text:`A Cambrian Explosion`,size:80},
            {text:`Pictured: [PLACEHOLDER]`,size:15},
            {text:`The other kind of history`,size:40},
            {text:`• Evolutionary radiation and extinction`,size:25},
            {text:`• An episodic pattern: another kind of cyclical struggle`,size:25},
            {text:`• Foraging for attention in a competitive world`,size:25},
            {text:`• Will history repeat itself?`,size:25},
        ],
        img:0,
        speed:false,
    },{
        text:[
            {text:`Resolutions`,size:80},
            {text:`Pictured: [PLACEHOLDER]`,size:15},
            {text:`• The end of the Tobruk tale`,size:25},
            {text:`• Thoughts on the seperatist solution`,size:25},
            {text:`• Personal, partial solutions`,size:25},
        ],
        img:0,
        speed:false,
    },{
        text:[
            {text:`Works Cited`,size:80},
            {text:
`La prima offensiva britannica in Africa settentrionale (ottobre 1940 – febbraio 1941).
Vol. I. Rome: Esercito. Corpo di stato maggiore. Ufficio storico. 1979. OCLC 68638762`
            ,size:20},
            {text:
`He, T. (2017). Isotopic constraints on the palaeoenvironmental conditions during the cambrian radiation of animals (Order No. 11001456).
Available from ProQuest Dissertations & Theses A&I; ProQuest One Academic. (2116938004).
Retrieved from https://www.proquest.com/dissertations-theses/isotopic-constraints-on-palaeoenvironmental/docview/2116938004/se-2`
            ,size:20},
            {text:
`Pilgrim, C., Guo, W., & Hills, T. T. (2021). Information foraging in the attention economy.
St. Louis: Retrieved from https://www.proquest.com/working-papers/information-foraging-attention-economy/docview/2585952743/se-2`
            ,size:20},
        ],
        img:-1,
        speed:true,
    },
]
loose=`1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,.()[]{}:;"'?<>*&^%$#@!~/\\+=-_`
//loose=`1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,.()[]{}:;"'?<>*&^%$#@!~/\\+=-_`
queue=[]
letters=[]
time=0
//tick=600
slide=-1
cLine=0
grav=1
spin=0
tick=0
lift=0
img={
    pos:0,
    slide:0,
}
class letter{
    constructor(text,size,slide,line,goalX,goalY){
        this.text=text
        this.size=size
        this.slide=slide
        this.line=line
        this.x=random(40,width-40-this.size)
        this.y=-100
        this.velX=0
        this.velY=0
        this.goalX=goalX
        this.goalY=goalY
        this.stuck=0
        this.deviation=random(-15,15)
        this.spin=0
        this.lift=0
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
        if(this.slide==slide&&this.line<=cLine){
            if(dist(this.x,this.y,this.goalX,this.goalY)<=sqrt(this.velX**2+this.velY**2)*0.6){
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
                this.deviation*=0.97
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
            let level=height-50-this.lift
            if(this.y>=level){
                if(abs(this.velY)>grav){
                    this.velY*=-0.25
                    this.y+=this.velY
                }else{
                    this.y=level
                    this.velX=time%120<80?4:0
                    this.velY=0
                    this.spin=spin
                    this.x+=this.velX
                    if(this.x>width+50){
                        this.x=-100
                    }
                }
            }else{
                this.velY+=grav
                this.y+=this.velY
                this.y=min(this.y,level)
            }
        }
    }
}
function preload(){
    imgs=[
        loadImage(`../Assets/placeholder.png`)
    ]
}
function setup(){
    noStroke()
    createCanvas(windowWidth-50,windowHeight-50)
    textAlign(LEFT,BOTTOM)
    imageMode(CENTER)
    angleMode(DEGREES)
    slides.forEach((slide,index)=>{
        let y=100
        slide.text.forEach((text,index2)=>{
            let clump=[]
            let sum=0
            let x=200-text.size*0.25
            textSize(text.size)
            y+=text.size
            for(let a=0,la=text.text.length;a<la;a++){
                if(text.text[a]==`\n`){
                    y+=text.size*1.2
                    x=200-text.size*0.25
                }else if(text.text[a]!=` `){
                    clump.push(new letter(text.text[a],text.size,index,index2,x,y))
                }
                x+=textWidth(text.text[a])
            }
            y+=text.size*0.2+20
            queue.push(...clump
                .map(value=>({value,sort:random(0,1)}))
                .sort((a,b)=>a.sort-b.sort)
                .map(({value})=>value)
            )
        })
    })
}
function next(){
    if(slide<slides.length){
        if(slide>=0&&cLine<slides[slide].text.length-1){
            if(
                queue.length<=0||
                queue[0].slide>slide||
                queue[0].line>cLine+1
            ){
                cLine++
            }
        }else if(slide<slides.length-1){
            if(
                queue.length<=0||
                queue[0].slide>slide+1||
                queue[0].line>0&&(slide==-1||cLine==slides[slide].text.length-1)
            ){
                slide++
                cLine=0
            }
        }else if(letters.some(letter=>letter.slide==-2)){
            letters.filter(letter=>letter.slide==-2).forEach(letter=>{
                letter.velY=-random(0,50)
                letter.spent=true
            })
        }else{
            letters.forEach(letter=>letter.stuck=random(0,1800))
            slide++
        }
    }
}
function keyPressed(){
    switch(key){
        case ` `:
            next()
        break
    }
}
function mousePressed(){
    next()
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
    spin=time%120>=80&&time%120<90?sin((time%120-80)*18)*3:0
    time++
    if(time%(slide>=0&&slide<slides.length&&slides[slide].speed?2:3)==0&&slide<slides.length&&queue.length>0){
        if(queue[0].slide<=slide+1&&(slide<0||cLine>=slides[slide].text.length-1||queue[0].slide<=slide)){
            if(tick%5==0){
                letters.push(new letter(loose[floor(random(0,loose.length))],floor(random(2,9))*10,-2,-2,0,0))
                letters[letters.length-1].lift=random(-lift,lift)
                lift+=0.1
            }else{
                letters.push(queue[0])
                letters[letters.length-1].lift=random(-lift,lift)
                queue.splice(0,1)
            }
            tick++
        }
    }
    if(slides[img.slide].img!=-1){
        image(imgs[slides[img.slide].img],width+240*cos(img.pos),height/2,360,360)
    }
    if(img.slide<slide&&slide<slides.length){
        if(img.pos>0){
            img.pos-=2
        }else{
            img.slide++
        }
    }else if(img.pos<180){
        img.pos+=2
    }
    /*if(tick>0){
        tick--
    }else{
        letters.push(new letter(loose[floor(random(0,loose.length))],floor(random(2,9))*10,-2,-2,0,0))
        tick=240-slide*30
    }*/
}