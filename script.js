var biggestIndex=1;
var topBar=document.querySelector("#top");setupWindow("welcome");
setupWindow("skeletale");
setupWindow("notes");
setupWindow("countdown");
setupWindow("todo")
var nextbutton = document.querySelector("#nextbutton");
var backbutton = document.querySelector("#backbutton");
var skeletonImage = document.querySelector("#skeletonImage");
var skelIndex=0

var todoInput = document.querySelector("input[name='task']");
var todolist = document.querySelector("#todolist");
var todos=[];
var todoadd = document.querySelector("#todoadd");
var nexttodo=0;

updatetodoList();

todoInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        addtask();
    }
});
todoadd.addEventListener("click", function() {
  addtask();
});

function addtask() {
    var todo = todoInput.value;

    if (!todo) {
        return;
    }

    var task = {
        id: nexttodo++,
        task: todo,
        status: false
    };

    todos.push(task);

    todoInput.value="";

    updatetodoList();

    return task;
}

function updatetodoList() {
    if (todos.length === 0) {
        todolist.innerHTML = `
            <p style="text-align:center;">
              Empty. </br>  
              Nothing to do?
            </p>
        `;
        return;
    }

    todolist.innerHTML = "";

    todos.forEach(function(todo) {

        var item = document.createElement("div");

        item.className = "todolistitem space-between";

        if (todo.status) {
          item.classList.add("done");
        }
        item.dataset.id = todo.id;

        item.innerHTML = `
            <div style="color:black">
                <b>${todo.task}</b>
            </div>

            <div class="todolistbuttons space-between">
              <button class="deletetask center">×</button>
              <button class="completetask center">${todo.status ? "☑" : "◻"}</button>  
            </div>
        `;

        item.querySelector(".completetask").addEventListener("click", function() {
            complete(todo.id);
        });

        item.querySelector(".deletetask").addEventListener("click", function() {
            deletetask(todo.id);
        });

        todolist.appendChild(item);
    });
}

function deletetask(id) {
  if (!confirm("Delete this task?")) {
    return;
  }

  todos = todos.filter(function(todo) {
    return todo.id !== id;
  });

  updatetodoList();
}

function complete(id) {
  var task = todos.find(function(todo) {
      return todo.id === id;
  });

  if (!task) {
      return;
  }

  task.status=!task.status;

  updatetodoList();
}


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
   title:"Eye Sockets",
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
   To study I play Undertale soundtrack to not get distracted by lyrics, although I do get sometimes distracted by the good melody.
   I'll have the chance to go see their live symphony I'm super excited!   
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
   I was a Summer camp bike instructor last summer and this semester, I am taking an intensive cycling course. It made me realize that my cardio is quite terrible.
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
   These hand of mine love to : <br>
   - craft <br>
   - bake <br>
   - crochet <br>
   - solve puzzles <br>
   - build with LEGOs

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
   These feet of mine have touched the ground of : <br>
   - France <br>
   - Viet Nam <br>
   - Canada <br>
   - United States <br>
   - Spain <br>
   - Qatar  
   </p>
   ` 
  },
]

var content = [
  {
    title:"Hello Kitty Murder",
    date: "23/06/2026",
    content:`
    <h2><a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=c-AiJvGFeQA&pp=ygUPbGl2IGhlbGxvIGtpdHR5">Hello Kitty Murder</a></h2>
    <p>I listened to both Liv's and Rotten Mango's account of this murder and it was pretty gruesome ngl. I think Liv's video was one of my first actual true crime stories!</p>`
  },
  {
    title:"The Nth rooms",
    date: "23/06/2026",
    content:`
    <h2><a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=PZ0vGxTpasM&pp=ygUVcm90dGVuIG1hbmdvIG50aCByb29t0gcJCf4LAYcqIYzv">Nth rooms</a></h2>
    <p>This was quite traumatizing for me when I was younger. The atrocities she described were so heart wrenching I started to fear the Internet, you never know what's on there.</p>
    <p>The number of victims but also of perpretators really made me question life.</p>
    `
  },
    {
    title:"Sewol Ferry Tragedy",
    date: "23/06/2026",
    content:`
    <h2><a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=VMs5bTRjjeI">Sewol Ferry Tragedy</a></h2>
    <p>I watched this tragedy after the Itaewon tragedy and it wasn't a very good idea.</p>
    <p>The fact that this was evitable made me so mad ugh. The included recordings are very hard to listen to.</p>
    `
  },
  {
    title:"Itaewon Tragedy",
    date: "23/06/2026",
    content:`
    <h2><a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=F3sIDvFh3Os&pp=ygUUaXRhZXdvbiByb3R0ZW4gbWFuZ28%3D">Itaewon Tragedy</a></h2>
    <p>badabim badaboom (iykyk)</p>
    <p>I think this was the first or second video I ever watched from Rotten Mango. It's not really a crime story, but it had many casualities.</p>
    <p>I remember seeing this event on the news but the way Stephanie Soo (the host) tells the story makes it feel way more real, which is why I love her storytelling.</p>
    `
  },
  {
    title: "Real Life Squid Game",
    content:`
    <h2><a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=wNN1D_E6vjI&pp=ygUXcm90dGVuIG1hbmdvIHNxdWlkIGdhbWU%3D">Real Life Squid game</a></h2>
    <p>I really liked this one because I had just finished Squid Game's second season and was eagerly waiting for the third one. Hearing stories like this really make me grateful to have the life I have right now.</p>`
  },
  {
    title:"About",
    date: "22/06/2026",
    content: `
    <h2>About</h2>
    <p>I really enjoy listening to true crime stories and here you will find my thoughts about some of these stories.</p>
    <p>My favorite podcasts are
    <a target="_blank" rel="noopener noreferrer" href="https://open.spotify.com/show/2DZwvzn6Z3xCFZrwZGDrbj?si=aa0883a2a0d7481f">Rotten Mango</a> and
    <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/@LivMoietco">Liv</a> (a French Youtuber)</p>`
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
  var sidebar=document.querySelector("#feet");
  var note=content[index];

  var newDiv=document.createElement("div");

  newDiv.className = "hoverbig footprints " + (index%2 === 0? "left":"right");
  newDiv.title=note.title;
  newDiv.innerHTML = `
    <img src="./Images/footprints.png" alt="footprints"> `;
  newDiv.addEventListener("click", function() {
      notesSidebar.classList.add("compressed");
      notesContent.classList.remove("no");
      setNotesContent(index);
    });
  sidebar.appendChild(newDiv);}

  for (let i = 0; i < content.length; i++) {
      addToSideBar(i);
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
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      closeWindow(screen);
    });
  }
}
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