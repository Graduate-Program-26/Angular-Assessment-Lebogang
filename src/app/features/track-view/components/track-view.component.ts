
import { MOCK_TRACKS } from '../mock-data/tracks.mock'
import { Track } from '../track.model';
import { ActivatedRoute } from '@angular/router';
import { Component, PLATFORM_ID, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { durationPipe } from '../../../shared/pipes/duration-format.pipe';
@Component({
    selector: 'track-view',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, SliderModule, durationPipe],
    styles: `
        .now-playing-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-size: cover;
            background-position: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .blur-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.65);
            backdrop-filter: blur(24px);
            z-index: 1;
        }

        .close-btn {
            position: absolute;
            top: 2rem;
            right: 2rem;
            z-index: 2;
        }

        .now-playing-content {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: 450px;
            text-align: center;
            padding: 2rem;
        }

        .album-art-wrapper {
            width: 300px;
            height: 300px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            margin-bottom: 2rem;
        }

        .album-art {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .track-info {
            color: #ffffff;
            margin-bottom: 2rem;
            width: 100%;
        }

        .track-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.25rem;
        }

        .track-artist {
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.6);
            font-weight: 400;
        }

        .progress-section {
            display: flex;
            align-items: center;
            width: 100%;
            gap: 1rem;
            color: rgba(255, 255, 255, 0.6);
            margin-bottom: 2rem;
        }

        .progress-slider {
            flex-grow: 1;
        }

        .time {
            font-size: 0.8rem;
            min-width: 35px;
        }

        .controls-section {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .play-btn {
            transform: scale(1.2);
        }

        .volume-section {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            width: 60%;
            color: rgba(255, 255, 255, 0.6);
        }

        .volume-slider {
            width: 100%;
        }
    `,
    template: `
    <div class="now-playing-container" [style.backgroundImage]="'url(' + trackData?.album?.cover_medium + ')'">
        <div class="blur-overlay"></div>

    <div class="now-playing-content">
        <div class="album-art-wrapper">
            <img [src]="trackData?.album?.cover_medium" alt="Album Art" class="album-art" />
        </div>

        <div class="track-info">
            <h1 class="track-title">{{ trackData?.title }}</h1>
            <h3 class="track-artist">{{ trackData?.artist?.name }}</h3>
        </div>

        <div class="progress-section">
            <span class="time">{{ formatTime(currentTime) }}</span>
            <p-slider 
                [(ngModel)]="progress" 
                (onChange)="onProgressChange($event)" 
                class="progress-slider" />
            <span class="time">{{ trackData?.duration || '' | durationFormat}}</span>
        </div>

        <div class="controls-section">
            <p-button icon="pi pi-step-backward" [text]="true" severity="secondary" (click)="prevTrack()" />
            
            <p-button 
                [icon]="isPlaying ? 'pi pi-pause' : 'pi pi-play'" 
                [rounded]="true" 
                severity="success" 
                class="play-btn" 
                (click)="togglePlayback()" />
                
            <p-button icon="pi pi-step-forward" [text]="true" severity="secondary" (click)="nextTrack()" />
        </div>

        <div class="volume-section">
            <i class="pi pi-volume-down text-secondary"></i>
            <p-slider 
                [(ngModel)]="volume" 
                (onChange)="onVolumeChange($event)" 
                class="volume-slider" />
            <i class="pi pi-volume-up text-secondary"></i>
        </div>

        <audio 
            #audioPlayer 
            [src]="trackData?.preview" 
            (timeUpdate)="updateProgress()" 
            (ended)="onAudioEnded()">
        </audio>
    </div>
</div>
    
    
    `
})
export class TrackView implements OnInit, OnDestroy {
    private route = inject(ActivatedRoute);
    trackData: Track | null = MOCK_TRACKS[0];
    platformId = inject(PLATFORM_ID);
    private audio!: HTMLAudioElement;


    isPlaying = false;
    progress = 0;
    currentTime = 0;
    volume = 80; // percentage

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.audio = new Audio();

            // Bind Audio events
            this.audio.addEventListener('timeupdate', () => this.updateProgress());
            this.audio.addEventListener('ended', () => this.onAudioEnded());
        }

        this.route.data.subscribe(({ trackData }) => {
            this.trackData = trackData || MOCK_TRACKS[1];

            const TEST_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // will be replaced with trackData.preview
            this.loadTrack(TEST_URL);
        });
    }

    loadTrack(previewUrl: string) {
        if (this.audio && this.audio.src !== previewUrl) {
            this.audio.src = previewUrl;
            this.audio.load();

            this.audio.oncanplay = () => {
                console.log('Audio is ready to play.');
            };

            this.audio.onerror = (e) => {
                console.error('Error loading media source:', e);
            };
        }
    }

    togglePlayback() {
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play().catch((err) => {
                console.error('Audio playback was prevented by the browser:', err);
            });
        }

        this.isPlaying = !this.isPlaying;
    }

    updateProgress() {
        this.currentTime = this.audio.currentTime;
        this.progress = (this.audio.currentTime / this.audio.duration) * 100 || 0;
    }

    onProgressChange(event: any) {
        if (this.audio.duration) {
            this.audio.currentTime = (event.value / 100) * this.audio.duration;
        }
    }

    onVolumeChange(event: any) {
        this.audio.volume = event.value / 100;
        this.volume = event.value;
    }

    onAudioEnded() {
        this.isPlaying = false;
        this.progress = 0;
        this.currentTime = 0;
    }

    formatTime(seconds: number): string {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    prevTrack() {
        // Implement previous track navigation logic
    }

    nextTrack() {
        // Implement next track navigation logic
    }



    ngOnDestroy() {
        // Prevent memory leaks by pausing and removing the listeners on destroy
   
       
    }

}