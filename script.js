var biggestIndex=1;
var selectedIcon = undefined;
var topBar=document.querySelector("#top");setupWindow("welcome");
setupWindow("skeletale");
setupWindow("notes");
var nextbutton = document.querySelector("#nextbutton");
var backbutton = document.querySelector("#backbutton");
var skeletonImage = document.querySelector("#skeletonImage");
var skelIndex=0

var skel = [
  {
    title:"About me",
    content:`
    <h2>About me</h2>
    <p>I've always been into medecine, especially into anatomy.
    Growing up, a lot of medical shows were airing on live TV and whenever I could, I would watch them with my family. 
    I have watched The Good Doctor, Chicago Med, New Amsterdam, Doc, 9-1-1 and Chicago Fire (I loved watching the paramedic being so efficient during urgent situations). 
    In fact, watching these shows made me learn English faster than anything, since most recent episodes weren't dubbed in French. </p>
  `},  
  {
    title: "About this app",   
    heartTop: 100,
    heartLeft: 110,
    content: `
    <h2>About this app</h2>
    <p>I am now studying in Health Sciences, and I love listening to Undertale soundtrack while studying, I will be attending their orchestra this winter! <br>
    Next semester, I will be taking an Anatomy course and I thought that making an app that combines Undertale and anatomy would be fun as preparation! <br>
    <p><b>This app will therefore be a presentation of me through different bones :D</b></p>`
  },
  {
   title:"Skull",
   heartTop: 22,
   heartLeft:96,
   content:`
   <h2>Skull</h2>
   <p>
    My skull protects my brain that is easily overstimulated. 
    My interests are math and anatomy.
   </p>
   ` 
  },
    {
   title:"Eye Cavities",
   heartTop: 37,
   heartLeft: 88,
   content:`
   <h2>Eye cavities</h2>
   <p>
      My eyes have allowed to watch a lot of shows, movies and animes.
      My all time favorite are: When Life Gives You Tangerines, Project Hail Mary, all the medical shows I mentionned earlier and a lot that I forgot oops.
      I really enjoyed Weak Hero Class too!
   </p>
   ` 
  },
    {
   title:"Ear bones",
   heartTop: 37,
   heartLeft: 75,
   content:`
   <h2>Ear bones</h2>
   <p>
   The smallest bones of the human body allow me to enjoy all types of music!
   I like listening to indie pop like BoyWithUke and d4vd until...
   BUT D4vd songs are so good I can't bring myself to stop listening to it...
   My playlist is very random I can't really pinpoint any main genre, though I do enjoy listening to The Neighbourhood.
      
   </p>
   ` 
  },
    {
   title:"Teeth",
   heartTop: 55,
   heartLeft:96,
   content:`
   <h2>Teeth</h2>
   <p>
   My comfort food is poutine from McDonald's.
   My favorite pastry is macarons, but I love anything sweet :P
   I love snacking in general, and I really love eating snacks from France that I used to eat as a kid.
   The lack of Kinder and LU snacks in Canada really saddens me :(
   </p>
   ` 
  },
    {
   title:"Spine",
   heartTop: 96,
   heartLeft: 96,
   content:`
   <h2>Spine</h2>
   <p>
   My backbone got developped through sports. 
   Very young, I started playing judo then switched to karate but then had to stop due to coming to Canada.
   Once in Canada, in primary school, I was in my school's circus troop, it was super fun!
   In highschool, I joined the flag-football and won regionals with my team in grade 10!
   In college, I tried doing a bit of dragon boating, but it was not really for me so I quit..
   I am now a Summer camp bike instructor!
   </p>
   ` 
  },
    {
   title:"Hands",   
   heartTop: 215,
   heartLeft: 30,
   content:`
   <h2>Hands</h2>
   <p>
   These hand of mine love to craft and bake.
   I especially like to crochet, solve puzzles and build LEGO sets!
   As for baking, my specialty are choux à la crème!
   </p>
   ` 
  },
    {
   title:"Feet",   
   heartTop: 367,
   heartLeft: 75,
   content:`
   <h2>Feet</h2>
   <p>
   These feet of mine have touched the ground of France, Viet Nam, Canada and Qatar!
   I am actually Vietnamese, born in France and currently living in Canada.
   I occasionally travel back to Viet Nam and had a layover in Qatar. I celebrated New Year there!
   In high school I was in a Spanish program and in grade 10, I got the chance to travel to Spain with my class. I really enjoyed it!!
   </p>
   ` 
  },
]

