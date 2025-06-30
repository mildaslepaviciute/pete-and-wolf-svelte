<script>
    import { audioPlayerActive } from '$lib/store.js';
    
    export let audioUrl;
    export let title = "";
    
    let audio;
    let isPlaying = false;
    let progress = 0;
    let playerId = Math.random().toString(16).slice(2); // Simple unique ID
    
    function togglePlay() {
        if (!audio) return;
        
        if (audio.paused) {
            $audioPlayerActive = playerId;
            audio.play().catch(console.error);
            isPlaying = true;
        } else {
            audio.pause();
            isPlaying = false;
            if ($audioPlayerActive === playerId) {
                $audioPlayerActive = null;
            }
        }
    }
    
    function handleTimeUpdate() {
        if (!audio) return;
        progress = (audio.currentTime / audio.duration) * 100 || 0;
    }

    function handlePlay() {
        isPlaying = true;
    }
    
    function handlePause() {
        isPlaying = false;
    }

    function handleEnded() {
        isPlaying = false;
        progress = 0;
        if ($audioPlayerActive === playerId) {
            $audioPlayerActive = null;
        }
    }
    
    // Listen for other players starting
    $: if ($audioPlayerActive && $audioPlayerActive !== playerId && isPlaying && audio) {
        audio.pause();
        isPlaying = false;
    }
</script>

<div class="audio-player-container">
    <div class="audio-player">
        <button 
            class="player-button" 
            class:playing={isPlaying}
            on:click={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
        >
            <div class="progress-ring">
                <svg viewBox="0 0 100 100">
                    <circle
                        class="progress-ring__circle-bg"
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                    />
                    <circle
                        class="progress-ring__circle"
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        style="stroke-dashoffset: {283 - (283 * progress) / 100}px"
                    />
                </svg>
            </div>
            <div class="icon-container">
                {#if isPlaying}
                    <div class="pause-icon">
                        <span></span>
                        <span></span>
                    </div>
                {:else}
                    <div class="play-icon">
                        <svg viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="12" />
                        </svg>
                    </div>
                {/if}
            </div>
        </button>

        <audio
            bind:this={audio}
            src={audioUrl}
            on:timeupdate={handleTimeUpdate}
            on:ended={handleEnded}
            preload="metadata"
        >
            <track kind="captions" />
        </audio>
    </div>
    
    {#if title}
        <div class="audio-title">
            <span>{title}</span>
        </div>
    {/if}
</div>

<style>
    .audio-player-container {
        display: flex;
        align-items: center;
        margin: 1rem auto;
    }

    .audio-player {
        width: 50px;
        height: 50px;
        min-width: 50px;
        min-height: 50px;
        position: relative;
    }

    .audio-title {
        margin-left: 20px;
        display: flex;
        align-items: center;
        height: 50px;
    }

    .player-button {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: none;
        padding: 0;
        background: transparent;
        cursor: pointer;
        position: relative;
    }

    .progress-ring {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    svg {
        transform: rotate(-90deg);
    }

    .progress-ring__circle-bg {
        stroke: #e6e6e6;
        stroke-width: 8px;
    }

    .progress-ring__circle {
        stroke: #0022f7;
        stroke-width: 8px;
        stroke-linecap: round;
        stroke-dasharray: 283;
        transition: stroke-dashoffset 0.1s linear;
    }

    .icon-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30%;
        height: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .play-icon {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 9px 0 9px 15px;
        border-color: transparent transparent transparent #0022f7;
        margin-left: 4px;
    }

    .pause-icon {
        width: 16px;
        height: 16px;
        position: relative;
        display: flex;
        justify-content: space-between;
        gap: 4px;
    }

    .pause-icon span {
        width: 8px;
        height: 16px;
        background-color: #0022f7;
        border-radius: 4px;
    }

    .player-button:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(0,34,247,0.2);
    }

    .player-button:hover .progress-ring__circle {
        stroke: rgba(0,34,247,0.8);
    }
</style>