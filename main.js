status = "";
objects = [];

function preload()
{
   alarm_sound = loadSound("alarm.mp3");
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    ObjectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: detecting objects";
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = "samagna";
}

function gotresults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}

function draw()
{
    image(video, 0, 0, 380, 380);
   if(status != "")
   {
    r = random(255);
    g = random(255);
    b = random(255);
    ObjectDetector.detect(video, gotresults);
    for(i = 0; i < objects.length; i++)
    {
        document.getElementById("status").innerHTML = "Status : objects detected";
        fill(r, g, b);
        percent = floor(objects[i].confidence*100);
        text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
        noFill();
        stroke(r, g, b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        if(objects[i].label == "person")
        {
            document.getElementById("detecting_baby_status").innerHTML = "Baby Detected";
            alarm_sound.stop();
        }
        else
        {
            document.getElementById("detecting_baby_status").innerHTML = "Baby Not Detected";
            alarm_sound.play();
        }
    }
   }
}