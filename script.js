function main() {
  // We need to find first the device orientation.
  // I can do this by adding the event listener to listen for the device
  window.addEventListener("deviceorientation", ondirectionChange);

  // Now let's set the back camera for to measure the object
  // navigator.mediaDevices.getUserMedia({video: true}) // we need to change this to allow users to user to back camera otherwise users will see themselves.
  navigator.mediaDevices
    .getUserMedia({
      video: {
        facingMode: "environment",
      },
    })
    .then(function (signal) {
      const video = document.getElementById("myVideo");
      video.srcObject = signal;
      video.play();
    })
    .catch(function (error) {
      alert(error);
    });
}

function ondirectionChange(event) {
  // console.log(event.beta)

  // Now to be able to mesure the height of an object we need to focus on Beta angle
  // and substutute 90 degrees from beta angle
  let angle = event.beta - 90;
  if (angle < 0) {
    angle = 0;
  }

  // Now we need to convert the angle into a hegiht but we also need the distance to the object
  // in my case let's take 35m

  // Following the Math formula.  tan (angle) = height/distance from the object (the distance we know it alread)

  //Getting the value of the slider and set the distance
  const distanceToTree = document.getElementById("mySlider").value;
  // Print the value in order to see values on the screen
  document.getElementById("myLabel").innerHTML =
    "Distance to object: " + distanceToTree + " meters";
  const height = Math.tan((angle * Math.PI) / 100) * distanceToTree;
  document.getElementById("heightDetail").innerHTML =
    height.toFixed(1) + " m(" + angle.toFixed(1) + "&deg;)";
}
