objects = [];
Status = "";

function preload()
{
    video = createVideo('video.mp4');
}

function setup()
{
    canvas = createCanvas(480,380);
    canvas.center();
    video.hide();
}

function Start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("heading").innerHTML = "Status : Detecting Objects";

}

function modelLoaded()
{
    console.log("The model has Loaded");
    Status = true;
   
    
}
function gotResult(error, results)
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
    image(video, 0 , 0 , 480 , 380);

    if(Status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i =0; i < objects.length; i++)
        {

            if(objects == heading)
            {
                video.hide();
            }
            document.getElementById("status").innerHTML = "Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects detected are = " + objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);

            noFill();
            stroke("#FF0000");
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
