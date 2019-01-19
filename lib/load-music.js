 function fetchAsArrayBuffer(url) {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();

                xhr.open("GET", url, true);
                xhr.responseType = "arraybuffer";

                xhr.onload = function() {
                if (xhr.response) {
                    resolve(xhr.response);
                }
                };
                xhr.onerror = reject;

                xhr.send();
            });
            }

            function decodeAudioData(audioContext, arrayBuffer) {
            return new Promise(function(resolve, reject) {
                audioContext.decodeAudioData(arrayBuffer, resolve, reject);
            });
            }

            function fetchAsAudioBuffer(audioContext, url) {
            if (Array.isArray(url)) {
                return Promise.all(url.map(function(url) {
                return fetchAsAudioBuffer(audioContext, url);
                }));
            }
            return fetchAsArrayBuffer(url).then(function(arrayBuffer) {
                return decodeAudioData(audioContext, arrayBuffer);
            });
            }


       

        window.loadMusic = (soundInputs, onProgress)=>{  
            let progress = 0;
            const len = Object.entries(soundInputs).length;   
            const context = new AudioContext();
            console.log(Object.entries(soundInputs));
            return Promise.all(Object.entries(soundInputs).map(
                async ([name, path])=>{
                    console.log("path", path);
                    const buffer = await fetchAsAudioBuffer(context, path);
                    progress++;
                    if(onProgress){
                        onProgress(progress/len);
                    }
                    return [name, buffer];
                }
            )).then((results)=>{
                const soundz = {};
                results.forEach(([name,buffer])=>{
                    let source = context.createBufferSource();
                    source.buffer = buffer;
                    source.loop = true;
                    //source.connect(context.destination);
                    source.start();

                    let connected = false;
                    soundz[name]={
                        start: ()=>{
                            // unmute 
                            if(!connected){
                                connected = true;
                                source.connect(context.destination);
                             }
                        },
                        stop: ()=>{
                            // mute
                            if(connected){
                                connected = false;
                                source.disconnect(context.destination);
                            }
                        }
                    }
                });
                return soundz;
            }).then((songs)=>{
                const stopAll = ()=>{
                    Object.values(songs).forEach((song)=>{
                        song.stop();
                    });
                };
                const playMusic = (name)=>{
                        stopAll();
                        const song=songs[name];
                        if(song){
                            song.start();
                        }
                };
                return {
                   playMusic 
                }
            });     
        };