import { Injectable } from '@angular/core';
import AgoraRTC, {IAgoraRTCClient} from 'agora-rtc-sdk-ng';

//const client: IAgoraRTCClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

var rtc = {
  // For the local client.
  client: null,
  // For the local audio and video tracks.
  localAudioTrack: null,
  localVideoTrack: null,
};

var options = {
  // Pass your app ID here.
  appId: "9f7a20c68b094028802f1129c24b1fb9",
  // Set the channel name.
  channel: "agora-demo-test",
  // Pass a token if your project enables the App Certificate.
  token: "0069f7a20c68b094028802f1129c24b1fb9IABDDbv6HgJrGoHM+SLpUnLpspuqx/H6mG2cJ9iWHotfn+XNIEUAAAAAEAC5X9YGeZ5gYAEAAQB4nmBg",
};

@Injectable({
  providedIn: 'root'
})
export class AgoraService {

  constructor() { }

  //Start A Basic Call

  async startCall() {
    console.log("Inside AgoraService startCall() Function");
    rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
    const uid = await rtc.client.join(options.appId, options.channel, options.token, null);

    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();

    await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
    console.log("publish success!");

    //Subscribe to Self Video Stream


    rtc.client.on("user-published", async (user, mediaType) => {
      // Subscribe to a remote user.
      await rtc.client.subscribe(user, mediaType);
      console.log("subscribe success");
    
      // If the subscribed track is video.
      if (mediaType === "video") {
        // Get `RemoteVideoTrack` in the `user` object.
        const remoteVideoTrack = user.videoTrack;
        // Dynamically create a container in the form of a DIV element for playing the remote video track.
        const playerContainer = document.createElement("div");
        // Specify the ID of the DIV container. You can use the `uid` of the remote user.
        playerContainer.id = user.uid.toString();
        playerContainer.style.width = "640px";
        playerContainer.style.height = "480px";
        document.body.append(playerContainer);
    
        // Play the remote video track.
        // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
        remoteVideoTrack.play(playerContainer);
    
        // Or just pass the ID of the DIV container.
        // remoteVideoTrack.play(playerContainer.id);
      }
    
      // If the subscribed track is audio.
      if (mediaType === "audio") {
        // Get `RemoteAudioTrack` in the `user` object.
        const remoteAudioTrack = user.audioTrack;
        // Play the audio track. No need to pass any DOM element.
        remoteAudioTrack.play();
      }
    });
  
  
    rtc.client.on("user-unpublished", user => {
      // Get the dynamically created DIV container.
      const playerContainer = document.getElementById(user.uid);
      // Destroy the container.
      playerContainer.remove();
    });



  }


  async endCall() {
    console.log("Inside AgoraService endCall() Function");

    rtc.localAudioTrack.close();
    rtc.localVideoTrack.close();

    await rtc.client.leave();

    console.log("Dissconnected...");
  }

  async joinCall() {
    console.log("Inside AgoraService joinCall() Function");
  }
}
