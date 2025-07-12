import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const playlistUrl = process.env.PLAYLIST_URL;
  if (!apiKey || !playlistUrl) {
    return NextResponse.json({ error: 'Missing API key or playlist URL' }, { status: 500 });
  }

  const url = new URL(playlistUrl);
  const playlistId = url.searchParams.get('list');
  if (!playlistId) {
    return NextResponse.json({ error: 'Invalid playlist URL' }, { status: 400 });
  }

  const youtube = google.youtube({
    version: 'v3',
    auth: apiKey,
  });

  try {
    let nextPageToken: string | undefined = undefined;
    const videos: any[] = [];

    do {
      const res: any = await youtube.playlistItems.list({
        playlistId,
        part: ['snippet'],
        maxResults: 50,
        pageToken: nextPageToken,
      });
      const items = res.data.items;
      if (!items) break;

      items.forEach((item: any) => {
        const snip = item.snippet;
        if (!snip || !snip.resourceId?.videoId) return;

        const videoId = snip.resourceId.videoId;
        videos.push({
          title: snip.title,
          description: snip.description,
          thumbnail: snip.thumbnails?.high?.url || snip.thumbnails?.default?.url || null,
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
        });
      });

      nextPageToken = res.data.nextPageToken ?? undefined;
    } while (nextPageToken);

    return NextResponse.json({ videos });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || 'YouTube API error' }, { status: 500 });
  }
}
