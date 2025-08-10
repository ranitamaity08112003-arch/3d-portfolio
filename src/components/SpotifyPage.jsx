import React, { useState, useEffect } from "react";

const backendUrl = 'https://backend-9mbs.onrender.com';

export default function SpotifyPage() {
    const [spotifyData, setSpotifyData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch spotify data
    async function fetchSpotifyData() {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${backendUrl}/spotify`, {
                credentials: "include",
            });
            if (!res.ok) throw new Error("Not authenticated or fetch failed");
            const data = await res.json();
            setSpotifyData(data);
        } catch (e) {
            setError(e.message);
            setSpotifyData(null);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchSpotifyData();
    }, []);

    // Open login page to authenticate
    function login() {
        window.location.href = `${backendUrl}/login`;
    }

    async function playTrack(uri) {
        try {
            const res = await fetch(`${backendUrl}/spotify/play?uri=${encodeURIComponent(uri)}`, {
                method: "PUT",
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to play track");
            alert("Playback started");
        } catch (e) {
            alert(e.message);
        }
    }

    async function pausePlayback() {
        try {
            const res = await fetch(`${backendUrl}/spotify/pause`, {
                method: "PUT",
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to pause playback");
            alert("Playback paused");
        } catch (e) {
            alert(e.message);
        }
    }

    return (
        <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
            <h1>Spotify Integration</h1>
            <button onClick={login}>Login with Spotify</button>

            {loading && <p>Loading Spotify data...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            {spotifyData && (
                <>
                    <h2>Top 10 Tracks</h2>
                    <ol>
                        {spotifyData.top_tracks.items.map((track) => (
                            <li key={track.id} style={{ marginBottom: 10 }}>
                                {track.name} — {track.artists.map((a) => a.name).join(", ")}
                                <button
                                    style={{ marginLeft: 10 }}
                                    onClick={() => playTrack(track.uri)}
                                >
                                    Play
                                </button>
                            </li>
                        ))}
                    </ol>

                    <h2>Now Playing</h2>
                    {spotifyData.currently_playing ? (
                        <div>
                            {spotifyData.currently_playing.item.name} —{" "}
                            {spotifyData.currently_playing.item.artists
                                .map((a) => a.name)
                                .join(", ")}
                            <button style={{ marginLeft: 10 }} onClick={pausePlayback}>
                                Pause
                            </button>
                        </div>
                    ) : (
                        <p>Nothing is playing currently.</p>
                    )}

                    <h2>Followed Artists</h2>
                    <ul>
                        {spotifyData.followed_artists.artists.items.map((artist) => (
                            <li key={artist.id}>{artist.name}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
