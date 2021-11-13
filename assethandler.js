class AssetHandler {
    constructor(){
        this.images = {};
        this.sounds = {};
    }
    
    //Takes images in form [[image name, image source]...] and adds them to images. Calls callback on finish.
    loadImages(imagesToLoad, callback){
        let imagesLoaded = 0;
        
        for (let i = 0; i < imagesToLoad.length; i++) {
            this.images[imagesToLoad[i][0]] = loadImage(imagesToLoad[i][1]);
        }
        
        function loadImage(url){
            let image = new Image();
            image.addEventListener("load", imageLoaded, false);
            image.src = url;
            return image;
        }
        
        function imageLoaded(){
            imagesLoaded++;
            if (imagesLoaded == imagesToLoad.length){
                callback(this.images);
            }
        }
    }
    
    loadSounds(soundsToLoad, callback){
        let soundsLoaded = 0;
        for(let i = 0; i < soundsToLoad.length; i++){
            loadSound(soundsToLoad[i][1], soundsToLoad[i][0]);
        }
        function loadSound(url, sourceName) {
            // Load buffer asynchronously
            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = "arraybuffer";

            request.onload = function() {
                // Asynchronously decode the audio file data
                G.audioContext.decodeAudioData(
                    request.response,
                    function(buffer) {
                        if (!buffer) {
                            console.log('error decoding file data: ' + url);
                            return;
                        }
                            soundsLoaded++;
                            G.assetHandler.sounds[sourceName] = buffer;
                            if(soundsLoaded == soundsToLoad.length){
                                callback();
                            }
                    }
                );
            }

            request.onerror = function() {
                console.log('error loading file data: ' + url);
            }

            request.send();
        }
    }
}