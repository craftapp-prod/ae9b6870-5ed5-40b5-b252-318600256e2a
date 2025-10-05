"use client";
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Upload, X } from 'lucide-react';
import "./page.css";
export default function MiniPlayer() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('video/')) {
        setUploadError('Please upload a valid video file');
        return;
      }
      setUploadError(null);
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
    }
  };
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  const toggleFullscreen = () => {
    if (!isFullscreen && playerContainerRef.current) {
      if (playerContainerRef.current.requestFullscreen) {
        playerContainerRef.current.requestFullscreen();
      }
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };
  const handleProgress = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setCurrentTime(currentTime);
      setDuration(duration);
      setProgress(currentTime / duration * 100);
    }
  };
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const seekTime = parseFloat(e.target.value);
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };
  const handleVideoClick = () => {
    togglePlayPause();
  };
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    controlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, [isPlaying]);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);
  return <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8" data-path="frontend/src/app/page.tsx" id="el_769c59d3">

      <div className="max-w-4xl mx-auto" data-path="frontend/src/app/page.tsx" id="el_aa920b74"><div className="text-center mb-12" data-path="frontend/src/app/page.tsx" id="el_66ec7d8d"><h1 className="text-4xl font-bold text-gray-900 mb-4 selected-element" data-path="frontend/src/app/page.tsx" id="el_6f478c2e">MiniPlayer</h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto selected-element" data-path="frontend/src/app/page.tsx" id="el_c106f7d1">
            A lightweight, user-friendly video player with essential playback controls
          </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden" data-path="frontend/src/app/page.tsx" id="el_9c674b64">

          <div ref={playerContainerRef} className="relative bg-black aspect-video" onMouseMove={handleMouseMove} data-path="frontend/src/app/page.tsx" id="el_3037d53f">
            {!videoUrl ? <div className="absolute inset-0 flex items-center justify-center bg-gray-100" data-path="frontend/src/app/page.tsx" id="el_0aea084c">

                <div className="text-center p-8" data-path="frontend/src/app/page.tsx" id="el_fdfa6b03">

                  <Upload className="w-16 h-16 text-primary-500 mx-auto mb-4" />

                  <h2 className="text-xl font-semibold text-gray-800 mb-2" data-path="frontend/src/app/page.tsx" id="el_e1887ce5">
                    Upload a Video to Play
                  </h2>

                  <p className="text-gray-600 mb-6" data-path="frontend/src/app/page.tsx" id="el_d8187968">
                    Supports MP4, WebM, and other common video formats
                  </p>

                  <div className="relative" data-path="frontend/src/app/page.tsx" id="el_9ed7f65f">

                    <label className="block" data-path="frontend/src/app/page.tsx" id="el_8578e3a6">

                      <input type="file" accept="video/*" onChange={handleFileUpload} className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-primary-50 file:text-primary-700
                          hover:file:bg-primary-100
                          cursor-pointer" data-path="frontend/src/app/page.tsx" id="el_3731bbad" />
                    </label>
                    {uploadError && <p className="mt-2 text-sm text-red-600" data-path="frontend/src/app/page.tsx" id="el_9a040d71">{uploadError}</p>}
                  </div>
                </div>
              </div> : <>

                <video ref={videoRef} src={videoUrl} className="w-full h-full object-contain" onClick={handleVideoClick} onTimeUpdate={handleProgress} onLoadedMetadata={handleProgress} onEnded={() => setIsPlaying(false)} data-path="frontend/src/app/page.tsx" id="el_b1327e8c" />
                {/* Controls overlay */}
                {showControls && <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-between p-4" data-path="frontend/src/app/page.tsx" id="el_734d813c">
                    {/* Top controls */}

                    <div className="flex justify-end" data-path="frontend/src/app/page.tsx" id="el_3be9d10d">

                      <button onClick={() => {
                  setVideoUrl("");
                  setVideoFile(null);
                  setUploadError(null);
                }} className="p-2 text-white bg-black/50 rounded-full hover:bg-black/70 transition-colors" data-path="frontend/src/app/page.tsx" id="el_95c3401d">

                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    {/* Bottom controls */}

                    <div className="flex flex-col gap-2" data-path="frontend/src/app/page.tsx" id="el_13c6c166">

                      <div className="flex items-center gap-4" data-path="frontend/src/app/page.tsx" id="el_206e712f">

                        <button onClick={togglePlayPause} className="p-2 text-white bg-black/50 rounded-full hover:bg-black/70 transition-colors" data-path="frontend/src/app/page.tsx" id="el_f292f67f">
                          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        </button>

                        <div className="flex items-center gap-2 text-white text-sm" data-path="frontend/src/app/page.tsx" id="el_144973cf">

                          <span data-path="frontend/src/app/page.tsx" id="el_6c6a678c">{formatTime(currentTime)}</span>

                          <span data-path="frontend/src/app/page.tsx" id="el_ba6363f0">/</span>

                          <span data-path="frontend/src/app/page.tsx" id="el_cc5d2615">{formatTime(duration)}</span>
                        </div>

                        <div className="flex-1" data-path="frontend/src/app/page.tsx" id="el_064c0daf">

                          <input type="range" min="0" max={duration || 100} value={currentTime} onChange={handleSeek} className="w-full h-1" data-path="frontend/src/app/page.tsx" id="el_e31ef7e0" />
                        </div>

                        <button onClick={toggleMute} className="p-2 text-white bg-black/50 rounded-full hover:bg-black/70 transition-colors" data-path="frontend/src/app/page.tsx" id="el_8fdfae67">
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>

                        <div className="w-20" data-path="frontend/src/app/page.tsx" id="el_1f8faae7">

                          <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="w-full h-1" data-path="frontend/src/app/page.tsx" id="el_c013d46d" />
                        </div>

                        <button onClick={toggleFullscreen} className="p-2 text-white bg-black/50 rounded-full hover:bg-black/70 transition-colors" data-path="frontend/src/app/page.tsx" id="el_8dd1bbe7">
                          {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>}
              </>}
          </div>
        </div>

      <div className="mt-12 bg-white rounded-xl shadow-lg p-8 selected-element" data-path="frontend/src/app/page.tsx" id="el_3068e530">

          <h2 className="text-2xl font-bold text-gray-900 mb-6" data-path="frontend/src/app/page.tsx" id="el_69784b7d">Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-path="frontend/src/app/page.tsx" id="el_6e126c66">

            <div className="flex flex-col items-start p-4 bg-gray-50 rounded-lg" data-path="frontend/src/app/page.tsx" id="el_d261830e">

              <div className="p-3 rounded-full bg-primary-100 mb-4" data-path="frontend/src/app/page.tsx" id="el_de8d3815">

                <Play className="w-6 h-6 text-primary-600" />
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2" data-path="frontend/src/app/page.tsx" id="el_01687f1f">Playback Controls</h3>

              <p className="text-gray-600" data-path="frontend/src/app/page.tsx" id="el_a497c46b">
                Play, pause, and seek through your videos with intuitive controls
              </p>
            </div>

            <div className="flex flex-col items-start p-4 bg-gray-50 rounded-lg" data-path="frontend/src/app/page.tsx" id="el_55d8ad90">

              <div className="p-3 rounded-full bg-primary-100 mb-4" data-path="frontend/src/app/page.tsx" id="el_1f5b9f61">

                <Volume2 className="w-6 h-6 text-primary-600" />
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2" data-path="frontend/src/app/page.tsx" id="el_2220adc8">Volume Control</h3>

              <p className="text-gray-600" data-path="frontend/src/app/page.tsx" id="el_434b1209">
                Adjust volume or mute with simple slider controls
              </p>
            </div>

            <div className="flex flex-col items-start p-4 bg-gray-50 rounded-lg" data-path="frontend/src/app/page.tsx" id="el_20a82d80">

              <div className="p-3 rounded-full bg-primary-100 mb-4" data-path="frontend/src/app/page.tsx" id="el_523b9122">

                <Maximize className="w-6 h-6 text-primary-600" />
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2" data-path="frontend/src/app/page.tsx" id="el_4e18a377">Fullscreen Mode</h3>

              <p className="text-gray-600" data-path="frontend/src/app/page.tsx" id="el_9134db1a">
                Enjoy videos in fullscreen for an immersive experience
              </p>
            </div>
          </div>
        </div>

      <div className="mt-12 text-center" data-path="frontend/src/app/page.tsx" id="el_3a2f4d1f">

          <h2 className="text-2xl font-bold text-gray-900 mb-6" data-path="frontend/src/app/page.tsx" id="el_f737f05f">Ready to Play?</h2>

          <p className="text-gray-600 mb-8 max-w-2xl mx-auto" data-path="frontend/src/app/page.tsx" id="el_9d085390">
            Upload your video and enjoy seamless playback with MiniPlayer
          </p>

          <div className="flex justify-center" data-path="frontend/src/app/page.tsx" id="el_42e4969d">

            <label className="inline-flex h-12 items-center justify-center rounded-md bg-primary-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer" data-path="frontend/src/app/page.tsx" id="el_df3b035f">
              Upload Video
              <input type="file" accept="video/*" onChange={handleFileUpload} className="hidden" data-path="frontend/src/app/page.tsx" id="el_9918df59" />
            </label>
          </div>
        </div>
    </div>
    </div>;
}