var content = [
  {
    title:"About",
    date: "22/06/2026",
    content: `
    <h2>About</h2>
    <p>I really enjoy listening to true crime stories and here you will find my thoughts about some of these stories.</p>
    <p>My favorite podcasts are
    <a href="https://open.spotify.com/show/2DZwvzn6Z3xCFZrwZGDrbj?si=aa0883a2a0d7481f">Rotten Mango</a> and
    <a href="https://www.youtube.com/@LivMoietco">Liv</a> (a French Youtuber)</p>`
  },
  {
    title:"Itaewon",
    date: "23/06/2026",
    content:`
    <h2><a href="https://www.youtube.com/watch?v=F3sIDvFh3Os&pp=ygUUaXRhZXdvbiByb3R0ZW4gbWFuZ28%3D">Itaewon Tragedy</a></h2>
    <p>badabim badaboom (iykyk)</p>
    <p>I think this was the first or second video I ever watched from Rotten Mango. It's not really a crime story, but it had many casualities.</p>
    <p>I remember seeing this event on the news but the way Stephanie Soo (the host) tells the story makes it feel way more real, which is why I love her storytelling.</p>
    `
  },
]
function setNotesContent(index) {
  var notesContent = document.querySelector("#notesContent")
  notesContent.innerHTML=content[index].content
}
setSkelContent(0)
setNotesContent(0)
function setSkelContent(index) {
  var skeletaleContent = document.querySelector("#skeletaleContent")
  skeletaleContent.innerHTML=skel[index].content

  var heart=document.querySelector("#heart");
  heart.style.top=skel[index].heartTop+"px";
  heart.style.left=skel[index].heartLeft+"px";
  updateSkelButtons()
}

function addToSideBar(index) {
  var sidebar=document.querySelector("#notesSidebar");
  var note=content[index];
  var newDiv=document.createElement("div");
  newDiv.innerHTML = `
  <p style="margin:0px;">
    ${note.title}
  </p>
  <p style="font-size: 12px; margin:0px;">
    ${note.date}
  -----------
  </p>
  `;
  newDiv.addEventListener("click", function() {
      setNotesContent(index);
    });
  sidebar.appendChild(newDiv);}

for (let i = 0; i < content.length; i++) {
    addToSideBar(i)
}
function nextSkel() {
  if (skelIndex < skel.length-1){
    skelIndex++;
    setSkelContent(skelIndex);}
}
function backSkel() {
  if (skelIndex > 0){
    skelIndex--;
    setSkelContent(skelIndex);}
}

function updateSkelButtons(){
  if (skelIndex === 0) {
    backbutton.classList.add("no");
    skeletonImage.classList.add("no");
    heart.classList.add("no");
  } else {
    backbutton.classList.remove("no");
    skeletonImage.classList.remove("no");
    heart.classList.remove("no");
  }
  if (skelIndex === skel.length-1) {
    nextbutton.classList.add("no");
  } else {
    nextbutton.classList.remove("no");
  }
}
function setupWindow(elementName) {
  var screen = document.querySelector("#" + elementName);
  addWindowTapHandling(screen)
  makeClosable(screen)
  dragElement(screen)
  if(elementName!="welcome") {
    initializeIcon(elementName)
  }
}
function initializeIcon(name) {
  var icon=document.querySelector("#"+name+"Icon")
  var screen=document.querySelector("#"+name)
  icon.addEventListener("click", function() {
    HandleIconTap(icon,screen)});
}

function makeClosable(screen) {  
  var closeButton = document.querySelector("#" + screen.id + "close");
  var openButton = document.querySelector("#" + screen.id + "open");
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      closeWindow(screen);
    });
  }
  if (openButton) {
    openButton.addEventListener("click", function () {
      openWindow(screen);
    });
}}
function dragElement(element) {
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  if (document.getElementById(element.id + "header")) {
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault(); 
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = drag;
  }

  function drag(e) {
    e = e || window.event;
    e.preventDefault();
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function closeWindow(element) {
    element.style.display="none"
    topBar.style.zIndex = biggestIndex+1;
}

function openWindow(element) {
    element.style.display="block"
    biggestIndex++;
    element.style.zIndex = biggestIndex;
}

function selectIcon(element) {
  element.classList.add("selected")
  selectedIcon = element
}

function deselectIcon(element) {
  element.classList.remove("selected")
  selectedIcon = undefined
}

function HandleIconTap(element, screen) {
  if (element.classList.contains("selected")) {
    deselectIcon(element);
    openWindow(screen);
  } else {
    selectIcon(element);
  }
}

function addWindowTapHandling(element) {
  element.addEventListener("mousedown", function() {
    handleWindowTap(element)
  })    
}

function handleWindowTap(element) {
  biggestIndex++;  
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex+1;
  deselectIcon(selectedIcon)
}